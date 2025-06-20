import { Test } from "../test/test.js";
import { toBinaryObject, toBinaryContent, toBitmap, checkSum } from "./pixel_print.js";
import { content, PIXEL_PER_LINE } from "./pixel_print.data.js";

Test.suite("Pixel print", [
  {
    name: "Length of binary object fields",
    test: () => {
      const lengthParams = {
        type: content.type.length,
        name: content.name.length,
        age: content.age.length,
        skills: content.skills.length,
        date: content.date.length,
      }

      const binaryContent = toBinaryObject(content);

      Test.equal(lengthParams.type, binaryContent.type.length / 8);
      Test.equal(lengthParams.name, binaryContent.name.length / 8);
      Test.equal(lengthParams.age, binaryContent.age.length / 8);
      Test.equal(lengthParams.skills, binaryContent.skills.length / 8);
      Test.equal(lengthParams.date, binaryContent.date.length / 8);
    },
  },
  {
    name: "Length of binary object fields with fields length restrictions",
    test: () => {
      const lengthParams = {
        type: 32,
        name: 16,
        age: 2,
        skills: 64,
        date: 10,
      }

      const binaryContent = toBinaryContent(content);
      
      Test.equal(lengthParams.type, binaryContent.type.length / 8);
      Test.equal(lengthParams.name, binaryContent.name.length / 8);
      Test.equal(lengthParams.age, binaryContent.age.length / 8);
      Test.equal(lengthParams.skills, binaryContent.skills.length / 8);
      Test.equal(lengthParams.date, binaryContent.date.length / 8);
    },
  },
  {
    name: "Bitmap size",
    test: () => {
      const bitmap = toBitmap(content);

      Test.equal(PIXEL_PER_LINE, bitmap.length);
      console.log(bitmap.length)
      for (const row of bitmap) {
        Test.equal(PIXEL_PER_LINE, row.length);
      }
    }
  },
  {
    name: "Checksum",
    test: () => {
      // ??? Чексумма в пдф-ке странная
      // Во-первых, эта чексумма - literally инвертированая последняя строка
      // Во-вторых, чексумма в задании неверная, 
      //  она почему то взята с предпоследней строки а не последней
      const ans = [1,1,0,1,0,0,0,1,1,1,0,0,1,1,1,1,1,1,0,0,1,1,0,1,1,1,0,1,0,0,0,1];
      const checksum = checkSum(content);

      Test.equal(ans, checksum);
    }
  }
]);

Test.runSuite("Pixel print");
