export const IconShuffle = ({
  width = "20",
  height = "20",
  color = "#00529C",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_4835_8616)">
        <path
          d="M15 3.33301L17.5 5.83301L15 8.33301"
          stroke={color}
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 16.667L17.5 14.167L15 11.667"
          stroke={color}
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M2.5 5.83301H5C6.10507 5.83301 7.16488 6.27199 7.94628 7.0534C8.72768 7.8348 9.16667 8.89461 9.16667 9.99967C9.16667 11.1047 9.60565 12.1646 10.3871 12.946C11.1685 13.7274 12.2283 14.1663 13.3333 14.1663H17.5"
          stroke={color}
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.5 5.83301H13.3333C12.4316 5.83168 11.5539 6.12423 10.8333 6.66635M7.5 13.333C6.77922 13.8748 5.9017 14.1673 5 14.1663H2.5"
          stroke={color}
          stroke-width="1.67"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_4835_8616">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
