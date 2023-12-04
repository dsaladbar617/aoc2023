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

const getAdjacentSpaces = (i: number, j: number) => {
      let topL = paddedMatrix[i-1][j-1]
      let topC = paddedMatrix[i-1][j]
      let topR = paddedMatrix[i-1][j+1]
      let left = paddedMatrix[i][j-1]
      let center = paddedMatrix[i][j]
      let right = paddedMatrix[i][j+1]
      let bottomL = paddedMatrix[i+1][j-1]
      let bottomC = paddedMatrix[i+1][j]
      let bottomR = paddedMatrix[i+1][j+1]

      return {topL, topC, topR, left, center, right, bottomL, bottomC, bottomR}
}

const getNum = (arr) => {
  let indexes = []
  let numIndex = []
  arr.forEach( (elem, index) => {
    if (elem === 0) numIndex.push(index) // indexes.push(index)
    if (elem !== 0 && numIndex.length) {
      indexes.push(numIndex)
      numIndex = []
    }
  })
  return indexes
}

const checkAdjacent = ( matrix: string[][]) => {

  const sorted = getAllNumAndSpecCharIndex(matrix)

  const paddedMatrix = padMatrix(sorted);

  let partNumArr = []
  let numArr = []
  let numPaddedIndex = []
  let end = []

  for (let i = 1; i < paddedMatrix.length - 1; i++) {
    let num = ''
    const numbersIndex = getNum(paddedMatrix[i])

    const check = numbersIndex.map((item) => {
      return item.map(elem => {
        const adjacentSpaces = getAdjacentSpaces(i, elem)
        return (Object.values(adjacentSpaces).includes(1))

      })
    })


    // START HERE!!!!!!!!!!!!


    const test = numbersIndex.map(item => item.map(elem => matrix[i-1][elem - 1]).join(''))
    console.log(test)
    console.log(check)
    // for (let j = 1; j < paddedMatrix[i].length - 1; j++) {
    //   const adjacentSpaces = getAdjacentSpaces(i,j)


    //   if (adjacentSpaces.center === 0) {
    //     start.push([i,j])
    //     if (adjacentSpaces.right === 0) {
    //       num += matrix[i - 1][j - 1]
    //       numPaddedIndex.push([i, j])
    //     }
    //     else if (adjacentSpaces.right !== 0) {
    //       // end.push([i,j])
    //       if (start.length > 0 )end.push(start)
    //       num += matrix[i - 1][j - 1]
    //       numPaddedIndex.push([i, j])
    //       if( Object.values(adjacentSpaces).includes(1) ) partNumArr.push(num)
    //       numArr.push(num)
    //     num = ''
    //   }
      // if( adjacentSpaces.includes(1)) partNumArr.push(num)
      }
  }

// console.log(numArr)
// console.log(partNumArr)
// console.log(numPaddedIndex)
// console.log(numArr.reduce((total, item) => total += +item, 0 ))
// }

// fs.writeFileSync(path.join(__dirname, 'paddedMatrix.txt'), paddedMatrix.join('\n'))

checkAdjacent(matrix)

