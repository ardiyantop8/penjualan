export const IconConfeti = ({color}) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 5H6M5 4V6M11.5 4L11 6M18 5H20M19 4V6M15 9L14 10M18 13L20 12.5M18 19H20M19 18V20M14.0018 16.518L7.48376 10L3.09376 19.58C3.00699 19.766 2.97955 19.9742 3.01518 20.1763C3.0508 20.3785 3.14776 20.5647 3.29289 20.7099C3.43802 20.855 3.6243 20.952 3.82643 20.9876C4.02856 21.0232 4.23676 20.9958 4.42276 20.909L14.0018 16.518Z" stroke={color ?? "none"} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  };