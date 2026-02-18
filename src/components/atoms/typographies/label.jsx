import { twMerge } from "tailwind-merge";

export const TextLabel = ({ children, className, ...restProps }) => {
  return (
    <p
      className={twMerge("font-semibold text-base my-2", className)}
      {...restProps}
    >
      {children}
    </p>
  );
};
