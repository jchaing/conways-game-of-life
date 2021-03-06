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
    setTimeout(run, 0);
  }, []);

  return (
    <div className="container">
      <div className="row my-5">
        <h1 className="text-center my-5">Conway's Game of Life</h1>
        <div className="col-xl-5 mb-5">
          <h3 className="my-3">Grid:</h3>
          <div
            className="col-12"
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
          <div className="text-center mt-3">
            <button
              className="btn btn-success btn-lg mr-2"
              onClick={() => {
                setStart(!start);
                startRef.current = true;
                run();
              }}
            >
              {start ? 'Stop' : 'Start'}
            </button>
            <button
              className="btn btn-danger btn-lg ml-2"
              onClick={() => {
                setStart(false);
                startRef.current = false;
                setGrid(grid50);
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="col-xl-3 btn-group-vertical">
          <h3 className="my-3">Presets:</h3>
          <button
            className="btn btn-primary col-12 mb-3"
            onClick={() => {
              setStart(false);
              startRef.current = false;
              setGrid(mirror);
            }}
          >
            Mirror
          </button>
          <button
            className="btn btn-primary col-12 mb-3"
            onClick={() => {
              setStart(false);
              startRef.current = false;
              setGrid(gliderGun);
            }}
          >
            Gosper Glider Gun
          </button>
          <button
            className="btn btn-primary col-12 mb-3"
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
        </div>
        <div className="col-xl-4">
          <h3 className="my-3">Rules:</h3>
          <p>1. Any live cell with two or three live neighbours survives.</p>
          <p>
            2. Any dead cell with three live neighbours becomes a live cell.
          </p>
          <p>
            3. All other live cells die in the next generation. Similarly, all
            other dead cells stay dead.
          </p>
        </div>
      </div>
      <h2 className="text-center my-5">About this Algorithm:</h2>
      <p>
        The Game of Life, also known simply as Life, is a cellular automaton
        devised by the British mathematician John Horton Conway in 1970.[1] It
        is a zero-player game, meaning that its evolution is determined by its
        initial state, requiring no further input. One interacts with the Game
        of Life by creating an initial configuration and observing how it
        evolves. It is Turing complete and can simulate a universal constructor
        or any other Turing machine.
      </p>
    </div>
  );
};

export default Grid;
