/** @format */

const jimp = require("jimp");

const jimpImg = async (tempUpload) => {
  const prepareImg = await jimp.read(tempUpload);
  await prepareImg
    .autocrop()
    .cover(100, 100, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(tempUpload);
  return tempUpload;
};
module.exports = jimpImg;
