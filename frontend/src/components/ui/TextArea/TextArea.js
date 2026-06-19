const TextArea = ({
  value,
  label,
  name,
  placeholder,
  type,
  onChange,
  rows,
  cols,
}) => (
  <div className="">
    {label && (
      <label
        htmlFor="input-field"
        className="block tracking-wide text-black text-base mb-2"
      >
        {label}
      </label>
    )}
    <textarea
      name={name}
      rows={rows}
      cols={cols}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="appearance-none block w-full text-gray-700 rounded leading-tight focus:outline-[#0D6EFD] focus:bg-white focus:border-gray-500 p-3 border border-[#999999] text-xl"
    />
  </div>
);

export default TextArea;
