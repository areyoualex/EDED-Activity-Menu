const rp = require('request-promise');
const request = require('request');
const fs = require('fs');
const stream = require('stream');
const csv = require('csv-parser');

const dataURL = "https://docs.google.com/spreadsheets/d/1j1FtQHnnsEf2I2stI0eWrAa-eG6EeRn3QEqNsaOVPv8/gviz/tq?tqx=out:csv&sheet=Activities";

rp(dataURL)
  .then(async (data) => {
    let newData = await handleActivityData(data);
    let processedURLS = [];
    fs.writeFileSync(`index.html`,'');
    for (let act of newData){
      if (processedURLS.map(a => a.URL).includes(act.Image)){
        processedURLS.find(a => a.URL == act.Image).activities.push(act.Title);
        continue;
      }
      else processedURLS.push(
        {URL: act.Image, activities:[act.Title], name:""}
      );
      request(
        {
          encoding: 'binary',
          url: act.Image,
          method: "GET"
        },
        (err, res, body) => {
          if (err) {
            console.log("Error requesting from URL "+act.Image);
            console.log("----------------");
            console.log(err);
            return;
          }
          let ext = res.headers['content-type'].split("/")[1];
          let safeTitle = act.Title.replace(/[^a-zA-Z0-9]/g, '');
          act.safeTitle = safeTitle;
          let path = './images/'+safeTitle+"."+ext;

          fs.writeFile(path, body, 'binary', (err)=>{
            if (err) throw err;
          });
          fs.appendFileSync(
            './index.html',
            `<div><p>`+path+`</p><img src="`+path+`" /></div>`
          );
          console.log("appended: " +`<div><p>`+path+`</p><img src="`+path+`" /></div>`);
        });
    }
    fs.writeFile('urlMap.json',JSON.stringify(processedURLS),
      (err)=>{if (err) throw err;});
    console.log('wrote urlMap.json');
  })
  .catch(err => {
    console.log("Error requesting from url "+dataURL);
    console.log("----------");
    console.log(err);
  });

let handleActivityData = (raw) => {
  return new Promise(resolve => {
    let s = new stream.Readable();
    s._read = () => {};
    s.push(raw);
    s.push(null);
    let ret = [];
    s.pipe(csv())
      .on('data', (data) => {
        //fix category and type data
        data["Category"] = data["Category"].split(',');
        data["Type"] = data["Type"].split(',');

        //fix category "All";
        if (data["Category"].includes("All"))
          data["Category"] = [
            "Carbon Neutrality",
            "Water Resilience",
            "Zero Waste",
            "Sustainable Transportation",
            "Connection to Nature"
          ];

        //fix link data
        data["Links"] = [
        {
          "Link": data["Link"],
          "Text": data["Link Text"]
        },
        {
          "Link": data["Link 2"],
          "Text": data["Link Text 2"]
        },
        {
          "Link": data["Link 3"],
          "Text": data["Link Text 3"]
        },
        ];

        ret.push(Object.assign({}, data));
      })
      .on('end', () => {
        console.log("done loading!");
        resolve(ret);
      });
  });
};
