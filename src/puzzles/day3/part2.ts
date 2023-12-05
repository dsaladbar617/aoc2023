import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.join(__dirname, "testPuzzle.txt"), "utf-8");

const lines = data.split("\n");

const matrix = lines.map((item) => item.split(""));
type numCharMatrix = ((number | boolean)[] | "." | number)[][];

// console.log(matrix.join('\n'))

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

fs.writeFileSync(
  path.join(__dirname, "paddedMatrix2.txt"),
  paddedMatrix.join("\n")
);

const getAdjacentSpaces = (i: number, j: number) => {
  let topL = [paddedMatrix[i - 1][j - 1], [i - 1, j - 1], matrix[i - 1][j - 1]];
  let topC = [paddedMatrix[i - 1][j], [i - 1, j]];
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
    if (elem === 0) numIndex.push(index);
    else if (elem === 1) {
      numIndex = [];
      numIndex.push(index);
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
  // let numbersIndex = []

  let adjNums = [];
  let numIndex = [];
  let test = paddedMatrix.forEach((item, index) => {
    numIndex.push(getNum(paddedMatrix[index]));

    if (index === 0 || index === paddedMatrix.length - 1) return item;

    item.forEach((elem, elemIndex) => {
      if (elemIndex === 0 || elemIndex === item.length - 1) return item;

      if (elem === 1) {
        const adjacentSpaces = getAdjacentSpaces(index, elemIndex);
        // console.log(adjacentSpaces)
        const arr: any[][] = Object.values(adjacentSpaces);
        // console.log(arr)
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
          // console.log(arr[i + 1])
          if (arr[i][0] === 0) {
            if (arr.length === i + 1 || arr[i + 1][0] !== 0) count++;
          }
        }
        if (count === 2) {
          adjNums.push([index, elemIndex]);
        }
      }
    });
  });

  // console.log(numIndex)
  let check = adjNums.map((item) => {
    const adjSpaces = Object.values(getAdjacentSpaces(item[0], item[1]));

    let test = adjSpaces.map((item) => {
      let arr = [];
      const indexes = item[1];
      // let nums = numIndex[indexes[0]];
      let nums = numIndex[indexes[0]]
        .map((elem) => {
          if (elem.includes(indexes[1]) === true) return elem;
          return [];
        })
        .flat();
      // console.log(nums)
      // nums.forEach(num => {
      //   console.log(num)
      //   if (arr.indexOf(num) === -1) arr.push(num[0])
      // })
      return nums;
    });

    console.log(test)

    let unique = test.map((item, index) => {
      console.log(item)
      if (item.length > 0) {
        let num = item.map(elem => {
          console.log(index, elem -1 )
          return matrix[index][elem - 1]
        })

        // console.log(num)

        return 0
      }
    })

    // console.log(unique)
  });
  const ogMatrixNums: string[][] = numIndex.map((item, index) =>
    {
      // console.log(index - 1)
      return item.map((elem) => {
        // console.log('elem', elem)
        matrix[index - 1][elem -1]
      }).join("")
    }
  );

  // console.log(ogMatrixNums);
};

// fs.writeFileSync(path.join(__dirname, 'output.txt'), getPartNumbers(matrix).join('\n') )
console.log(getPartNumbers(matrix));
