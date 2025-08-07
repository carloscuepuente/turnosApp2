const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  className = "",
  ...props
}) => {
  const inputClasses = `
    w-full p-3 bg-gray-600 rounded-md border 
    ${error ? "border-red-500" : "border-gray-500"} 
    focus:border-blue-500 focus:outline-none 
    disabled:opacity-50 disabled:cursor-not-allowed
    text-white placeholder-gray-400
    ${className}
  `.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
