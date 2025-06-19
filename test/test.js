export class Test {
    static #suites = [];

    static #printSuccess(...str) {
        console.log("\x1b[32m", ...str, "\x1b[0m");
    }

    static #printFailure(...str) {
        console.log("\x1b[31m", ...str, "\x1b[0m");
    }

    static #printValue(str) {
        console.log("    ", str);
    }

    static #printRunSuite(name) {
        console.log();
        console.log("\x1b[44m\x1b[30m", "--- RUN SUITE:", name, "---", "\x1b[0m");
    }

    static #printRunTest(name) {
        console.log("\x1b[30m", "--- RUN TEST:", name, "---", "\x1b[0m");
    }

    static #equality(expected, result) {
        if (typeof expected !== typeof result) {
            return false;
        }

        if (
            typeof result === "string" ||
            typeof result === "number" ||
            typeof result === "boolean" ||
            typeof result === "bigint" ||
            typeof result === "null" ||
            typeof result === "undefined"
        ) {
            return expected === result;
        }

        if (expected instanceof Object && result instanceof Object) {
            if (Object.keys(expected).length !== Object.keys(result).length) {
                return false;
            }

            for (const key of Object.keys(expected)) {
                if (!this.#equality(expected[key], result[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    static equal(expected, result) {
        if (this.#equality(expected, result)) {
            this.#printSuccess("PASSED");
        } else {
            this.#printFailure("FAILED");
            this.#printFailure("  Expected:")
            this.#printValue(expected);
            this.#printFailure("  Result:");
            this.#printValue(result);
        }
    }

    static notEqual(expected, result) {
        if (!this.#equality(expected, result)) {
            this.#printSuccess("PASSED");
        } else {
            this.#printFailure("TEST FAILED");
            this.#printFailure("  Values are equal but not expected to be:");
            this.#printValue(result);
        }
    }

    static suite(name, cases) {
        const i = this.#suites.findIndex((suite) => suite.name === name)
        if (i === -1) {
            this.#suites.push({ name, cases });
        } else {
            this.#suites[i].cases = cases;
        }
    }

    static async runSuite(name) {
        const suite = this.#suites.find((suite) => suite.name === name);
        if (!suite) {
            this.#printFailure("There is no such test suite");
            return;
        }

        this.#printRunSuite(name);
        for (const testcase of suite.cases) {
            this.#printRunTest(testcase.name);
            await testcase.test();
        }
    }

    static async runAllSuites() {
        if (!this.#suites.length) {
            this.#printFailure("There are no suites");
            return;
        }

        for (const suite of this.#suites) {
            await this.runSuite(suite.name);
        }
    }
}

/**
 * suite: {
 *      name: string;
 *      cases: {
 *          name: string;
 *          test: () => void;     
 *      }[];
 * }[];
 */
