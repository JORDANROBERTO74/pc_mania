const ShippingIcon = ({ ...props }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6 20q-1.25 0-2.125-.875T3 17H1V6q0-.825.588-1.412T3 4h14v4h3l3 4v5h-2q0 1.25-.875 2.125T18 20q-1.25 0-2.125-.875T15 17H9q0 1.25-.875 2.125T6 20m0-2q.425 0 .713-.288T7 17q0-.425-.288-.712T6 16q-.425 0-.712.288T5 17q0 .425.288.713T6 18m12 0q.425 0 .713-.288T19 17q0-.425-.288-.712T18 16q-.425 0-.712.288T17 17q0 .425.288.713T18 18m-1-5h4.25L19 10h-2z"
      />
    </svg>
  );
};
export default ShippingIcon;
