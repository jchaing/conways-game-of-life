const row = 50;
const column = 50;
const val = 0;

export const buildGrid = (row, column, val) =>
  new Array(row).fill(null).map((v) => new Array(column).fill(val));

export const grid50 = buildGrid(row, column, val);

export const mirror = buildGrid(row, column, val);
mirror[24].fill(1);

export const gliderGun = buildGrid(row, column, val);
gliderGun[12][5] = 1;
gliderGun[12][6] = 1;
gliderGun[13][5] = 1;
gliderGun[13][6] = 1;
gliderGun[12][15] = 1;
gliderGun[13][15] = 1;
gliderGun[14][15] = 1;
gliderGun[11][16] = 1;
gliderGun[15][16] = 1;
gliderGun[10][17] = 1;
gliderGun[10][18] = 1;
gliderGun[16][17] = 1;
gliderGun[16][18] = 1;
gliderGun[13][19] = 1;
gliderGun[11][20] = 1;
gliderGun[15][20] = 1;
gliderGun[12][21] = 1;
gliderGun[13][21] = 1;
gliderGun[14][21] = 1;
gliderGun[13][22] = 1;
gliderGun[10][25] = 1;
gliderGun[10][26] = 1;
gliderGun[11][25] = 1;
gliderGun[11][26] = 1;
gliderGun[12][25] = 1;
gliderGun[12][26] = 1;
gliderGun[9][27] = 1;
gliderGun[13][27] = 1;
gliderGun[8][29] = 1;
gliderGun[9][29] = 1;
gliderGun[13][29] = 1;
gliderGun[14][29] = 1;
gliderGun[10][39] = 1;
gliderGun[10][40] = 1;
gliderGun[11][39] = 1;
gliderGun[11][40] = 1;
