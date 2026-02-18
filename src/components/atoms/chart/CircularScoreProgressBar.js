import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Box, Typography, Stack } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";

const PRIMARY_COLOR = "#4DAAFF"; 
const TRACK_COLOR = "#E0E0E0"; 

const Pointer = ({ percentage, strokeWidth, trailColor, pathColor }) => {
  if (percentage <= 0) return null;

  const radius = 50 - strokeWidth / 2;
  
  // Posisi dihitung berdasarkan keliling
  const pointX = 50 + radius * Math.sin(2 * Math.PI * (percentage / 100));
  const pointY = 50 - radius * Math.cos(2 * Math.PI * (percentage / 100));

  return (
    <circle
      cx={pointX}
      cy={pointY}
      r={strokeWidth / 2 + 1}
      fill="white"
      stroke={pathColor}
      strokeWidth={2}
      style={{
        transition: 'stroke-dashoffset 0.5s ease 0s',
      }}
    />
  );
};


// --- Komponen Utama ---
export const CircularScoreProgressBar = ({ 
  score = 0,
  size = 150, 
  strokeWidth = 5,
  IconComponent = PersonIcon,
}) => {
  
  const normalizedScore = Math.min(100, Math.max(0, score));

  return (
    <Box sx={{ width: size, height: size, position: 'relative' }}>
      <CircularProgressbarWithChildren
        value={normalizedScore}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          trailColor: TRACK_COLOR,
          pathColor: PRIMARY_COLOR,
          pathTransitionDuration: 0.5,
          rotation: 0.001, 
        })}
        counterClockwise={false}
        className="progressbar-with-pointer"
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          <Stack alignItems="center" spacing={0.5}>
            {IconComponent && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 37,
                  height: 37,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(77, 170, 255, 0.2)',
                  mb: 0.5, 
                }}
              >
                 <IconComponent sx={{ color: PRIMARY_COLOR, fontSize: 20 }} />
              </Box>
            )}
            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>
              {`${Math.round(normalizedScore)}%`}
            </Typography>
          </Stack>
        </Box>
      </CircularProgressbarWithChildren>

      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <svg viewBox="0 0 100 100">
             <Pointer percentage={normalizedScore} strokeWidth={strokeWidth} pathColor={PRIMARY_COLOR} />
          </svg>
      </Box>
    </Box>
  );
};