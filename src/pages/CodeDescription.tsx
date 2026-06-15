import { CodeEditorSection } from './CodeEditorSection';
import { ProblemTabsSection } from './ProblemTabsSection';
import { TopNavigationSection } from './TopNavigationSection';

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
          <ProblemTabsSection />
        </section>
        <section
          className="relative w-[717px] h-[1319px]"
          aria-label="Code editor"
          data-id="code-editor-section-container"
        >
          <CodeEditorSection />
        </section>
      </div>
    </main>
  );
};

export default CodeDescription;
