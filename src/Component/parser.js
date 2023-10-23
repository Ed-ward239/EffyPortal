// Import dependencies
const fs = require("fs");
const PDFParser = require("pdf2json");

// Get all the filenames from the patients folder
const files = fs.readdirSync("patients");


const parser = () => {
// All of the parse patients
let patients = [];

// Make a IIFE so we can run asynchronous code
(async () => {

    // Await all of the patients to be passed
    // For each file in the patients folder
    await Promise.all(files.map(async (file) => {

        // Set up the pdf parser
        let pdfParser = new PDFParser(this, 1);

        // Load the pdf document
        pdfParser.loadPDF(`patients/${file}`);

        // Parsed the patient
        let patient = await new Promise(async (resolve, reject) => {

            // On data ready
            pdfParser.on("pdfParser_dataReady", (pdfData) => {

                // The raw PDF data in text form
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");

                // Return the parsed data
                resolve({
                    shipName: /SHIP: CARNIVAL\s(.*?)FLEET/i.exec(raw)[1].trim(),
                    voyageNum: /VOYAGE:\s(.*?)EFFY/i.exec(raw)[1].trim(),
                    date: trimDate(resolve.voyageNum),
                    effyShare: /(FROM) EFFY\s(.*?)PAYMENT/i.exec(raw)[1].trim(),
                    revSS: /PLUS SAIL AND SIGN REVENUE\s(.*?))LESS/i.exec(raw)[1].trim(),
                    revCC: /PLUS DIRECT CC REVENUE\s(.*?))LESS/i.exec(raw)[1].trim(),
                    execFolio: /LESS EXECUTIVE FOLIO CHARGES\s(.*?))LESS/i.exec(raw)[1].trim(),
                    euRev: /LESS EUROPE REVENUE\s(.*?))LESS/i.exec(raw)[1].trim(),
                    carnivalShare: /LESS CCL SHARE OF REVENUE\s(.*?))LESS/i.exec(raw)[1].trim(),
                    officeSup: /LESS OFFICE SUPPLIES\s(.*?))LESS/i.exec(raw)[1].trim(),
                    discount: /PLUS CCL CREW SALES DISCOUNT\s(.*?))LESS/i.exec(raw)[1].trim(),
                    ssFee: /LESS SAIL AND SIGN CC PROCESSING F\s(.*?))LESS/i.exec(raw)[1].trim(),
                    ccFee: /LESS DIRECT CREDIT CARD PROCESSIN\s(.*?))LESS/i.exec(raw)[1].trim(),
                    paroleFee: /LESS PAROLE FEE\s(.*?))LESS/i.exec(raw)[1].trim(),
                    cashAdv: /LESS CASH VISA\s(.*?))LESS/i.exec(raw)[1].trim(),
                    cashPaid: /LESS CASH ADVANCE PAID ONBOARD\s(.*?))LESS/i.exec(raw)[1].trim(),
                    mealCharge: /LESS MEALS CHARGE\s(.*?))NET/i.exec(raw)[1].trim()
                });

            });

        });

        // Add the patient to the patients array
        patients.push(patient);

    }));

    // Save the extracted information to a json file
    fs.writeFileSync("patients.json", JSON.stringify(patients));

    // Date trimming (Accept 2 type of voyage numbers and convert to date)
    function trimDate(inputStr) {
        let year, month, day;
      
        if (inputStr.length === 13) {
          year = inputStr.substring(2, 6);
          month = inputStr.substring(6, 8);
          day = inputStr.substring(8, 10);
        } else if (inputStr.length === 10) {
          month = inputStr.substring(4, 6);
          day = inputStr.substring(6, 8);
          year = '20' + inputStr.substring(8, 11);
        } else {
          return "Invalid input length";
        }
        return `${month}-${day}-${year}`;
      }
})(); 
}
export default parser; 