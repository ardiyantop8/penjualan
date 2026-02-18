import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box } from "@mui/material";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function BreadcrumbsDefault({ options = [] }) {
  const lastIndex = options[options.length - 1];
  const slicedOptions = options.slice(0, options.length - 1);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        {options
          ? slicedOptions.map((option, index) => {
              return (
                <Link
                  key={index}
                  underline="hover"
                  color="inherit"
                  href={option.href}
                  sx={{ display: "flex" }}
                >
                  {option.icon ? (
                    <Box
                      sx={{
                        mr: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                      fontSize="inherit"
                    >
                      {option.icon}
                    </Box>
                  ) : null}
                  <div className="font-medium">{option.label}</div>
                </Link>
              );
            })
          : "Please provide options prop."}
        {lastIndex ? (
          <Link
            sx={{ display: "flex" }}
            color="#00529C"
            underline="hover"
            href={lastIndex.href}
          >
            {lastIndex.icon ? (
              <Box
                sx={{
                  mr: 1,
                  display: "flex",
                }}
                fontSize="inherit"
              >
                {lastIndex.icon}
              </Box>
            ) : null}
            <div className="font-semibold">{lastIndex.label}</div>
          </Link>
        ) : (
          "Please provide options prop."
        )}
      </Breadcrumbs>
    </div>
  );
}
