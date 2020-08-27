import React, { useState, useRef, useCallback } from 'react';
import produce from 'immer';
import { buildGrid, grid50, mirror, gliderGun } from '../presets/gridPresets';

const row = 50;
const column = 50;
const val = 0;

const neighborCells = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

const Grid = () => {
  const [grid, setGrid] = useState(grid50);
  const [start, setStart] = useState(false);

  const startRef = useRef(start);
  startRef.current = start;

  const run = useCallback(() => {
    if (!startRef.current) {
      return;
    }

    setGrid((grid) => {
      return produce(grid, (newGrid) => {
        for (let x = 0; x < row; x++) {
          for (let y = 0; y < column; y++) {
            let neighbors = 0;
            neighborCells.forEach(([i, j]) => {
              const newX = x + i;
              const newY = y + j;
              if (newX >= 0 && newX < row && newY >= 0 && newY < column) {
                neighbors += grid[newX][newY];
              }
            });

            // Rules for Alive or Dead Cells
            if (neighbors < 2 || neighbors > 3) {
              newGrid[x][y] = 0;
            } else if (grid[x][y] === 0 && neighbors === 3) {
              newGrid[x][y] = 1;
            }
          }
        }
      });
    });
    setTimeout(run, 10);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setStart(!start);
          startRef.current = true;
          run();
        }}
      >
        {start ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          setStart(false);
          startRef.current = false;
          setGrid(grid50);
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setStart(false);
          startRef.current = false;
          setGrid(mirror);
        }}
      >
        Mirror
      </button>
      <button
        onClick={() => {
          setStart(false);
          startRef.current = false;
          setGrid(gliderGun);
        }}
      >
        Gosper Glider Gun
      </button>
      <button
        onClick={() => {
          setStart(false);
          startRef.current = false;
          setGrid(
            buildGrid(row, column, val).map((rand) =>
              rand.map((x) => Math.round(Math.random()))
            )
          );
        }}
      >
        Random
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${column}, 10px)`,
        }}
      >
        {grid.map((rows, x) =>
          rows.map((col, y) => (
            <div
              onClick={() => {
                const gridClick = produce(grid, (newGrid) => {
                  newGrid[x][y] = newGrid[x][y] ? 0 : 1;
                });
                setGrid(gridClick);
              }}
              key={`${x}-${y}`}
              style={{
                width: 10,
                height: 10,
                border: '1px solid black',
                background: grid[x][y] ? 'black' : 'white',
              }}
            ></div>
          ))
        )}
      </div>
    </>
  );
};

export default Grid;
