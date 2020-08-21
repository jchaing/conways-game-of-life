import React, { useState } from 'react';

const row = 25;
const column = 25;
const val = 0;

const buildGrid = (row, column, val) =>
  new Array(row).fill(null).map((v) => new Array(column).fill(val));

const grid25 = buildGrid(row, column, val);

const Grid = () => {
  const [grid, setGrid] = useState(grid25);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${column}, 20px)`,
      }}
    >
      {grid.map((rows, x) =>
        rows.map((col, y) => (
          <div
            key={`${x}-${y}`}
            style={{ width: 20, height: 20, border: '1px solid black' }}
          >
            {/* {col} */}
          </div>
        ))
      )}
    </div>
  );
};

export default Grid;
