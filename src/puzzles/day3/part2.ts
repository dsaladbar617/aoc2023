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

const getAdjacentSpaces = (i: number, j: number) => {
  let topL = [paddedMatrix[i - 1][j - 1], [i - 1, j - 1]];
  let topC = [paddedMatrix[i - 1][j], [i - 1, j ]];
  let topR = [paddedMatrix[i - 1][j + 1], [i - 1, j + 1]];
  let left = [paddedMatrix[i][j - 1], [i, j - 1]];
  let right = [paddedMatrix[i][j + 1], [i, j + 1]];
  let bottomL = [paddedMatrix[i + 1][j - 1], [i + 1, j - 1]];
  let bottomC = [paddedMatrix[i + 1][j], [i + 1, j]];
  let bottomR = [paddedMatrix[i + 1][j + 1], [i + 1, j + 1]];

  return { topL, topC, topR, left, right, bottomL, bottomC, bottomR };
};

const getNum = (arr): number[][] => {
  let indexes = [];
  let numIndex = [];
  arr.forEach((elem, index) => {
    // console.log(elem)
    if (elem === 0) numIndex.push(index - 1);
    if (elem !== 0 && numIndex.length) {
      indexes.push(numIndex);
      numIndex = [];
      if (elem === 1) {
        indexes.push([index - 1])
        numIndex = []
      }
    }
    else if (elem === 1) {
      // numIndex = [];
      numIndex.push(index - 1);
    }
  });
  return indexes;
};

const getPartNumbers = (matrix: string[][]) => {
  const sorted = getAllNumAndSpecCharIndex(matrix);

  const paddedMatrix = padMatrix(sorted);

  let adjNums = [];
  let numIndex = [];

  let test = paddedMatrix.forEach((item, index) => {
    numIndex.push(getNum(paddedMatrix[index]));

    if (index === 0 || index === paddedMatrix.length - 1) return item;

    // console.log(item)
    item.forEach((elem, elemIndex) => {
      if (elemIndex === 0 || elemIndex === item.length - 1) return item;
      // console.log(elem)
      if (elem === 1) {
        console.log(index, elemIndex)
        const adjacentSpaces = getAdjacentSpaces(index, elemIndex);

        // console.log(adjacentSpaces)
        const arr: any[][] = Object.values(adjacentSpaces).filter(item => item[0] === 0);
        // console.log(arr)
        let count = 0;
        for (let i = 0; i < arr.length - 1; i++) {
          let indexArr = arr[i][1]
          let nextIndexArr = arr[i + 1][i]
          console.log(indexArr)
            if (nextIndexArr[1] - indexArr[1] >= 1 ||  nextIndexArr[0] - indexArr[0] >= 1) count++
            // if (arr.length === i + 1 || arr[i + 1][0] !== 0) count++;
        }
        if (count === 2) {
          adjNums.push([index - 1, elemIndex -1]);
        }
      }
    });
  });

  // console.log(numIndex)
  console.log(adjNums)

  const ogMatrixNums: string | number[] | number[][] = numIndex.map((item, index) =>
    {
      // console.log(item)
      return item.map((elem) => {
        // console.log('elem', elem, index - 1)
        return [elem.map( item => matrix[index - 1][item]).join(''), index - 1, elem]
        // matrix[index - 1][elem -1]
      })
    }
  );
  // console.log(ogMatrixNums)
  // console.log(adjNums)

  let check = adjNums.map((item, ogIndex) => {

    // item = * index


    const test = ogMatrixNums.map((elem, index) => {
      // elem = number, row index, array of column index

      // console.log(item, elem)
      if (elem.length > 0) {
        return elem.map((element, testIndex) => {

          return element[2].map((testNum) => {

            if ( item[0] === element[1] || item[0] === element[1] - 1 || item[0] === element[1] + 1) {
              // console.log(testNum, item[1])
              if ( testNum === item[1] || testNum === item[1] + 1 || testNum === item[1] - 1 ){
                if (element[0] !== '*')
                  // console.log('duh', index, testIndex)
                return ogMatrixNums[index][testIndex][0].replace('*', '')
                }
                return;

            }
            return
          }).filter(item => item !== undefined)

        })
      }
    }).filter(item => item !== undefined).flat(2).filter(item => item.length > 0)



    return test
  });

  const yes = check.map(item => Array.from(new Set(item)))

  fs.writeFileSync(path.join(__dirname, 'testOut.txt'), yes.join('\n'))
  // console.log(yes)
  const nums = yes.map(item => item.map(elem => +elem.replace('*', '')).reduce((total, item) => {
    return total *= item
  }))

  // console.log(nums.reduce((total, item) => total += item))

  return nums.reduce((total, item) => total += item)


  // console.log(ogMatrixNums);
};

// fs.writeFileSync(path.join(__dirname, 'output.txt'), getPartNumbers(matrix).join('\n') )
console.log(getPartNumbers(matrix));
