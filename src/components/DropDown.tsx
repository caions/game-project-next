import React, { useEffect, useState } from "react";

type options = {
  value: string;
  label: string;
};

type DropdownProps = {
  option: string[];
  selectedValue: (value: string) => void;
  resetFilter: boolean
};

const Dropdown: React.FC<DropdownProps> = ({ option, selectedValue, resetFilter }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    if(resetFilter){
      selectedValue("")
      setSelectedOption('Genres')
    }
  },[resetFilter])

  const options = option.map((opt) => ({ value: opt, label: opt }));

  const handleOptionSelect = (option: options) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  const selectedOptionLabel = selectedOption
    ? options.find((option) => option.value === selectedOption)?.label || ""
    : "Genres";

  return (
    <div className="relative inline-block text-left w-40">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-between items-center w-full rounded-md border border-gray-700 px-4 py-2 bg-gray-900 text-sm leading-5 font-medium text-white hover:bg-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-800 active:text-gray-200 transition ease-in-out duration-150"
            id="dropdown-menu"
            aria-haspopup="true"
            aria-expanded="true"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={selectedOption ? "text-white" : "text-gray-400"}>
              {selectedOptionLabel}
            </span>
            <svg
              className={`${
                isOpen ? "transform rotate-180" : ""
              } -mr-1 h-5 w-5 transition-transform duration-200`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </span>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg">
          <div
            className="rounded-md bg-gray-900 shadow-xs relative z-10"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-menu"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleOptionSelect(option), selectedValue(option.value);
                  }}
                  className={`${
                    selectedOption === option.value
                      ? "bg-gray-800 text-white"
                      : "text-gray-300"
                  } block w-full text-left px-4 py-2 text-sm leading-5 hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-gray-800 focus:text-white`}
                  role="menuitem"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <style>
        {`
          .rounded-md::-webkit-scrollbar {
            width: 5px;
            background-color: #111827;
          }
          .rounded-md::-webkit-scrollbar-thumb {
            background-color: white;
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
};

export default Dropdown;
