import { data, dateFrom, dateTo } from "./data.js";
import { search } from "./archive.js";
import { Test } from "../test/test.js";

Test.suite("Archive", [
  {
    name: "Default search",
    test: () => {
      const ans = ["String 12", "String 22", "String 32"];
      const res = search(dateFrom, dateTo, data);
      Test.equal(ans, res);
    },
  },
  {
    name: "Empty result",
    test: () => {
      const ans = [];
      const res = search("2024-02-01", "2024-02-28", data);
      Test.equal(ans, res);
    },
  },
  {
    name: "Search for leaf",
    test: () => {
      const ans = ["String 32"];
      const res = search("2026-02-01", "2026-02-28", data);
      Test.equal(ans, res);
    },
  },
]);

await Test.runSuite("Archive");
