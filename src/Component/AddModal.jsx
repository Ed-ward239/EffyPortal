import React, { useState } from "react";
//import { pdfjs } from "pdfjs-dist";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";
import "./Modal.css";
import { useUsername } from "./useUsername";

// Const function to extract text from the uploaded pdf file
const extractTextFromPdf = async (file) => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target.result);
        const pdf = await getDocument(typedArray).promise;
        let extractedText = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          //console.log(pageText); // Check the text of each page
          extractedText += pageText + " ";
          //console.log(extractedText) // Debug
        }
        resolve(extractedText);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = () => {
      fileReader.abort();
      reject(new DOMException("Problem parsing input file."));
    };

    fileReader.readAsArrayBuffer(file);
  });
};

// Scan Exec.Folio from the pdf, return one if only 1 value, add all if multiple lines
function sumOfExecFolio(str) {
  const regex = /LESS EXECUTIVE FOLIO CHARGES[^()]*\(([\d,.]+)\)/g;
  let total = 0;
  let match;
  while ((match = regex.exec(str)) !== null) {
    total += parseFloat(match[1].replace(/,/g, ""));
  }
  return total === 0 ? "" : total.toFixed(2);
}

// Date trimming (Accept 2 type of voyage numbers and convert to date)
function trimDate(inputStr) {
  let match;
  if (inputStr.length === 13) {
    match = inputStr.match(/.{2}(\d{4})(\d{2})(\d{2})/);
  } else if (inputStr.length === 10) {
    match = inputStr.match(/(\d{4})(\d{2})20(\d{2})/);
  } else {
    return "Invalid input length";
  }
  if (match) {
    const [, year, month, day] = match;
    return `${month}-${day}-${year}`;
  }
  return "Invalid input format";
}

