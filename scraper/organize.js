const fs = require('fs');
const readline = require('readline');

const types = {
  assemblies: "Assemblies",
  curriculum: "Curriculum",
  fieldtrips: "Field Trips",
  presentations: "Presentations",
  schoolintiatives: "School-wide Intitiatives"
}
const categories = [
  "Carbon Neutrality",
  "Water Resilience",
  "Zero Waste",
  "Sustainable Transportation",
  "Connection to Nature",
  "All"
];
const schoolLevels = ["es", "hs"];

let activities = [];


async function processLineByLine(filename) {
  const fileStream = fs.createReadStream(filename);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  //Working variables here
  //var
  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
  }
}
