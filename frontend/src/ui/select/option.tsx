type Props = {
  text: string;
  isDisabled?: boolean;
};

const Option: React.FC<Props> = ({ text, isDisabled }) => {
  return (
    <option
      className="capitalize text-base text-black"
      value={text}
      disabled={isDisabled}
    >
      {text}
    </option>
  );
};

export default Option;
