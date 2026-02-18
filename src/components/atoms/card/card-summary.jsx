import React, { useState } from 'react';
import { Card, IconButton, Collapse} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { formatCurrency, formatNominal } from "@/utils/formatString";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SummaryCard = ({
  title = "",
  subtitle = "",
  dataList = [],
  updateDate = "-",
  boldCountIcon = false,
  boldCount = false,
  boldTitle = false,
  boldUpdate = false,
  iconHeader = <AccountBalanceIcon sx={{ color: '#00519C' }} />,
  backgroundColor = '#022D5A',
  colorTitlte = '#000000',
  colorNominal = '#000000',
  displayIcon = true,
  formatNumber= 'currency',
  colorCount = '#000000',
}) => {
  const [open, setOpen] = useState(true);

  // Tentukan jumlah kolom berdasarkan jumlah item
  const getGridCols = (count) => {
    if (count <= 2) return 'grid-cols-1 sm:grid-cols-2';
    if (count === 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    if (count === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5';
  };

  const gridClass = `grid ${getGridCols(dataList.length)} gap-4`;

  // fungsi pilih formatter
  const getFormattedNumber = (value) => {
    if (formatNumber === 'nominal') {
      return formatNominal(value);
    }
    return formatCurrency(value);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          {iconHeader}
          <h2 className={boldTitle ? "font-bold" : ""}>{title} {subtitle}</h2>
        </div>
        <IconButton onClick={() => setOpen(!open)}>
            {open ? (
              <KeyboardArrowUpIcon color="primary" />
            ) : (
              <KeyboardArrowDownIcon color="primary" />
            )}
          </IconButton>
      </div>
      <p className={`py-2 ${boldUpdate ? "font-bold" : ""}`}>{updateDate}</p>
      
      <Collapse in={open} timeout="500">
        <div className={gridClass}>
          {dataList.map((item, index) => {
            // Ambil semua title yang ada
            const titles = [item.title, item.title2, item.title3].filter(Boolean);
            const counts = [item.count, item.count2, item.count3].filter(c => c !== undefined);

            return (
              <Card
                key={index}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: backgroundColor,
                  px: 3,
                  pb: 4,
                  overflow: "visible",
                  boxShadow: "none",
                  paddingX: "16px",
                  paddingY: "16px"
                }}
              >
                {titles.length > 1 ? (
                  // Mode grid kalau lebih dari 1 title
                  <div className={`grid gap-4 grid-cols-${titles.length}`}>
                    {titles.map((t, idx) => (
                      <div key={idx} className="flex flex-col items-start">
                        <p style={{ color: colorTitlte }}>{t}</p>
                        <h3
                          style={{ color: colorNominal }}
                          className={boldCount ? "font-bold" : ""}
                        >
                          {getFormattedNumber(counts[idx] ?? 0)}
                        </h3>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between ">
                        <p style={{color: colorTitlte}}>{item.title ?? '-'}</p>
                        {displayIcon && (
                            <div className="flex gap-1">
                                <div>{item.icon}</div>
                                <p style={{color: colorCount}} className={`pt-[2px] ${boldCountIcon ? "font-bold" : ""}`}>{formatNominal(item.countIcon)}</p>
                            </div>
                        )}
                    </div>
                    <div className="py-2">
                        <h3 style={{color: colorNominal}} className= {boldCount ? "font-bold" : ""}>{getFormattedNumber(item.count)}</h3>
                    </div>
                  </>
                )}
              </Card>
            );
          }
        )}
        </div>
      </Collapse>
    </>
  );
};

export default SummaryCard;