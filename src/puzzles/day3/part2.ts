import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "testPuzzle.txt"), "utf-8");

const lines = data.split("\n");

const matrix = lines.map((item) => item.split(""));
type numCharMatrix = ((number | boolean)[] | "." | number)[][];

const getAllNumAndSpecCharIndex = (matrix: string[][]): numCharMatrix => {
  return matrix.map((item) => {
    return item.map((elem) => {
      const specialChars = elem.match(/\*/g);
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
  const toInsert: "."[] = Array.from(matrix[0].map(() => "."));
  matrix.unshift(toInsert);
  matrix.push(toInsert);
  return matrix;
};

const sorted = getAllNumAndSpecCharIndex(matrix);

const paddedMatrix = padMatrix(sorted);

fs.writeFileSync(path.join(__dirname,'paddedMatrix2.txt'), paddedMatrix.join('\n'))

const getAdjacentSpaces = (i: number, j: number) => {
  let topL = paddedMatrix[i - 1][j - 1];
  let topC = paddedMatrix[i - 1][j];
  let topR = paddedMatrix[i - 1][j + 1];
  let left = paddedMatrix[i][j - 1];
  let right = paddedMatrix[i][j + 1];
  let bottomL = paddedMatrix[i + 1][j - 1];
  let bottomC = paddedMatrix[i + 1][j];
  let bottomR = paddedMatrix[i + 1][j + 1];

  return { topL, topC, topR, left, right, bottomL, bottomC, bottomR };
};

const getNum = (arr) => {
  let indexes = [];
  let numIndex = [];
  arr.forEach((elem, index) => {
    if (elem === 0) numIndex.push(index);
    else if (elem === 1) {
      numIndex = []
      numIndex.push(index)
    }
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
    const numbersIndex = getNum(paddedMatrix[i]);
    console.log('numIndex', numbersIndex)

    const check: boolean[][] = numbersIndex.map((item, index) => {
      let adjNums = []
      if (item.length === 1) {
        const adjacentSpaces = getAdjacentSpaces(i, item[0]);
        const arr = Object.values(adjacentSpaces)
        let count = 0
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === 0 && arr[i + 1] !== 0) count++
        }
        if (count = 2) {
          // console.log('item', i, item[0])
          adjNums.push(i,item[0], true)
        }
      }

      return adjNums;
    });
//
    console.log('check', check)
    const ogMatrixNums: string[][] = numbersIndex.map((item) =>
      item.map((elem) => matrix[i - 1][elem - 1]).join("")
    );

    for (let i = 0; i < ogMatrixNums.length; i++) {
      if (check[i].some((item) => item === true))
      partNums.push(ogMatrixNums[i]);
  }

  // console.log(ogMatrixNums)
}

  return partNums
  // .reduce((accum, currentValue, currentIndex, array) => {
  //   if (currentIndex % 2 === 0) {
  //     accum.push(array.slice(currentIndex, currentIndex + 2));
  //   }
  //   return accum
  // }, []).filter(item => item.length === 2).map(item => +item[0] * +item[1]).reduce((total, item) => total += +item, 0);
};

// fs.writeFileSync(path.join(__dirname, 'output.txt'), getPartNumbers(matrix).join('\n') )
console.log(getPartNumbers(matrix));
