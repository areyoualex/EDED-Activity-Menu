const rp = require('request-promise');
const request = require('request');
const fs = require('fs');
const stream = require('stream');
const csv = require('csv-parser');
const readline = require('readline');

const dataURL = "https://docs.google.com/spreadsheets/d/1j1FtQHnnsEf2I2stI0eWrAa-eG6EeRn3QEqNsaOVPv8/gviz/tq?tqx=out:csv&sheet=Activities";

//Read the organization map
fs.readFile('./organizationmap.json', 'utf8', (err, data)=>{
  let orgs = JSON.parse(data); //parse JSON into array, then convert to CSV

  //First, let's make an organization spreadsheet with IDs
  if (err) throw err;
  fs.writeFileSync('organization.csv', '');
  fs.appendFileSync('organization.csv',
    'ID, Name, Photo ID in Google Drive, Link\n');
  for (let org in orgs)
    fs.appendFileSync('organization.csv',
      org+", "+orgs[org].name+"\n");

  //Next, let's make a new activities spreadsheet with organization IDs
  let activities = [];
  request(dataURL)
    .pipe(csv())
    .on('data', (line) => {
      let id = orgs.indexOf(orgs.find((org)=>line.Image.includes(org.URL)));
      line["Organization ID"] = id;
      activities.push(line);
    })
    .on('end', () => {
      fs.writeFileSync('activities.json',JSON.stringify(activities));
    });
});
