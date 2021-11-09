const { Router } = require("express");
const path = require('path')
const p = path.resolve(__dirname,`../../client/dist/index.html`)
// console.log('path: '+ p)
const route = Router();

route.get("/", (req, res) => {
  try {
   return res.status(200).sendFile(p)
  } catch (e) {
    console.log(e);
  }
});

module.exports = route;
