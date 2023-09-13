import cn from "classnames";
import Option from "./option";

export type OptionType =
  | string
  | {
      text: string;
      isDisabled?: boolean;
    };

type Props = {
  data: OptionType[];
  name: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  label?: string;
  className?: string;
};

const Select: React.FC<Props> = ({
  data,
  className,
  name,
  onChange,
  label = name,
  error,
}) => {
  let Items = data.map((d) => (
    <Option
      text={typeof d === "string" ? d : d.text}
      isDisabled={typeof d === "object" ? d.isDisabled : undefined}
      key={typeof d === "string" ? d : d.text}
    />
  ));

  return (
    <div>
      <label className="text-base capitalize">{label}</label>
      <select
        className={cn("w-full rounded-md capitalize p-2", className)}
        name={name}
        onChange={onChange}
      >
        {Items}
      </select>
      <small className="text12-14 text-red-500">{error}</small>
    </div>
  );
};

export default Select;
