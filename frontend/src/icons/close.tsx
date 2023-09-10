import cn from "classnames";

type Props = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

const CloseIcon: React.FC<Props> = ({ className, ...props }) => {
  return (
    <svg
      className={cn("", className)}
      fill="#F87171"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="18px"
      viewBox="0 0 41.756 41.756"
      {...props}
    >
      <g>
        <path
          d="M27.948,20.878L40.291,8.536c1.953-1.953,1.953-5.119,0-7.071c-1.951-1.952-5.119-1.952-7.07,0L20.878,13.809L8.535,1.465
       c-1.951-1.952-5.119-1.952-7.07,0c-1.953,1.953-1.953,5.119,0,7.071l12.342,12.342L1.465,33.22c-1.953,1.953-1.953,5.119,0,7.071
       C2.44,41.268,3.721,41.755,5,41.755c1.278,0,2.56-0.487,3.535-1.464l12.343-12.342l12.343,12.343
       c0.976,0.977,2.256,1.464,3.535,1.464s2.56-0.487,3.535-1.464c1.953-1.953,1.953-5.119,0-7.071L27.948,20.878z"
        />
      </g>
    </svg>
  );
};

export default CloseIcon;