const AddModal = () => {
  const editor = useUsername();
  
  const [ pdfData, setPdfData ] = useState({
    shipName: '', voyageNum: '', date: '', effyShare: '', editor: editor, revSS: '',
    revCC: '', ssFee: '', ccFee: '', euVAT: '', discounts: '', carnivalShare: '', execFolio: '',
    mealCharge: '', officeSup: '', cashAdv: '', cashPaid: '', paroleFee: ''
  });
  
  const handleFileChange = async (event) => {
    const file =  event.target.files[0];
    if (!file) return;
    try{
      const extractedData = await extractTextFromPdf(file);
      //console.log(extractedData);       // Debug
      function extractValue(regexPattern) {
        const match = extractedData.match(regexPattern);
        return match ? match[1] : '';
      }

      // Retrieve the last word from the first line as ShipName
      const shipName = extractValue(/SHIP: CARNIVAL (\w+)/);
      // Retrieve the last string from the second line as VoyageNum
      const voyageNum = extractValue(/VOYAGE: (\w+)/);
      // Retrieve the date from voyageNum
      const date = trimDate(voyageNum);
      // Initialize the variables to store the data using regular expression
      const effyShare = extractValue(/FROM\) EFFY\s+(\d+,\d+\.\d+)/);
      const revSS = extractValue(/PLUS SAIL AND SIGN REVENUE\s+(\d+,\d+\.\d+)/);
      const revCC = extractValue(/PLUS DIRECT CC REVENUE\s+(\d+,\d+\.\d+)/);
      const carnivalShare = extractValue(/LESS CCL SHARE OF REVENUE\s+\((\d+,\d+\.\d+)\)/);
      const execFolio = sumOfExecFolio(extractedData);
      const ssFee = extractValue(/LESS SAIL AND SIGN CC PROCESSING FEE.*?\((\d+\.\d+)\)/);
      const ccFee = extractValue(/LESS DIRECT CREDIT CARD PROCESSING FEE.*?\((\d+\.\d+)\)/);
      const discounts = extractValue(/PLUS CCL CREW SALES DISCOUNT.*?\((\d+\.\d+)\)/);
      const mealCharge = extractValue(/LESS MEAL CHARGE.*?\((\d+\.\d+)\)/);
      const officeSup = extractValue(/LESS OFFICE SUPPLIES.*?\((\d+,\d+\.\d+)\)/);
      const euVAT = extractValue(/LESS EU VAT.*?\((\d+,\d+\.\d+)\)/);
      const paroleFee = extractValue(/LESS PAROLE FEE.*?\((\d+\.\d+)\)/);
      const cashAdv = extractValue(/LESS CASH VISA.*?\((\d+,\d+\.\d+)\)/);
      const cashPaid = extractValue(/LESS CASH PAID ON BOARD.*?\((\d+,\d+\.\d+)\)/);
      // Add more conditions here as necessary for other fields.
      setPdfData({...pdfData, shipName, voyageNum, date, effyShare, editor, revSS, revCC, 
                              discounts, carnivalShare, execFolio, ssFee, ccFee, mealCharge, cashAdv, 
                              paroleFee, euVAT, cashPaid, officeSup})
    }catch (error){
      console.error('Error parsing the PDF: ', error);
    }
  };

  // Pdf drag&drop
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      await handleFileChange({ target: { files: [file] } });
    }
  };

  // Pdf Drag
  const handleDragOver = (event) => {
    event.preventDefault(); // Necessary to allow for drop
  };

  // Return ReactJS format input text
    return (
      <>
        <form class="inputForm">
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="shipName"
              label="Ship Name"
              onChange={(e) =>
                setPdfData({ ...pdfData, shipName: e.target.value })
              }
              value={pdfData.shipName}
            />
            <label class="floating-label">Ship Name</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="voyageNum"
              label="Voyage #"
              onChange={(e) =>
                setPdfData({ ...pdfData, voyageNum: e.target.value })
              }
              value={pdfData.voyageNum}
            />
            <label class="floating-label">Voyage #</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="date"
              label="Date (mm/dd/yyyy)"
              onChange={(e) => setPdfData({ ...pdfData, date: e.target.value })}
              value={pdfData.date}
            />
            <label class="floating-label">Date</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="effyShare"
              label="Effy Share"
              onChange={(e) =>
                setPdfData({ ...pdfData, effyShare: e.target.value })
              }
              value={pdfData.effyShare}
            />
            <label class="floating-label">Effy Share</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="editor"
              label="Editor"
              value={pdfData.editor}
              readOnly
            />
            <label class="floating-label">Editor</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="revSS"
              label="Revenue S&S"
              onChange={(e) =>
                setPdfData({ ...pdfData, revSS: e.target.value })
              }
              value={pdfData.revSS}
            />
            <label class="floating-label">Revenue S&S</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="revCC"
              label="Revenue CC"
              onChange={(e) =>
                setPdfData({ ...pdfData, revCC: e.target.value })
              }
              value={pdfData.revCC}
            />
            <label class="floating-label">Revenue CC</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="ssFee"
              label="S&S Fee"
              onChange={(e) =>
                setPdfData({ ...pdfData, ssFee: e.target.value })
              }
              value={pdfData.ssFee}
            />
            <label class="floating-label">S&S Fee</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="ccFee"
              label="CC Fee"
              onChange={(e) =>
                setPdfData({ ...pdfData, ccFee: e.target.value })
              }
              value={pdfData.ccFee}
            />
            <label class="floating-label">CC Fee</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="euVAT"
              label="EU VAT"
              onChange={(e) =>
                setPdfData({ ...pdfData, euVAT: e.target.value })
              }
              value={pdfData.euVAT}
            />
            <label class="floating-label">EU VAT</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="discounts"
              label="Discounts"
              onChange={(e) =>
                setPdfData({ ...pdfData, discounts: e.target.value })
              }
              value={pdfData.discounts}
            />
            <label class="floating-label">Discounts</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="carnivalShare"
              label="Carnival Share"
              onChange={(e) =>
                setPdfData({ ...pdfData, carnivalShare: e.target.value })
              }
              value={pdfData.carnivalShare}
            />
            <label class="floating-label">Carnival Share</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="execFolio"
              label="Exec. Folio"
              onChange={(e) =>
                setPdfData({ ...pdfData, execFolio: e.target.value })
              }
              value={pdfData.execFolio}
            />
            <label class="floating-label">Exec. Folio</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="mealCharge"
              label="Meal Charge"
              onChange={(e) =>
                setPdfData({ ...pdfData, mealCharge: e.target.value })
              }
              value={pdfData.mealCharge}
            />
            <label class="floating-label">Meal Charge</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="officeSup"
              label="Office Supplies"
              onChange={(e) =>
                setPdfData({ ...pdfData, officeSup: e.target.value })
              }
              value={pdfData.officeSup}
            />
            <label class="floating-label">Office Supplies</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="cashPaid"
              label="Cash Paid Onboard"
              onChange={(e) =>
                setPdfData({ ...pdfData, cashPaid: e.target.value })
              }
              value={pdfData.cashPaid}
            />
            <label class="floating-label">Cash Paid Onboard</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="cashAdv"
              label="Cash Advance"
              onChange={(e) =>
                setPdfData({ ...pdfData, cashAdv: e.target.value })
              }
              value={pdfData.cashAdv}
            />
            <label class="floating-label">Cash Advance</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="paroleFee"
              label="Parole Fee"
              onChange={(e) =>
                setPdfData({ ...pdfData, paroleFee: e.target.value })
              }
              value={pdfData.paroleFee}
            />
            <label class="floating-label">Parole Fee</label>
          </div>
          <div class="txtInputGrp">
            <select
              class="inputSelect"
              onChange={(e) =>
                setPdfData({ ...pdfData, paidStatus: e.target.value })
              }
              value={pdfData.statusPaid}
            >
              <option value=""></option>
              <option value="1">Unpaid</option>
              <option value="2">Pending</option>
              <option value="3">Paid</option>
            </select>
            <label class="floating-label">Status</label>
          </div>
        </form>
        <div className="btns" onDrop={handleDrop} onDragOver={handleDragOver} >
          <input className="fileUpload" type="file" onChange={handleFileChange} accept=".pdf"/>
          <button className="submitBtn">Submit</button>
        </div>
      </>
    );
}
export default AddModal;

