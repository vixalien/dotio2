import fs from "fs";
import path from "path";
import { cwd } from "process";
import sharp from "sharp";
import glob from "glob";

const dir = (fPath) => path.join(cwd(), fPath);

const ensureDirSync = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const stripExtension = (filePath) => {
  const ext = path.extname(filePath);
  return filePath.substring(0, filePath.length - ext.length);
}

const relative = (to, fPath) => {
  return path.relative(dir(to), fPath);
}

// if the public/.build/images directory doesn't exist, create it
ensureDirSync(dir("public/.build/images"));

// get the list of files in the images directory
const files = glob.sync(dir("./public/images/posts/**/*.{jpg,jpeg,png,gif}"))
  .map(absolutePath => {
    // strip the ./public/images/ prefix
    return relative("./public/images", absolutePath);
  })

// resize each image and save it to the public/.build/images directory

// sizes best for responsive images
const sizes = [
  600,
  1200,
  3000,
];

console.log("Optimizing images...");
Promise.all(files.map(file => {
  const image = sharp(dir(`./public/images/${file}`));
  return Promise.all(sizes.map(size => {
    const out = dir(`./public/.build/images/${size}/${stripExtension(file)}.webp`);
    if (fs.existsSync(out)) return console.log("Image already optimized", relative("./public/.build/images", out));
    ensureDirSync(path.dirname(out));
    return image
      .resize(size)
      .toFile(out)
      .then(() => console.log("Optimized", relative("./public/.build/images", out)));
  }));
}))
  .then(() => console.log("Done!"))
