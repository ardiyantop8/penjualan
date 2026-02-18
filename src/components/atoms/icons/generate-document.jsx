export const GenerateDocumentIcon = ({color}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6641 2.5V5.83333C11.6641 6.05435 11.7519 6.26631 11.9081 6.42259C12.0644 6.57887 12.2764 6.66667 12.4974 6.66667H15.8307M11.6641 2.5H5.83073C5.3887 2.5 4.96478 2.67559 4.65222 2.98816C4.33966 3.30072 4.16406 3.72464 4.16406 4.16667V15.8333C4.16406 16.2754 4.33966 16.6993 4.65222 17.0118C4.96478 17.3244 5.3887 17.5 5.83073 17.5H14.1641C14.6061 17.5 15.03 17.3244 15.3426 17.0118C15.6551 16.6993 15.8307 16.2754 15.8307 15.8333V6.66667M11.6641 2.5L15.8307 6.66667" stroke={color ?? "#ffffff"} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 9.58325V14.5833M7.5 12.0833H12.5" stroke={color ?? "#ffffff"} stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};