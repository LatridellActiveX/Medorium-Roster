import { CSSProperties, ChangeEvent, HTMLInputTypeAttribute } from "react";

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
  className?: {};
};

// changed the empty object to a type that means the same thing.
type Props = NonNullable<unknown> & InputType;

/**Represents an input field
 * 
 * @param label - label for input
 * @param value - value of input
 * @param handleChange - function to handle change
 * @param error - error message
 * @param name - name of input
 * @param type - optional, type of input
 * @param disabled - is input disabled
 * @param required - is input required
 * @param placeholder - placeholder for input
 * @returns 
 */
export const Input: React.FC<Props> = ({
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
      <label
        className="w-full text-base capitalize"
        htmlFor={label} //htmlFor='id of an input' this attribute tells html (I guess it is html) that this label and that input are connected with each other (via id)
      >
        {label}
      </label>
      <input
        type={type}
        name={name || label} //it is absolutely unnecessary to provide name prop for username and password because words are the same. Regestration code label and regcode name is a different story
        id={label}
        className="outline-none p-2 text-base rounded-md box-border w-full mt-2"
        value={!!value ? value : ''}
        placeholder={(!value && placeholder) ? placeholder : undefined}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
      <small className="text12-14 text-red-600">{error}</small>
    </div>
  );
};

/** Represents a text area, parameters are in the form of an object. 
 * @param label - label for input
 * @param value - value of input
 * @param handleChange - function to handle change
 * @param error - error message
 * @param name - name of input
 * @param type - optional, type of input
 * @param disabled - is input disabled
 * @param required - is input required
 * @param placeholder - placeholder for input
 * @returns 
 */
export const TextArea: React.FC<Props> = ({
  label,
  value,
  name,
  handleChange,
  error,
  type = "textArea",
  disabled,
  required,
  placeholder,
  className
}) => {
  
  const containerStyle: CSSProperties ={
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4',
    ...className
  };

  return (
    <div style={containerStyle}>
      <input
        type={type}
        name={name || label} //it is absolutely unnecessary to provide name prop for username and password because words are the same. Regestration code label and regcode name is a different story
        id={label}
        className="outline-none p-2 text-base rounded-md box-border w-full mt-2"
        value={!!value ? value : ''}
        placeholder={(!value && placeholder) ? placeholder : undefined}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      />
      <small className="text12-14 text-red-600">{error}</small>
    </div>
  );
};
