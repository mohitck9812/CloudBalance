import clsx from "clsx";
import React from "react";

export default function Input({
  label = "",
  type = "",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  error,
}) {
  return (
    <div>
      <div className="flex flex-col w-full">
        <label className="text-black mb-3.5">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={clsx(
            "mt-1 w-100 border rounded pl-4 py-3 border-black/10 placeholder:text-black/30 focus:outline-primary/70",
            error && "border-red-600"
          )}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

export function InputSelect({ label, name, id, values }) {
  return (
    <>
      <div className="flex flex-col gap-3.5">
        <label htmlFor={id}>{label}</label>

        <select className=" mt-1 w-100 border rounded pl-4 py-3 border-black/10 placeholder:text-black/30 focus:outline-primary/70" name={name} id={id}>
          {values.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
