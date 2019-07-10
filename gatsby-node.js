const request = require('request');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

const dataURL = "https://docs.google.com/spreadsheets/d/1j1FtQHnnsEf2I2stI0eWrAa-eG6EeRn3QEqNsaOVPv8/gviz/tq?tqx=out:csv&sheet=organization";

exports.onPreInit = (() => {
  //clear org img directory
  const orgpath = 'static/img/orgs/';
  if (fs.existsSync(orgpath))
    fs.readdir(orgpath, (err, files) => {
      if (err) throw err;
      for (const file of files)
        fs.unlinkSync(path.join(orgpath, file));
    });
  else fs.mkdirSync(orgpath,{recursive: true});

  request(dataURL)
    .pipe(csv())
    .on('data', org => {
      //download image
      request({
        url: "https://drive.google.com/uc?export=view&id="
          + org["Photo ID in Google Drive"],
        encoding: 'binary',
        method: 'GET'
      })
        .pipe(fs.createWriteStream(
          orgpath+'id'+org["ID"],
          {encoding: 'binary'}
        ));
    })
    .on('end', () => {
      //do something
      console.log('Organization images written to src/img/orgs/');
    });
});
