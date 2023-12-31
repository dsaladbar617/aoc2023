import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "puzzle.txt"), "utf-8");

const lines = data.split("\n");

const matrix = lines.map((item) => item.split(""));

type numCharMatrix = ((number | boolean)[] | "." | number)[][];

const getAllNumAndSpecCharIndex = (matrix: string[][]): numCharMatrix => {
  return matrix.map((item) => {
    return item.map((elem) => {
      const specialChars = elem.match(/[^\w.\n]/g);
      if (Number.isInteger(+elem)) return 0;
      if (specialChars) return 1;
      return ".";
    });
  });
};

const padMatrix = (matrix: numCharMatrix): numCharMatrix => {
  matrix.forEach((item) => {
    item.unshift(".");
    item.push(".");
  });
  const toInsert: "."[] = Array.from(matrix[0].map((item) => "."));
  matrix.unshift(toInsert);
  matrix.push(toInsert);
  return matrix;
};

const sorted = getAllNumAndSpecCharIndex(matrix);

const paddedMatrix = padMatrix(sorted);

const getAdjacentSpaces = (i: number, j: number) => {
  let topL = paddedMatrix[i - 1][j - 1];
  let topC = paddedMatrix[i - 1][j];
  let topR = paddedMatrix[i - 1][j + 1];
  let left = paddedMatrix[i][j - 1];
  let center = paddedMatrix[i][j];
  let right = paddedMatrix[i][j + 1];
  let bottomL = paddedMatrix[i + 1][j - 1];
  let bottomC = paddedMatrix[i + 1][j];
  let bottomR = paddedMatrix[i + 1][j + 1];

  return { topL, topC, topR, left, center, right, bottomL, bottomC, bottomR };
};

const getNum = (arr) => {
  let indexes = [];
  let numIndex = [];
  arr.forEach((elem, index) => {
    if (elem === 0) numIndex.push(index);
    if (elem !== 0 && numIndex.length) {
      indexes.push(numIndex);
      numIndex = [];
    }
  });
  return indexes;
};

const getPartNumbers = (matrix: string[][]) => {
  const sorted = getAllNumAndSpecCharIndex(matrix);

  const paddedMatrix = padMatrix(sorted);

  let partNums = [];

  for (let i = 1; i < paddedMatrix.length - 1; i++) {
    // let num = "";
    const numbersIndex = getNum(paddedMatrix[i]);

    const check: boolean[][] = numbersIndex.map((item) => {
      return item.map((elem) => {
        const adjacentSpaces = getAdjacentSpaces(i, elem);
        return Object.values(adjacentSpaces).includes(1);
      });
    });

    const ogMatrixNums: string[][] = numbersIndex.map((item) =>
      item.map((elem) => matrix[i - 1][elem - 1]).join("")
    );

    for (let i = 0; i < ogMatrixNums.length; i++) {
      if (check[i].some((item) => item === true))
        partNums.push(ogMatrixNums[i]);
    }
  }
  return partNums.reduce((total, item) => (total += +item), 0);
};

console.log(getPartNumbers(matrix));
