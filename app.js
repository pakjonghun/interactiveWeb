import express from "express";
import cheerio from "cheerio";
import axios from "axios";

const app = express();

app.listen(4000, () => console.log("server is running"));

const getData = async () => {
  try {
    const res = await axios.get(
      "https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date=20200303"
    );

    const $ = cheerio.load(res.data);
    const bodyList = $("#old_content > table > tbody").children("tr");

    bodyList.each(function (index, item) {
      const title = $(this).find("td.title > div > a").text();
      const rank = $(this).find("td:nth-child(1) > img").attr("alt");
      const url = $(this).find("td.title > div > a").attr("href");
      console.log(title, rank, url);
    });
  } catch (e) {
    console.log(e);
  }
};

getData();
