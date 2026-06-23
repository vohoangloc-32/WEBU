import { useState } from 'react';
import SelectDropdown from '@/components/ui/SelectDropdown';
import ChipBoard from '@/components/ui/ChipBoard';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const TAG_OPTIONS = ['Array', 'Math', 'Linked List', 'Hash Table'];
const GROUP_OPTIONS = ['KTLT', 'DSA'];
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'];

export const CreateProblem = (): JSX.Element => {
  const [name, setName] = useState('');
  const [chips, setChips] = useState<string[]>([]);
  const [code, setCode] = useState(
    'int main() {\n  // Your code here\n  return 0;\n}',
  );

  const addChip = (prefix: string, value: string) => {
    const chip = `${prefix}: ${value}`;
    if (!chips.includes(chip)) {
      setChips((prev) => [...prev, chip]);
    }
  };

  const removeChip = (chip: string) => {
    setChips((prev) => prev.filter((c) => c !== chip));
  };

  const handleCancel = useNavigate();
  const handleCreate = () => {
    // Handle the creation logic here, e.g., send data to the server
    console.log('Creating problem with:', { name, chips, code });
    // After creation, navigate back to the notebook or another page
    handleCancel('/notebook');
  };

  return (
    <div className="w-full min-h-screen bg-tonal-a0 px-30 py-20 flex flex-col justify-between items-stretch overflow-hidden select-none">
      <div className="bg-tonal-a20 w-full rounded-lg flex flex-col px-30 py-10 gap-10">
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

        <div>
          <p className="text-neutral-a50 h4 mb-10">Code Editor:</p>
          <textarea
            placeholder="Enter your code here"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="px-4 py-2 bg-black ide4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={10}
          />
        </div>

        <div className="flex justify-between items-center w-full mt-6">
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              // Handle save logic here
              handleCancel('/notebook');
            }}
          >
            {' '}
            Cancel
          </Button>
          <Button
            className="w-fit flex items-center justify-center rounded-lg border-2 border-secondary-a70 px-6 py-2 h2 text-center"
            onClick={() => {
              // Handle save logic here
              handleCreate();
            }}
          >
            {' '}
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProblem;
