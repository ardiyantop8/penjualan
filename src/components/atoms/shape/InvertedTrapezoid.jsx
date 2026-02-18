import React from 'react';

export const InvertedTrapezoid = ({ width, height, label }) => {
  const path = `
    M 0 20
    Q 0 0 20 0
    L ${width - 20} 0
    Q ${width} 0 ${width} 20
    L ${width - 25} ${height - 20}
    Q ${width - 40} ${height} ${width - 50} ${height}
    L 50 ${height}
    Q 40 ${height} 25 ${height - 20}
    Z
  `;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ margin: '10px 0' }}>
      <path d={path} fill="#EAF3FA" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#00529C"
        fontSize="15"
        fontFamily="Arial"
        fontWeight="bold"
      >
        {label}
      </text>
    </svg>
  );
};