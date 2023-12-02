import * as fs from "fs";
import path from "path";

const keys = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
}

let data = fs.readFileSync(path.join(__dirname, 'puzzle.txt'), "utf8");

let keyArr = Object.keys(keys)

let lines = data.split("\n");

const converted = lines.map(item =>{
    let firstDigit = item.match(/\d/)
    let lastDigit = item.match(/\d/g)
    let firstIndex = (firstDigit) ? firstDigit.index : item.length - 1
    let lastIndex = (lastDigit) ? item.lastIndexOf(lastDigit[lastDigit.length - 1]) : 0
    let firstItem = (firstDigit) ? firstDigit[0] : ''
    let lastItem = (lastDigit) ? lastDigit[lastDigit.length - 1] : ''
    keyArr.forEach(key => {
      if (item.indexOf(key) < firstIndex && item.indexOf(key) !== -1) {
        firstIndex = item.indexOf(key)
        firstItem = keys[key]
      }

      if (item.lastIndexOf(key) > lastIndex && item.lastIndexOf(key) !== -1) {
        lastIndex = item.lastIndexOf(key)
        lastItem = keys[key]
      }

    })
    return Number(`${firstItem}${lastItem}`);
    }).reduce((total, item) => total += item, 0)

    console.log(converted)