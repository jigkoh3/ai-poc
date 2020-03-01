async function detect(fileName) {
  // Imports the Google Cloud client library
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  try {
    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Read a local image as a text document
    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(`Full text: ${fullTextAnnotation.text}`);
    // fullTextAnnotation.pages.forEach(page => {
    //   page.blocks.forEach(block => {
    //     console.log(`Block confidence: ${block.confidence}`);
    //     block.paragraphs.forEach(paragraph => {
    //       console.log(`Paragraph confidence: ${paragraph.confidence}`);
    //       paragraph.words.forEach(word => {
    //         const wordText = word.symbols.map(s => s.text).join("");
    //         console.log(`Word text: ${wordText}`);
    //         console.log(`Word confidence: ${word.confidence}`);
    //         word.symbols.forEach(symbol => {
    //           console.log(`Symbol text: ${symbol.text}`);
    //           console.log(`Symbol confidence: ${symbol.confidence}`);
    //         });
    //       });
    //     });
    //   });
    // });
  } catch (error) {}
}


async function quickstart(fileName) {
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  try {
    // Performs text detection on the local file
    const [result] = await client.textDetection(fileName);
    const detections = result.textAnnotations;
    // console.log("Text");
    // detections.forEach(text => {
    //   console.log(text);
    // });
    console.log(detections[0].description);
  } catch (error) {
    console.log(error);
  }
}





const fs = require("fs");
// require('log-timestamp');

const watchDir = "./images";
const files = [];

fs.watch(watchDir, (event, filename) => {
  console.log(`Watching for file changes on ${watchDir}`);
  console.log(event);
  if (event === "change") {
    (async () => {
      await quickstart(`${watchDir}/${filename}`);
    })();
  }
});
