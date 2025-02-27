const PhoneIcon = ({ ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth="4">
        <path
          strokeLinejoin="round"
          d="M8 30h32v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2zm32 0V6a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v24"
        />
        <path strokeLinecap="round" d="M22 37h4" />
      </g>
    </svg>
  );
};
export default PhoneIcon;
