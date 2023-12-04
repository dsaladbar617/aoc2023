import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "testPuzzle.txt"), "utf-8");

const lines = data.split("\n");

const matrix = lines.map((item) => item.split(""));

type numCharMatrix = ((number | boolean)[] | "." | number)[][]

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
  // console.log(toInsert)
  matrix.forEach((item) => {
    item.unshift('.')
    item.push('.')
  })
  const toInsert: "."[] = Array.from(matrix[0].map(item => "."))
  matrix.unshift(toInsert)
  matrix.push(toInsert)
  return matrix
}

const sorted = getAllNumAndSpecCharIndex(matrix)

const paddedMatrix = padMatrix(sorted);

// console.log(paddedMatrix.join('\n'))

const checkAdjacent = ( matrix: numCharMatrix) => {
  let partNumArr = []

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[i].length - 1; j++) {
      console.log('no match', i,j, matrix[i][j])
      if (matrix[i][j] === 1 && matrix[i-1][j-1] === 1 || matrix[i+1][j+1] === 1) {
        console.log('match', i, j, matrix[i][j])
        partNumArr.push([i,j])
      }
    }
}
console.log(partNumArr)
}
// console.log(matrix[3 - 1][4 - 1])

checkAdjacent(paddedMatrix)

// fs.writeFileSync(path.join(__dirname, 'check.txt'), getAllNumAndSpecCharIndex(matrix).join('\n'))

// console.log(checkAdjacentSpaces(getAllNumAndSpecCharIndex(matrix)).join('\n'));
// checkAdjacentSpaces(getAllNumAndSpecCharIndex(matrix))
