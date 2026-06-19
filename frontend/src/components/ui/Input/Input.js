const Input = ({ value, label, name, placeholder, type, onChange, onBlur }) => (
  <div>
    {label && (
      <label
        htmlFor="input-field"
        className="block tracking-wide text-black text-base mb-2"
      >
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      name={name}
      onBlur={onBlur}
      placeholder={placeholder}
      onChange={onChange}
      className="h-14 bg-white appearance-none block w-full rounded px-4 py-3 leading-tight focus:outline-[#0D6EFD] focus:bg-white border border-[#999999] text-xl text-[#666666]"
    />
  </div>
);

export default Input;
