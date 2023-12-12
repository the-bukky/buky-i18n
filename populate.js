/* eslint-disable no-restricted-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from "fs"
import path from "path"

import { readAndMergeJson } from "./functions.js"

const pasta = "./messages"

fs.readdir(pasta, (err, files) => {
  if (err) {
    console.error("Error", err)
    return
  }
  files.forEach((file) => {
    if (file === "en.json") return
    console.log(file)
    readAndMergeJson("./messages/en.json", `./messages/${file}`)
  })
})
