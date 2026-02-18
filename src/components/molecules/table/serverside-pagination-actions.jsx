import { KeyboardArrowRight } from "@mui/icons-material";
import { KeyboardArrowLeft } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const ServerSidePaginationActions = (props) => {
  const { page, onPageChange, rowsPerPage, currentPageData } = props;

  const handleBackButtonClick = () => {
    onPageChange(null, page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(null, page + 1);
  };

  return (
    <>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={
          !currentPageData?.length || currentPageData?.length < rowsPerPage
        }
      >
        <KeyboardArrowRight />
      </IconButton>
    </>
  );
};