// Example Node.js version with pdf-parse

// import React, { useState } from "react";
// import pdfparse from "pdf-parse";

// function FileUpload() {
//   const [pdfContent, setPdfContent] = useState("");

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const buffer = e.target.result;
//         try {
//           const data = await pdfparse(buffer);
// PDF text
//           const pdfdata = data.text.trim();
// ... rest of your parsing logic ...

// Example: Set Ship Name in state
//           const lines = pdfdata.split("\n");
//           const shipNameLine = lines[0].trim();
//           const shipName = shipNameLine.split(" ").pop();
//           setPdfContent(`Ship Name: ${shipName}`);

// Retrieve the last string from the second line as VoyageNum
//           const voyageLine = lines[1].trim();
//           const voyageNum = voyageLine.split(" ").pop();
//           setPdfContent(`Voyage #: ${voyageNum}`);

// Date trimming (Accept 2 type of voyage numbers and convert to date)
//           function trimDate(inputStr) {
//             let year, month, day;
//             if (inputStr.length === 13) {
//               year = inputStr.substring(2, 6);
//               month = inputStr.substring(6, 8);
//               day = inputStr.substring(8, 10);
//             } else if (inputStr.length === 10) {
//               month = inputStr.substring(4, 6);
//               day = inputStr.substring(6, 8);
//               year = "20" + inputStr.substring(8, 11);
//             } else {
//               return "Invalid input length";
//             }
//             return `${month}-${day}-${year}`;
//           }
//           const date = trimDate(voyageNum);
//           setPdfContent(`Date: ${date}`);

// Initialize the variables to store the data
//           let effyShare, revSS, revCC, discounts = null, carnivalShare,
//             execFolio, euVAT = null, ssFee, ccFee, mealCharge = null, paroleFee = null,
//             cashAdv = null, officeSup = null, cashPaid = null;

