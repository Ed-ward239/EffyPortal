const fs = require('fs');
const pdfparse = require('pdf-parse');
const pdffile = fs.readFileSync('./EL20231002005.pdf'); // path to the file

// get info from pdf
pdfparse(pdffile).then(function (data){
    // PDF text
    console.log(data.text.trim());
    }).catch(function(error){
        console.log("Error parsing the pdf")
})



