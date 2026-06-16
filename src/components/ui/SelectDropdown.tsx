import { useState } from 'react';

interface SelectDropdownProps {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
}

const SelectDropdown = ({ label, options, onSelect }: SelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2 bg-info-a0 rounded h5"
      >
        {label}
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-info-a0 border rounded shadow">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => (onSelect(option), setIsOpen(false))}
              className="block w-full text-left px-4 py-2 hover:bg-[#8CB6FF]"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
