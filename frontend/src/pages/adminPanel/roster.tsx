export type RosterType = {
  value: string
  label: string
}

type Props = {

} & RosterType

const Roster: React.FC<Props> = ({ value, label }) => {
  
  return <option value={value}>
    {label}
  </option>
};

export default Roster;