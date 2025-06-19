import fs from "fs/promises";
import { JSDOM } from "jsdom";
import { Test } from "../test/test.js";
import { solution } from "./energy_levels.js";

export async function getContainer() {
  try {
    const parentDir = process.cwd();
    const html = await fs.readFile(`${parentDir}/energy_levels/data.html`, 'utf-8');
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const parent = document.querySelector('div[ref="parent"]');

    return parent;
  } catch (err) {
    console.error("Error reading file:", err);
    return null;
  }
}

Test.suite("Energy levels", [
  {
    name: "Default case",
    test: async () => {
      const ans = 82;
      const container = await getContainer();
      const res = solution(container);
      Test.equal(ans, res);
    },
  },
]);

Test.runSuite("Energy levels");
