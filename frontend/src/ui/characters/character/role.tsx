type Props = {
    sign: string
    role: string | undefined
}

//the name of this component may not be the best
const Role: React.FC<Props> = ({ sign, role }) => {

    return <p className="w-80 gap-2">
        <span className="text-gray-500">[{sign}]</span>{" "}
        {role ?? "N/A"}
    </p>
};

export default Role;