// Get the last string of numbers from the line "NET AMOUNT DUE" as effyShare
//           const netAmountLine = lines.find((line) =>
//             line.includes("NET AMOUNT DUE")
//           );
//           const netAmountMatches = netAmountLine.match(/\d+\.\d+/g);
//           effyShare = netAmountMatches[netAmountMatches.length - 1];
//           setPdfContent(`Effy Share: ${effyShare}`);

// Go through all the lines between "REVENUE SETTLEMENT" and "NET AMOUNT"
//           const revenueSettlementIndex = lines.findIndex((line) =>
//             line.includes("REVENUE SETTLEMENT")
//           );
//           const netAmountIndex = lines.findIndex((line) =>
//             line.includes("NET AMOUNT DUE")
//           );
//           const transactionLines = lines.slice(
//             revenueSettlementIndex + 1,
//             netAmountIndex
//           );

//           transactionLines.forEach((line) => {
//             const amountMatch = line.match(/\(([\d.,]+)\)/);
//             const amount = amountMatch ? amountMatch[1].replace(/,/g, "") : null;

//             if (line.startsWith(" PLUS  SAIL AND SIGN"))
//               revSS = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
//             if (line.startsWith(" PLUS  DIRECT CC REVENUE"))
//               revCC = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
//             if (line.startsWith(" PLUS CCL CREW SALES DISCOUNT"))
//               discounts = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, "");
//             if (line.startsWith(" LESS  CCL SHARE OF REVENUE"))
//               carnivalShare = amount;
//             if (line.startsWith(" LESS  EXECUTIVE FOLIO")) execFolio = amount;
//             if (line.startsWith(" LESS  SAIL AND SIGN CC PROCESSING FEES"))
//               ssFee = amount;
//             if (line.startsWith(" LESS  DIRECT CREDIT CARD PROCESSING FEE"))
//               ccFee = amount;
//             if (line.startsWith(" LESS  MEAL CHARGE")) mealCharge = amount;
//             if (line.startsWith(" LESS  CASH VISA")) cashAdv = amount;
//             if (line.startsWith(" LESS PAROLE")) paroleFee = amount;
//             if (line.startsWith(" LESS EUROPE")) euVAT = amount;
//             if (line.startsWith(" LESS CASH PAID ON BOARD")) cashPaid = amount;
//             if (line.startsWith(" LESS OFFICE SUPPLIES")) officeSup = amount;
// Add more conditions here as necessary for other fields.
// setPdfContent() to return
//             setPdfContent(`Ship Name: ${shipName}`);
//             setPdfContent(`Voyage#: ${voyageNum}`);
//             setPdfContent(`Date: ${date}`);
//             setPdfContent(`Effy Share: ${effyShare}`);
//             setPdfContent(`revSS: ${revSS}`);
//             setPdfContent(`revCC: ${revCC}`);
//             setPdfContent(`euVAT: ${euVAT}`);
//             setPdfContent(`Carnival Share: ${carnivalShare}`);
//             setPdfContent(`execFolio: ${execFolio}`);
//             setPdfContent(`Discount: ${discounts}`);
//             setPdfContent(`ssFee: ${ssFee}`);
//             setPdfContent(`ccFee: ${ccFee}`);
//             setPdfContent(`mealCharge: ${mealCharge}`);
//             setPdfContent(`cashAdv: ${cashAdv}`);
//             setPdfContent(`Office Supplies: ${officeSup}`);
//             setPdfContent(`Parole Fee: ${paroleFee}`);
//             setPdfContent(`Cash Paid Onboard: ${cashPaid}`);
//           });
// Log other variables as they are captured
// catch error
//         } catch (error) {
//           console.error("Error parsing the pdf:", error);
//           setPdfContent("Error parsing the PDF");
//         }
//       };
//       reader.readAsArrayBuffer(file);
//     }
//   };

//   return (
//     <>
//       <input
//         className="uploadPDF"
//         type="file"
//         onChange={handleFileChange}
//         accept=".pdf"
//       />
//       <div>{pdfContent}</div>
//     </>
//   );
// }
// export default FileUpload;
