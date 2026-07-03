import { CodeEditorSection } from './CodeEditorSection';
import { ProblemTabsSection } from './ProblemTabsSection';
import { TopNavigationSection } from './TopNavigationSection';
import { CardDetail } from '../types/ide';

const mockCard: CardDetail = {
  id: 'mock',
  title: 'Mock Problem',
  difficulty_level: 'Easy',
  tags: [],
  group: '',
  content: {
    question_text: '',
    description: '',
  },
  ide_data: {
    boilerplate_code: {
      cpp: '',
      java: '',
      python: '',
      typescript: '',
    },
  },
  public_test_cases: [],
};

const mockBoilerplates = {
  cpp: '',
  java: '',
  python: '',
  typescript: '',
};

export const CodeDescription = (): JSX.Element => {
  return (
    <main
      className="relative w-[1440px] h-[1440px] bg-[#1d2535] overflow-hidden mx-auto shadow-2xl"
      data-id="code-description"
    >
      <TopNavigationSection />
      <div className="absolute top-[121px] left-0 flex w-[1440px] h-[1319px]">
        <section
          className="relative w-[723px] h-[1319px]"
          aria-label="Problem tabs"
          data-id="problem-tabs-section-container"
        >
          <ProblemTabsSection card={mockCard} />
        </section>
        <section
          className="relative w-[717px] h-[1319px]"
          aria-label="Code editor"
          data-id="code-editor-section-container"
        >
          <CodeEditorSection
            cardId="mock"
            boilerplateCodes={mockBoilerplates}
          />
        </section>
      </div>
    </main>
  );
};

export default CodeDescription;
