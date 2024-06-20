import { ChangeEvent } from "react";

interface IInput {
  name: string;
  id: string;
  className: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  hasError: boolean;
  error: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  id,
  name,
  className,
  label,
  type,
  placeholder,
  value,
  hasError,
  error,
  onChange,
}: IInput) {
  let inputClassName = className;
  if (hasError) {
    inputClassName += hasError ? " is-invalid" : " is-valid";
  }

  return (
    <>
      <input
        id={id}
        name={name}
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={id}>{label}</label>
      {hasError && <div className="invalid-feedback">{error}</div>}
    </>
  );
}
