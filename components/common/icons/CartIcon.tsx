const CartIcon = ({ ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M3 3h2l.5 3m0 0L7 15h11l3-9z" />
        <circle cx="8" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </g>
    </svg>
  )
}
export default CartIcon
