export const IconModalClose = ({ color }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color={color ? color : "white"}
    >
      <path
        d="M21.0003 0.000976562L11.9989 9.00018L2.99973 0.000976562L0 3.00071L8.9992 11.9999L0 20.9991L2.99973 23.9989L11.9989 14.9997L21.0003 23.9989L24 20.9991L15.0008 11.9999L24 3.00071L21.0003 0.000976562Z"
        fill={color ? color : "white"}
      />
    </svg>
  );
};
