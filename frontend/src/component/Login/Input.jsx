import clsx from "clsx";

const Input = ({ label, error, type, placeholder, name, value, onChange, onBlur }) => {
  return (
    <div className="flex flex-col w-full">
      <label className="text-s text-black/70 mb-3.5">{label}</label>

      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={clsx(
          "mt-1 border rounded pl-4 py-3 border-black/10 placeholder:text-black/30 focus:outline-primary/70",
          error && "border-red-600"
        )}
      />

      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};


export default Input;
