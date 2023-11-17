const fs = require("fs");
const pdfparse = require("pdf-parse");
const pdffile = fs.readFileSync("./EL20231002005.pdf"); // path to the file

// get info from pdf
pdfparse(pdffile)
  .then(function (data) {
    // PDF text
    const pdfdata = data.text.trim();
    // Splitting text into lines
    const lines = pdfdata.split("\n");

    // Retrieve the last word from the first line as ShipName
    const shipNameLine = lines[0].trim();
    const shipName = shipNameLine.split(" ").pop();

    // Retrieve the last string from the second line as VoyageNum
    const voyageLine = lines[1].trim();
    const voyageNum = voyageLine.split(" ").pop();
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
        year = "20" + inputStr.substring(8, 11);
      } else {
        return "Invalid input length";
      }
      return `${month}-${day}-${year}`;
    }
    const date = trimDate(voyageNum);
    // Initialize the variables to store the data
    let effyShare,
      revSS,
      revCC,
      discounts = null,
      carnivalShare,
      execFolio,
      euVAT = null,
      ssFee,
      ccFee,
      mealCharge = null,
      paroleFee = null,
      cashAdv = null,
      officeSup = null,
      cashPaid = null;

    // Get the last string of numbers from the line "NET AMOUNT DUE" as effyShare
    const netAmountLine = lines.find((line) => line.includes("NET AMOUNT DUE"));
    const netAmountMatches = netAmountLine.match(/\d+\.\d+/g);
    effyShare = netAmountMatches[netAmountMatches.length - 1];

    // Go through all the lines between "REVENUE SETTLEMENT" and "NET AMOUNT"
    const revenueSettlementIndex = lines.findIndex((line) =>
      line.includes("REVENUE SETTLEMENT")
    );
    const netAmountIndex = lines.findIndex((line) =>
      line.includes("NET AMOUNT DUE")
    );
    const transactionLines = lines.slice(
      revenueSettlementIndex + 1,
      netAmountIndex
    );

    transactionLines.forEach((line) => {
      const amountMatch = line.match(/\(([\d.,]+)\)/);
      const amount = amountMatch ? amountMatch[1].replace(/,/g, "") : null;

      if (line.startsWith(" PLUS  SAIL AND SIGN"))
        revSS = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
      if (line.startsWith(" PLUS  DIRECT CC REVENUE"))
        revCC = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
      if (line.startsWith(" PLUS CCL CREW SALES DISCOUNT"))
        discounts = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
      if (line.startsWith(" LESS  CCL SHARE OF REVENUE"))
        carnivalShare = amount;
      if (line.startsWith(" LESS  EXECUTIVE FOLIO")) execFolio = amount;
      if (line.startsWith(" LESS  SAIL AND SIGN CC PROCESSING FEES"))
        ssFee = amount;
      if (line.startsWith(" LESS  DIRECT CREDIT CARD PROCESSING FEE"))
        ccFee = amount;
      if (line.startsWith(" LESS  MEAL CHARGE")) mealCharge = amount;
      if (line.startsWith(" LESS  CASH VISA")) cashAdv = amount;
      if (line.startsWith(" LESS PAROLE")) paroleFee = amount;
      if (line.startsWith(" LESS EUROPE")) euVAT = amount;
      if (line.startsWith(" LESS CASH PAID ON BOARD")) cashPaid = amount;
      if (line.startsWith(" LESS OFFICE SUPPLIES")) officeSup = amount;
      // Add more conditions here as necessary for other fields.
    });

    console.log(`Ship Name: ${shipName}`);
    console.log(`Voyage#: ${voyageNum}`);
    console.log(`Date: ${date}`);
    console.log(`Effy Share: ${effyShare}`);
    console.log(`revSS: ${revSS}`);
    console.log(`revCC: ${revCC}`);
    console.log(`euRev: ${euVAT}`);
    console.log(`Carnival Share: ${carnivalShare}`);
    console.log(`execFolio: ${execFolio}`);
    console.log(`Discount: ${discounts}`);
    console.log(`ssFee: ${ssFee}`);
    console.log(`ccFee: ${ccFee}`);
    console.log(`mealCharge: ${mealCharge}`);
    console.log(`cashAdv: ${cashAdv}`);
    console.log(`Office Supplies: ${officeSup}`);
    console.log(`Parole Fee: ${paroleFee}`);
    console.log(`Cash Paid Onboard: ${cashPaid}`);
    // Log other variables as they are captured
  })
  .catch(function (error) {
    console.log("Error parsing the pdf");
  });
