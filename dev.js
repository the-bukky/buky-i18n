/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { readAndMergeJson } from "./functions.js"
import input from "./input.json" assert { type: "json" }

readAndMergeJson("input.json", "./messages/en.json", false)
