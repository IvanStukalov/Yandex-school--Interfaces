/**
 * 
 * "String".charCodeAt(0)
 * 
 * Algorithm:
 * 1. parse content object to binary view
 * 2. check sum
 */

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
