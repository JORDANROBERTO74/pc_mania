const AddToCartIcon = ({ ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path fill="currentColor" d="M18 15H7L5.5 6H21z" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.5 3m0 0L7 15h11l3-9z"
        />
        <circle
          cx="8"
          cy="20"
          r="1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
          cx="17"
          cy="20"
          r="1"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <line
          x1="13"
          y1="7"
          x2="13"
          y2="14"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <line
          x1="9.5"
          y1="10.5"
          x2="16.5"
          y2="10.5"
          stroke="black"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  )
}

export default AddToCartIcon
