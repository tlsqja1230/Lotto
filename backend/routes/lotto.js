var express = require('express');
var router = express.Router();
var axios = require('axios');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("https://dhlottery.co.kr/gameResult.do?method=statByNumber").then(html => {
    const $ = cheerio.load(html.data);
    let arr = [];
    let $tbody = $('#printTarget tbody').children();
    $tbody.each((index,elemnt)=>{
      arr.push(Number($($(elemnt).children()[2]).text()));
    })
    res.send(arr);
  }).catch(err => {
    console.error(err);
  })              
});

module.exports = router;
