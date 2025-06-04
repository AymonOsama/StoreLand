import { useState, useEffect } from 'react';

const FilterSection = ({
  title,
  options = [],
  type = 'checkbox', // checkbox or radio
  onChange = () => {},
  defaultSelected = [],
}) => {
  const [selected, setSelected] = useState(() => {
    if (type === 'radio') {
      return defaultSelected[0] || null;
    } else {
      return options.reduce((acc, opt) => ({
        ...acc,
        [opt]: defaultSelected.includes(opt),
      }), {});
    }
  });

  const handleChange = (option) => {
    if (type === 'radio') {
      setSelected(option);
    } else {
      setSelected((prev) => ({
        ...prev,
        [option]: !prev[option],
      }));
    }
  };

  // Send selected value(s) to parent when they change
  useEffect(() => {
    if (type === 'radio') {
      onChange(selected);
    } else {
      const selectedOptions = Object.entries(selected)
        .filter(([_, value]) => value)
        .map(([key]) => key);
      onChange(selectedOptions);
    }
  }, [selected, type, onChange]);

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm">
      <h3 className="font-bold text-gray-800 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => {
          const isChecked =
            type === 'radio' ? selected === option : selected[option] || false;
          return (
            <div key={option} className="flex items-center">
              <input
                type={type}
                name={title} // important for radios
                id={`filter-${title}-${option}`}
                checked={isChecked}
                onChange={() => handleChange(option)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`filter-${title}-${option}`}
                className="ml-2 text-sm text-gray-700"
              >
                {option}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
