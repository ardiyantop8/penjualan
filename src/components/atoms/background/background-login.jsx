export const BackgroundLogin = ({ children }) => {
  return (
    <div
      className="flex flex-col h-screen bg-briMainBlue justify-between w-full overflow-auto"
      style={{
        backgroundImage: "url('./images/bg-login.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
};
