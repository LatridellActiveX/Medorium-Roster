import { ChangeEvent, HTMLInputTypeAttribute } from "react";

export type InputType = {
  label: string;
  value: string | undefined | number;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
};

// changed the emtpy object to a type that means the same thing.
type Props = NonNullable<unknown> & InputType;

const Input: React.FC<Props> = ({
  label,
  value,
  name,
  handleChange,
  error,
  type = "text",
  disabled,
  required,
  placeholder,
}) => {

  return (
    <div className="flex flex-col items-center">
      <div className="w-full space-x-1">
        <label
          className="text-base capitalize"
          htmlFor={label} //htmlFor='id of an input' this attribute tells html (I guess it is html) that this label and that input are connected with each other (via id)
        >
          {label}
        </label>
        <small className="text-red-500">{error}</small>
      </div>
      <input
        type={type}
        name={name || label} //it is absolutely unesessary to provide name prop for username and password because words are the same. Regestration code label and regcode name is a different story
        id={label}
        className="outline-none p-2 text-base rounded-md box-border w-full mt-2"
        value={!!value ? value : ''}
        placeholder={(!value && placeholder) ? placeholder : undefined}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
    </div>
  );
};

export default Input;
