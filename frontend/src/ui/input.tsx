import { ChangeEvent, HTMLInputTypeAttribute } from "react"

export type InputType = {
  label: string
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  name?: string
  type?: HTMLInputTypeAttribute
  isDisabled?: boolean
}

// changed the emtpy object to a type that means the same thing.  
type Props = NonNullable<unknown> & InputType

const Input: React.FC<Props> = ({ label, value, name, handleChange, error, type = 'text', isDisabled = false }) => {

  return <div className="flex flex-col items-center mb-6">
    <label className="w-full text-base"
      htmlFor={label} //htmlFor='id of an input' this attribute tells html (I guess it is html) that this label and that input are connected with each other (via id)
    >
      {label}
    </label>
    <input
      type={type}
      name={name || label.toLowerCase()} //it is absolutely unesessary to provide name prop for username and password because words are the same. Regestration code label and regcode name is a different story
      id={label}
      className="outline-none p-2 text-base rounded-md box-border w-full"
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
      required
    />
    <small className="text12-14 text-red-600">{error}</small>
  </div>
};

export default Input;