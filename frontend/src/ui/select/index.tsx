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
  label?: string;
  className?: string;
};

const Select: React.FC<Props> = ({
  data,
  className,
  name,
  label = name,
  onChange,
}) => {
  let Items = data.map((d, i) => (
    <Option
      text={typeof d === "string" ? d : d.text}
      isDisabled={typeof d === "object" ? d.isDisabled : undefined}
      key={typeof d === "string" ? d : d.text}
    />
  ));

  return (
    <div>
      <label className="capitalize">{label}</label>
      <select
        className={cn("w-full rounded-md text-black capitalize p-2", className)}
        name={name}
        onChange={onChange}
      >
        {Items}
      </select>
    </div>
  );
};

export default Select;
