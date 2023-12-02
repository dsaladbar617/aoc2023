import fs from "fs";
import path from "path";

// max number of each color cube.
const countKey = {
  red: 12,
  green: 13,
  blue: 14,
};

// Import puzzle from text file.
const data = fs.readFileSync(path.join(__dirname, "puzzle.txt"), "utf8");

// Seperate each individual line
const lines = data.split("\n");

const sumOfPossibleGameIDs = (lines: string[]): number => {
  const games = lines.map((line) => {
    // Split the games into either the game ID or the number and color of cubes.
    const handfulls = line.split(/[,|;|:]/g);

    let splitHandfulls = handfulls.map((handfull) => {
      // remove the white space to be able to grab the whole number and color
      const splits = handfull.trim().split(/\s/g);

      // If the current element of the array is the game ID return the Game ID
      if (splits[0] === "Game") return handfull;

      // Compare the number of the cubes to the max number allowed of that color if there are more than allowed return true.
      return +splits[0] > countKey[splits[1]];
    });

    // If there are any elements that are true in the array that would show that gamne is impossible
    return [
      splitHandfulls[0].toString().split(" ")[1],
      splitHandfulls.some((elem) => elem === true),
    ];
  });

  // filter out and only track the games that are possible
  const filteredGames = games.filter((item) => item[1] === false);

  // Total up the IDs of the possible games.
  return filteredGames.reduce((total, item) => (total += +item[0]), 0)
};

console.log(sumOfPossibleGameIDs(lines));
