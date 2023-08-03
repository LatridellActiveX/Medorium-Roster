type Props = {
    text: string
}

const Option: React.FC<Props> = ({ text }) => {

    return <option className="capitalize text-base text-black" value={text}>
        {text}
    </option>
};

export default Option;