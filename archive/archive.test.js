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
            const ans2 = [];
            const res2 = search("2024-02-01", "2024-02-28", data);
            Test.equal(ans2, res2);
        },
    },
    {
        name: "Search for leaf",
        test: () => {
            const ans3 = ["String 32"];
            const res3 = search("2026-02-01", "2026-02-28", data);
            Test.equal(ans3, res3);
        },
    },
])

Test.runSuite("Archive");
