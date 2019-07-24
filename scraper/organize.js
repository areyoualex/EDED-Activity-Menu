const fs = require('fs');
const readline = require('readline');

//replaceAll
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

const types = {
  assemblies: "Assemblies",
  curriculum: "Curriculum",
  fieldtrips: "Field Trips",
  presentations: "Presentations",
  schoolinitiatives: "School-wide Intitiatives"
}
const categories = [
  "Carbon Neutrality",
  "Water Resilience",
  "Zero Waste",
  "Sustainable Transportation",
  "Connection to Nature",
  "All"
];
const schoolLevels = ["es", "mshs"];

let activities = [];

//process each of the files
for(var level of schoolLevels)
  for(var type in types)
    processLineByLine(level, type);

function finishProcessing() {
  console.log("done, writing output");
  console.log(JSON.stringify(activities));
  console.log(activities);
  fs.writeFile('activities.json', JSON.stringify(activities), 'utf8', (err) => {
    if (err) console.log("There was an error:\n"+err.message);
    else console.log("successfully written output to activities.json!")
  });
}

function processLineByLine(schoolLevel, type) {
  const fileStream = fs.createReadStream(schoolLevel+type+".txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  //Working variables here
  var currentCategory;
  var linesAnticipating = 0;
  var anticipating;
  var lineCache = [];
  var currentActivity = {
    "Title": "",
    "Description": "",
    "Category": [],
    "Type": [],
    "Points": 0,
    "Grade Level": "",
    "Image": ""
  };
  rl.on('close', ()=>{
    if (schoolLevel == "mshs" && type == "schoolinitiatives")
      finishProcessing();
  });

  rl.on('line', (line) => {
    //remove annoying whitespace thing
    line = line.trim();
    line = line.replace("\u200B", "");
    //First check: check if new category
    var newCat = false;
    for (category of categories) {
      if (line === category.toUpperCase()){
        currentCategory = category;
        newCat = true; //We switched categories
        linesAnticipating = 1;
        anticipating = "Title";
        break;
      }
    }
    if (newCat) return; //Go to next line if new category
    // console.log("-----------");
    // console.log(line);
    // console.log(linesAnticipating);
    // console.log(anticipating);

    if (linesAnticipating > 0){
      linesAnticipating--;
      return;
    } else if (linesAnticipating == 0){
      linesAnticipating--;
      if (anticipating === "Title"){
        for (var i = 0; i < activities.length; i++) {
          if (!activities[i]){
            console.log("warning: empty found at index "+i+", activities length "+activities.length+", skipping");
            continue;
          }
          if (activities[i]["Title"] == line){
            currentActivity = activities[i];
            activities.splice(i,1); //remove duplicate
          }
        }
        if (!currentActivity["Category"].includes(currentCategory))
          currentActivity["Category"].push(currentCategory);
        if (!currentActivity["Type"].includes(types[type]))
          currentActivity["Type"].push(types[type]);
        currentActivity["Title"] = line;

        linesAnticipating = 0;
        anticipating = "Image";
        return;
      } else if (anticipating === "Image"){
        currentActivity["Image"] = line;

        linesAnticipating = 1;
        anticipating = "Points"
        return;
      } else if (anticipating === "Points"){

        if (line.trim().replaceAll("\u200B", "") == ""){
          linesAnticipating = 0;
          return;
        }
        //Get points from string
        var points = "";
        line = line.replaceAll("\u200B", "");
        line = line.trim();
        line = line.replaceAll("\u200B", "");
        // console.log("new line:");
        // console.log(line);
        for (var i=0; i<line.length; i++){
          // console.log("char at "+i+": "+line[i]);
          // console.log("charcode at "+i+": "+line.charCodeAt(i));
          if (line[i] == ' ') break;
          points += line[i];
        }
        // console.log(points);
        if (line.includes("Points vary")) points = "*";
        currentActivity["Points"] = points;

        linesAnticipating = 1;
        anticipating = "Description";
        return;
      } else if (anticipating === "Description"){
        line = line.replace("\u200B", "");
        lineCache.push(line.trim());
        // console.log("Is this line blank?");
        // console.log(line.trim()=="");
        // console.log("Last three lines:");
        // console.log(lineCache[lineCache.length-1]);
        // console.log(lineCache[lineCache.length-2]);
        // console.log(lineCache[lineCache.length-3]);
        //Look through the last few lines, check for 3 empty ones
        if (lineCache.length > 2
          && lineCache[lineCache.length-1] == ""
          && lineCache[lineCache.length-2] == ""
          && lineCache[lineCache.length-3] == ""
        ){
          //Add all the lines to the description
          // console.log(lineCache);
          lineCache.splice(lineCache.length-3);
          // console.log(lineCache);
          for (var i in lineCache){
            if (i == 0) currentActivity["Description"] = lineCache[i];
            else {
              currentActivity["Description"] += "\n";
              currentActivity["Description"] += lineCache[i];
            }
          }

          lineCache = [];
          anticipating = "Grade Level";
          linesAnticipating = 2;
          return;
        } else linesAnticipating = 0;
      } else if (anticipating === "Grade Level"){
        var origLine = line;
        line = line.toLowerCase();
        console.log("--------")
        console.log(line);
        if (line == "all grades")
          currentActivity["Grade Level"] = "0-12";
        else if (line.slice(0,6) == "grades"){
          var grade = line.slice(7);
          grade = grade.replace("k", "0");
          var space;
          for (var i in grade)
            //Loop through and cut off at space
            if (grade[i] == ' '){
              space = i;
              break;
            } else if (grade[i] == ','){
              space = i;
              break;
            }
          currentActivity["Grade Level"] = grade.slice(0,space);
        } else if (line == "elementary school") {
          currentActivity["Grade Level"] = "0-5";
        } else if (line == "middle school") {
          currentActivity["Grade Level"] = "6-8";
        } else if (line == "high school") {
          currentActivity["Grade Level"] = "9-12";
        } else if (origLine.includes("Grade")){
          line = line.replace("k", "0");
          currentActivity["Grade Level"] = line[6];
        } else {
          console.log("couldn't find grade, next line");
          linesAnticipating = 0;
          return;
        }
        console.log(currentActivity["Grade Level"]);
        console.log("******");
        console.log(currentActivity);

        anticipating = "Title";
        linesAnticipating = 2;

        //This activity is done, so add it to list
        activities.push(currentActivity);
        // console.log("************");
        // console.log(activities);
        // console.log("************");
        currentActivity = {
          "Title": "",
          "Description": "",
          "Category": [],
          "Type": [],
          "Points": 0,
          "Grade Level": "",
          "Image": ""
        };
      }
    }
  });
}
