import { existsSync, readFileSync, writeFileSync } from "fs"

// safe means that we will only add new keys is they not exist
export function mergeJson(target, source, safe) {
  for (const key in source) {
    // eslint-disable-next-line no-prototype-builtins
    if (source.hasOwnProperty(key)) {
      if (source[key] instanceof Object && !Array.isArray(source[key])) {
        if (!target[key]) {
          Object.assign(target, { [key]: {} })
        }
        mergeJson(target[key], source[key], safe)
      } else {
        if (!target[key] || !safe) {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }
  }
}

export function readAndMergeJson(inputFileName, outputFileName, safe = true) {
  try {
    const inputData = readFileSync(inputFileName, "utf8")
    const inputJson = JSON.parse(inputData)

    let outputJson = {}
    if (existsSync(outputFileName)) {
      const outputData = readFileSync(outputFileName, "utf8")
      outputJson = JSON.parse(outputData)
    }

    mergeJson(outputJson, inputJson, safe)

    const sortedOutputJson = {}
    Object.keys(outputJson)
      .sort()
      .forEach((key) => {
        sortedOutputJson[key] = outputJson[key]
      })

    writeFileSync(
      outputFileName,
      JSON.stringify(sortedOutputJson, null, 2) + "\n",
      "utf8"
    )
    console.log(`Data moved from ${inputFileName} to ${outputFileName}.`)
  } catch (error) {
    console.error("Error", error.message)
  }
}
