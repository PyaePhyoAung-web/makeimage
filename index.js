import express from "express";
import path from "path";
import serveStatic from "serve-static";
import * as PImage from "pureimage";
import * as fs from "fs";

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use("/", serveStatic(path.join(__dirname, "/public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/login", function (req, res) {
  res.send("bgdshka");
});

app.get("/makeimage", (req, res) => {
  const { width = 100, height = 100 } = req.query;

  // make image
  const img = PImage.make(width, height);

  // get canvas context
  const ctx = img.getContext("2d");

  // fill with black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 100, 100);

  //write black image or black square by default (we can save only binary too, without extension)
  PImage.encodePNGToStream(img, fs.createWriteStream("makeimage.png"))
    .then(() => {
      res.download("makeimage.png");
      console.log("wrote out the makeimage.png png file");
    })
    .catch(e => {
      console.log("there was an error writing");
    });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
