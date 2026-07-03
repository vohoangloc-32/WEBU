import { useState } from 'react';

interface FilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedCourses: string[];
  setSelectedCourses: (courses: string[]) => void;
  tagOptions?: string[];
  courseOptions?: string[];
}

export const NotebookFilter = ({
  searchQuery,
  setSearchQuery,
  selectedTags,
  setSelectedTags,
  selectedCourses,
  setSelectedCourses,
  tagOptions = ['Array', 'Math', 'Linked List', 'Hash Table'],
  courseOptions = ['KTLT', 'DSA'],
}: FilterProps) => {
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  const handleTagSelect = (value: string) => {
    if (!selectedTags.includes(value))
      setSelectedTags([...selectedTags, value]);
    setIsTagOpen(false);
  };

  const handleCourseSelect = (value: string) => {
    if (!selectedCourses.includes(value))
      setSelectedCourses([...selectedCourses, value]);
    setIsCourseOpen(false);
  };

  const removeTag = (tag: string) =>
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  const removeCourse = (course: string) =>
    setSelectedCourses(selectedCourses.filter((c) => c !== course));

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="flex-1 h-[42px] bg-info-a0 rounded-[6px] px-3 flex items-center gap-2 border border-transparent focus-within:border-secondary-a70 transition-colors">
          <span className="text-white p7">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-transparent border-none outline-none text-neutral-a50 p6 placeholder:text-neutral-a50"
          />
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsTagOpen(!isTagOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Tags</span>
            <span className="text-white p9 opacity-70">▼</span>
          </div>

          {isTagOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {tagOptions.map((tag) => (
                <div
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative w-[120px] h-[42px]">
          <div
            onClick={() => setIsCourseOpen(!isCourseOpen)}
            className="w-full h-full bg-info-a0 rounded-[6px] px-3 flex justify-between items-center cursor-pointer border border-transparent hover:border-secondary-a70 transition-colors select-none"
          >
            <span className="text-white h7 font-bold">Course</span>
            <span className="text-white p9 opacity-70">▼</span>
          </div>

          {isCourseOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-tonal-a20 rounded-[6px] border border-tonal-a30 overflow-hidden z-50 shadow-lg">
              {courseOptions.map((course) => (
                <div
                  key={course}
                  onClick={() => handleCourseSelect(course)}
                  className="px-3 py-2 text-white p8 cursor-pointer hover:bg-primary-a20 transition-colors"
                >
                  {course}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {(selectedTags.length > 0 || selectedCourses.length > 0) && (
        <div className="w-full flex flex-wrap gap-3 items-center mt-2">
          <span className="text-neutral-a50 p8 mr-2 italic">Filtered by:</span>
          {selectedCourses.map((course) => (
            <div
              key={course}
              className="flex items-center gap-2 px-3 py-1 bg-primary-a20 rounded-[20px]"
            >
              <span className="text-secondary-a10 p8 font-bold">{course}</span>
              <span
                onClick={() => removeCourse(course)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 p7 leading-none"
              >
                ×
              </span>
            </div>
          ))}
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-2 px-3 py-1 bg-tonal-a20 border border-tonal-a30 rounded-[20px]"
            >
              <span className="text-white p8">{tag}</span>
              <span
                onClick={() => removeTag(tag)}
                className="text-neutral-a50 hover:text-danger-a10 cursor-pointer font-bold ml-1 p7 leading-none"
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
