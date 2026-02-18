import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export const TablePaginationActions = (props) => {
  const { count, page, onPageChange } = props;

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  return (
    <>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="Halaman Sebelumnya"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={typeof count === 'boolean' ? count : page >= count}
        aria-label="Halaman Berikutnya"
      >
        <KeyboardArrowRight />
      </IconButton>
    </>
  );
};
