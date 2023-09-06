import { FC, SVGProps } from 'react';

type Props = {

} & SVGProps<SVGSVGElement>

const ChevronDown: FC<Props> = ({ ...props }) => {
  return <svg {...props} width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 6.5L6 1.25L11.25 6.5" stroke="#727272" />
  </svg>
};

export default ChevronDown;