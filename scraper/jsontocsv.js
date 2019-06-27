const fs = require('fs');

fs.readFile('activities.json', (err, data)=>{
  if (err) throw err;
  var json = JSON.parse(data);

  const types = [
    "Assemblies",
    "Curriculum",
    "Field Trips",
    "Presentations",
    "School-wide Intitiatives"
  ]
  const categories = [
    "Carbon Neutrality",
    "Water Resilience",
    "Zero Waste",
    "Sustainable Transportation",
    "Connection to Nature",
    "All"
  ];
  let file = fs.createWriteStream('activities.csv');

  var firstLine = "";
  for (var i in json[0]) {
    firstLine += i+",";
  }
  firstLine = firstLine.slice(0,-1);
  firstLine+="\n";
  console.log(firstLine);
  file.write(firstLine);

  //Now, loop through all instances and add to CSV...
  for (var activity of json) {
    var line = "";
    //title
    var regex = /"/gi;
    activity["Title"] = activity["Title"].replace(regex,"\"\"")
    line+="\""+activity["Title"]+"\",";
    //description
    var regex = /"/gi;
    activity["Description"] = activity["Description"].replace(regex,"\"\"")
    line+="\""+activity["Description"]+"\",";
    // console.log(activity["Description"]);
    //categories
    let categoryString = "\"";
    for (var cat of activity["Category"]) {
      categoryString+=cat+","
    }
    categoryString = categoryString.slice(0,-1);
    categoryString+="\",";
    line+=categoryString;
    //types
    let typeString = "\"";
    for (var type of activity["Type"]) {
      typeString+=type+","
    }
    typeString = typeString.slice(0,-1);
    typeString+="\",";
    line+=typeString;
    //points
    line+=activity["Points"]+",";
    //grade level
    line+=activity["Grade Level"]+",";
    //image
    line+="\""+activity["Image"]+"\"\n";

    //write line
    file.write(line);
  }
});
