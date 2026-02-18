export const IconAdd = ({color, width, height}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width ?? 20} height={height ?? 20} viewBox="0 0 20 20" fill="none">
      <g clipPath="url(#clip0_3991_92058)">
        <path d="M5 12H19" stroke={color ?? "#ffffff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 5L12 19" stroke={color ?? "#ffffff"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="clip0_3991_92058">
          <rect width="20" height="20" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
};
