import { useState, useMemo } from 'react';

interface SelectDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
  buttonClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  containerClassName?: string;
  enableSearch?: boolean;
}

const SelectDropdown = ({
  label,
  options,
  onSelect,
  buttonClassName = 'flex items-center gap-2 px-4 py-2 bg-info-a0 rounded h5 text-white',
  dropdownClassName = 'absolute mt-2 w-full bg-info-a0 border border-white/[0.08] rounded shadow z-50 overflow-hidden',
  itemClassName = 'block w-full text-left px-4 py-2 hover:bg-[#8CB6FF] text-white',
  containerClassName = '',
  enableSearch = true,
}: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [options, searchText]);

  return (
    <div className={`relative ${containerClassName}`}>
      <button
        type="button"
        onClick={() => {
          setIsOpen((o) => !o);
          setSearchText('');
        }}
        className={buttonClassName}
      >
        {label}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className={`${dropdownClassName} min-w-[120px]`}>
          {enableSearch && (
            <div className="p-1.5 border-b border-white/[0.08] bg-black/10">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-2 py-1 text-xs bg-black/20 border border-white/10 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-white placeholder-white/30"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-2 text-xs text-neutral-400 italic">
                No options found
              </div>
            ) : (
              filteredOptions.map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                  className={itemClassName}
                >
                  {option}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
