const fs = require('fs');
const pdfParse = require('pdf-parse');
// const pdfParse = require('pdf-parse/lib/pdf-parse');

async function extractText(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    // console.log("pdf data:", data)
    return data.text;
}

module.exports ={extractText};