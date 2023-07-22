import React from 'react';
import { ChangeEvent, HTMLInputTypeAttribute } from "react"

export type InputType = {
  label: string
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  name?: string
  type?: HTMLInputTypeAttribute
  isDisabled?: boolean
}

type Props = {

} & InputType

const Input: React.FC<Props> = ({ label, value, name, handleChange, type = 'text', isDisabled = false }) => {

  return <div>
    <label
      htmlFor={label} //htmlFor='id of an input' this attribute tells html (I guess it is html) that this label and that input are connected with each other (via id)
    >
      <strong>{label}:</strong>
    </label>
    <input
      type={type}
      name={name || label.toLowerCase()} //it is absolutely unesessary to provide name prop for username and password because words are the same. Regestration code label and regcode name is a different story
      id={label}
      value={value}
      onChange={handleChange}
      disabled={isDisabled}
      required
    />
  </div>
};

export default Input;