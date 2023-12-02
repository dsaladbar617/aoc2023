import fs from "fs";
import path from "path";

// Import puzzle from text file.
const data = fs.readFileSync(path.join(__dirname, "puzzle.txt"), "utf8");

// Seperate each individual line
const lines = data.split("\n");

const sumOfMinimumCubes = (lines: string[]): number => {
  return lines
    .map((line) => {
      // Split the games into either the game ID or the number and color of cubes
      const handfulls = line.split(/[,|;|:]/g);

      // Create a key to keep track of the minimum number of cubes for each game
      let minimumKey = {
        red: 0,
        green: 0,
        blue: 0,
      };

      handfulls.forEach((handfull) => {
        // remove the white space to be able to grab the whole number and color
        const splits = handfull.trim().split(/\s/g);

        // Compare the number of the cubes to the minimum key values. If it is greate than the minimum key value is updated
        if (+splits[0] > minimumKey[splits[1]])
          minimumKey[splits[1]] = +splits[0];
      });
      // multiply the minimum of each color to return the powers of minimum cubes
      return minimumKey["red"] * minimumKey["green"] * minimumKey["blue"];
    })
    // sum all of the minimum cubes
    .reduce((total, item) => (total += item), 0);
};

console.log(sumOfMinimumCubes(lines))
