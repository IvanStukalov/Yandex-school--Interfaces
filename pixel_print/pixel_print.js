/**
 * 
 * "String".charCodeAt(0)
 * 
 * Algorithm:
 * 1. parse content object to binary view
 * 2. check sum
 */

import { CANVAS_SIZE, colors, content, PIXEL_PER_LINE, PIXEL_SIZE } from "./pixel_print.data.js";

/**
 * Function takes object and represents its fields 
 * in binary view
 *  
 * @param content 
 */
export const toBinaryObject = (content) => {
  const keys = Object.keys(content);
  
  const res = {};
  for (const key of keys) {
    const str = content[key];
    let binStr = "";
    for (const char of str) {
      const ascii = char.charCodeAt();
      const binary = ascii.toString(2).padStart(8, "0");
      binStr += binary;
    }
    res[key] = binStr;
  }

  return res;
}

/**
 * This function works with object of type:
 * 
 * content = {
 *  type: string = "Frontend React Developer";
 *  name: string;
 *  age: string;
 *  skills: string;
 *  date: string; 
 * }
 * 
 * binary view
 * content = {
 *  type: string = "10001100...";
 *  ...
 * }
 * 
 * return binary field object, padded with 0 according to restrictions
 * 
 * @param content - same field as toBinaryObject param
 */
export const toBinaryContent = (content) => {
  const binaryObject = toBinaryObject(content);

  binaryObject.type = binaryObject.type.padEnd(32 * 8, "0");
  binaryObject.name = binaryObject.name.padEnd(16 * 8, "0");
  binaryObject.age = binaryObject.age.padEnd(2 * 8, "0");
  binaryObject.skills = binaryObject.skills.padEnd(64 *  8, "0");
  binaryObject.date = binaryObject.date.padEnd(10 * 8, "0");

  return binaryObject;
}

export const toBitmap = (content) => {
  const binaryObject = toBinaryContent(content);
  const bitmap = [];
  for (let i = 0; i < PIXEL_PER_LINE - 1; ++i) {
    bitmap.push([]);
  }

  let row = 0;
  let col = 0;

  for (const key of Object.keys(binaryObject)) {
    for (const bit of binaryObject[key]) {
      bitmap[row].push(bit === "1" ? true : false);

      if (++col === PIXEL_PER_LINE) {
        col = 0;
        ++row;
      }
    }
  }

  return bitmap;
}

export const checkSum = (content) => {
  const bitmap = toBitmap(content);
  const checksum = new Array(bitmap[0].length);

  for (const i in bitmap[bitmap.length - 1]) {
    checksum[i] = bitmap[bitmap.length - 1][i] ? 0 : 1;
  }

  return checksum;
}

// --- CANVAS ---

const drawPixel = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
}

const pixelPrint = (ctx) => {
  const binaryObject = toBinaryContent(content);
  let row = 0;
  let col = 0;

  for (const key of Object.keys(binaryObject)) {
    for (const bit of binaryObject[key]) {
      if (bit === "1") {
        drawPixel(ctx, col, row, colors[key]);
      }
      if (++col === PIXEL_PER_LINE) {
        col = 0;
        ++row;
      }
    }
  }

  const checksum = checkSum(content);
  for (const i in checksum) {
    if (checksum[i]) {
      drawPixel(ctx, i, row, colors.checksum);
    }
  }
}

const makeCanvas = () => {
  const canvas = document.querySelector("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  canvas.style = "border: 1px solid #000000";
  const ctx = canvas.getContext("2d");

  pixelPrint(ctx);
}

makeCanvas();
