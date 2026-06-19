const Select = ({ value, label, name, options, onChange }) => (
  <div className="relative">
    {label && (
      <label
        htmlFor="input-field"
        className="block tracking-wide text-black text-base mb-2"
      >
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={onChange}
      name={name}
      className="block appearance-none w-full text-gray-700 py-3 px-4 pr-8 rounded leading-tight border border-[#999999] focus:outline-[#0D6EFD] focus:bg-white focus:border-gray-500"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 top-8">
      <svg
        className="fill-current h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

export default Select;
