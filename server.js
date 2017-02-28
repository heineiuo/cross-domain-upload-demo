const express = require('express');
import formidable from 'formidable'
import path from 'path'
import fs from 'fs-promise'
import {argv} from 'yargs'

const app = express();
const port = argv.port || 8084;

app.use(require('morgan')('combined'));

app.use(express.static(__dirname));

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');

  next();
});

app.route('/upload').post(async (req, res, next) => {
  try {

    const uploadKey = 'file';
    const uploadDir = path.join(__dirname, '/upload');
    const uploadLocation = `http://127.0.0.1:${port}/upload`;
    const uploaded = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.encoding = 'utf-8';
      form.hash = 'md5';
      form.uploadDir = uploadDir;
      form.keepExtensions = true;
      form.multiples = true;

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({fields, files})
      })
    });


    const filesFile = uploaded.files[uploadKey];
    const fileList = filesFile.length > 0 ? filesFile: [filesFile];
    const result = await Promise.all(fileList.map(file => new Promise(async (resolve, reject) => {
      try {
        const fileName = `${file.hash}${path.extname(file.name).toLowerCase()}`;
        await fs.rename(file.path, `${uploadDir}/${fileName}`);
        resolve(`${uploadLocation}/${fileName}`)
      } catch(e){
        reject(e)
      }
    })));

    res.json({result});
  } catch(e){
    res.json({error: e.message});
  }

});

app.listen(port, () => console.log(`listening on ${port}`));
