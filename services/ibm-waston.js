const VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

// 9b98de65b9fa7232eb31b692820bd7f8
// ed04ca16
const fs = require("fs");
const uuidv4 = require("uuid/v4");

require("dotenv").config(); // import API KEY

// Business Logic to Parse and Read File
function createFile(ImageData) {
  const fileName = `${uuidv4()}.jpeg`;
  fs.writeFile(
    `./uploads/camera-uploads/${fileName}`,
    ImageData,
    "base64",
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File Created at " + new Date());
      }
    }
  );
  return `uploads/camera-uploads/${fileName}`;
}

const visualRecognition = new VisualRecognitionV3({
  version: "2018-03-19",
  authenticator: new IamAuthenticator({
    apikey: process.env.IBMKEY,
  }),
  url: process.env.IBMURL,
});

var classify = {
  find_upload: function (req, res) {
    const classifyParams = {
      imagesFile: fs.createReadStream(req.file.path),
      classifierIds: ["food"],
    };
    visualRecognition
      .classify(classifyParams)
      .then((response) => {
        const classifiedImages =
          response.result.images[0].classifiers[0].classes;
        return classifiedImages;
      })
      .then(function (Data) {
        var newMLArr = [];
        for (var i = 0; i < Data.length; i++) {
          newMLArr.push({ name: Data[i].class, score: Data[i].score });
        }
        console.log(newMLArr);
        res.send({ Status: 200, Data: newMLArr });
      })
      .catch((err) => {
        console.log("error:", err);
        res.send({ Status: 500, Data: err });
      });
  },
  camera_upload: function (req, res) {
    var base64Data = req.body.Data.replace("data:image/jpeg;base64,", "");
    console.log(base64Data);
    const classifyParams = {
      imagesFile: fs.createReadStream(createFile(base64Data)),
      classifierIds: ["food"],
    };
    visualRecognition
      .classify(classifyParams)
      .then((response) => {
        console.log(response);
        const classifiedImages =
          response.result.images[0].classifiers[0].classes;
        return classifiedImages;
      })
      .then(function (Data) {
        var newMLArr = [];
        console.log(Data);
        for (var i = 0; i < Data.length; i++) {
          newMLArr.push({ name: Data[i].class, score: Data[i].score });
        }
        console.log(newMLArr);
        res.send({ Status: 200, Data: newMLArr });
      })
      .catch((err) => {
        console.log("error:", err);
        res.send({ Status: 500, Data: err });
      });
  },
};

module.exports = classify;
