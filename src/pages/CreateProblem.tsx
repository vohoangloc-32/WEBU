import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectDropdown from '@/components/ui/SelectDropdown';
import ChipBoard from '@/components/ui/ChipBoard';
import { Button } from '@/components/ui/Button';
import type { AiGeneratedProblem } from '@/types/problem';

const TAG_OPTIONS = ['Array', 'Math', 'Linked List', 'Hash Table'];
const GROUP_OPTIONS = ['KTLT', 'DSA'];
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

const BOILERPLATE_TEMPLATES = {
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your C++20 code here\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        // Your Java 17 code here\n    }\n}`,
  python: `def main():\n    # Your Python 3 code here\n    pass\n\nif __name__ == '__main__':\n    main()`,
  typescript: `function main() {\n    // Your TypeScript code here\n}\n\nmain();`,
};

type LanguageType = keyof typeof BOILERPLATE_TEMPLATES;

const LANGUAGE_DISPLAY_NAMES: Record<LanguageType, string> = {
  cpp: 'C++20',
  java: 'Java 17',
  python: 'Python 3',
  typescript: 'TypeScript',
};

export const CreateProblem = (): JSX.Element => {
  const [name, setName] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [selectedLang, setSelectedLang] = useState<LanguageType>('cpp');
  const [boilerplate, setBoilerplate] = useState(BOILERPLATE_TEMPLATES);
  const [code, setCode] = useState(BOILERPLATE_TEMPLATES.cpp);

  const location = useLocation();
  const navigate = useNavigate();

  const { aiProblem } =
    (location.state as { aiProblem?: AiGeneratedProblem }) || {};

  const hasAppliedAiProblem = useRef(false);

  useEffect(() => {
    if (!aiProblem || hasAppliedAiProblem.current) return;
    hasAppliedAiProblem.current = true;

    setName(aiProblem.title || '');
    setDescription(aiProblem.description || '');

    const initialBoilerplates = {
      cpp: aiProblem.boilerplateCode?.cpp || BOILERPLATE_TEMPLATES.cpp,
      java: aiProblem.boilerplateCode?.java || BOILERPLATE_TEMPLATES.java,
      python: aiProblem.boilerplateCode?.python || BOILERPLATE_TEMPLATES.python,
      typescript:
        aiProblem.boilerplateCode?.typescript ||
        BOILERPLATE_TEMPLATES.typescript,
    };
    setBoilerplate(initialBoilerplates);
    setCode(initialBoilerplates[selectedLang]);

    if (aiProblem.difficulty) {
      const diffFormatted =
        aiProblem.difficulty.charAt(0).toUpperCase() +
        aiProblem.difficulty.slice(1).toLowerCase();
      addChip('Difficulty', diffFormatted);
    }

    if (aiProblem.group) {
      addChip('Group', aiProblem.group);
    }

    if (aiProblem.tags && aiProblem.tags.length > 0) {
      aiProblem.tags.forEach((tag) => addChip('Tag', tag));
    }
  }, [aiProblem]);

  const addChip = (prefix: string, value: string) => {
    const chip = `${prefix}: ${value}`;

    setChips((prev) => {
      if (prev.includes(chip)) return prev;

      if (prefix === 'Tag') {
        return [...prev, chip];
      }

      const withoutSamePrefix = prev.filter(
        (c) => !c.startsWith(`${prefix}: `),
      );
      return [...withoutSamePrefix, chip];
    });
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const handleLanguageChange = (lang: LanguageType) => {
    setSelectedLang(lang);
    setCode(boilerplate[lang]);
  };

  const handleLanguageSelect = (displayName: string) => {
    const langKey = Object.keys(LANGUAGE_DISPLAY_NAMES).find(
      (key) => LANGUAGE_DISPLAY_NAMES[key as LanguageType] === displayName,
    ) as LanguageType;
    if (langKey) {
      handleLanguageChange(langKey);
    }
  };

  const handleCreate = () => {
    console.log('Creating problem with:', { name, chips, description, code });
    // TODO: gọi API tạo problem + generate test case ở đây (bước tiếp theo)
    navigate('/notebook');
  };

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-30 py-20 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <div className="bg-tonal-a20 w-full rounded-lg flex flex-col px-30 py-10 gap-10 relative">
        <h1 className="text-neutral-a50 h1 text-center tracking-normal leading-tight uppercase">
          CREATING NEW PROBLEM
        </h1>

        <div className="flex items-center gap-4">
          <label htmlFor="problem-name" className="text-neutral-a50 h4">
            Name:
          </label>
          <input
            id="problem-name"
            type="text"
            placeholder="Enter problem name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-2 bg-secondary-a10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p4"
          />
        </div>

        <div className="flex gap-10">
          <SelectDropdown
            label="Select Tag"
            options={TAG_OPTIONS}
            onSelect={(value) => addChip('Tag', value)}
          />
          <SelectDropdown
            label="Select Group"
            options={GROUP_OPTIONS}
            onSelect={(value) => addChip('Group', value)}
          />
          <SelectDropdown
            label="Select Difficulty"
            options={DIFFICULTY_OPTIONS}
            onSelect={(value) => addChip('Difficulty', value)}
          />
        </div>

        <ChipBoard tags={chips} onRemove={removeChip} />

        <div className="flex flex-col gap-2">
          <label htmlFor="problem-description" className="text-neutral-a50 h4">
            Problem Description:
          </label>
          <textarea
            id="problem-description"
            placeholder="Enter problem description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-2 bg-secondary-a10 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black p4 whitespace-pre-wrap min-h-[150px]"
            rows={8}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label htmlFor="code-editor" className="text-neutral-a50 h4">
              Code Editor:
            </label>
            <SelectDropdown
              label={LANGUAGE_DISPLAY_NAMES[selectedLang]}
              options={Object.values(LANGUAGE_DISPLAY_NAMES)}
              onSelect={handleLanguageSelect}
            />
          </div>
          <textarea
            id="code-editor"
            placeholder="Enter your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-2 bg-black ide4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-green-400 font-mono"
            rows={12}
          />
        </div>

        <div className="flex justify-between items-center w-full mt-6">
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              navigate('/notebook');
            }}
          >
            Cancel
          </Button>
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              handleCreate();
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
