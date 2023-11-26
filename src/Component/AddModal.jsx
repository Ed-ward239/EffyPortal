import React, { useState } from "react";
//import { pdfjs } from "pdfjs-dist";
import { getDocument } from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";
import "./Modal.css";
import { useUsername } from "./useUsername";

//pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';

const AddModal = ({ props }) => {
  const editedBy = useUsername();
  const initFormState = { shipName: '', voyageNum: '', date: '', effyShare: '', editedBy,
    revSS: '', revCC: '', ssFee: '', ccFee: '', execFolio: '', carnivalShare: '', euVAT: '',
    discounts: '', mealCharge: '', officeSup: '', paroleFee: '', cashAdv: '', cashPaid: '',
  };
  const [row, setRow] = useState(initFormState);
  // const [pdfContent, setPdfContent] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRow({ ...row, [name]: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader(file);

    reader.onload = async (e) => {
      const contents = e.target.result;
      try {
        const pdf = await getDocument({ data: contents }).promise;
        const numPages = pdf.numPages;
        let extractedText = "";
        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          extractedText += pageText + " ";
        }
        console.WriteLine(extractedText);
        // Now process the extracted text
        const lines = extractedText.split("\n");
        const shipName = lines[0]?.trim().split(" ").pop();
        // Retrieve the last string from the second line as VoyageNum
        const voyageNum = lines[1]?.trim().split(" ").pop();
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
        let effyShare, revSS, revCC, carnivalShare, execFolio, ssFee, ccFee, euVAT,
            discounts, mealCharge, paroleFee, cashAdv, officeSup, cashPaid;

        // Get the last string of numbers from the line "NET AMOUNT DUE" as effyShare
        const netAmountLine = lines.find((line) =>
          line.includes("NET AMOUNT DUE")
        );
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
          /*console.log(`Ship Name: ${shipName}`);
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
            console.log(`Cash Paid Onboard: ${cashPaid}`); */
        });
        // Then update the state
        setRow({ shipName, voyageNum, date, effyShare, revSS, revCC, carnivalShare,
                 execFolio, ssFee, ccFee, euVAT, discounts, mealCharge, paroleFee,
                 cashAdv, officeSup, cashPaid,
        });
      } catch (error) {
        //reader.readAsArrayBuffer(file);
        reader.onerror = (error) => {
          console.error("Error reading file: ", error);
        }
      }
    }
    };

    return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!row.voyageNum || !row.voyageNum) return;
              props.addModal(row);
              setRow(initFormState);
            }}
          >
            <div className="inputs">
              <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={row.shipName}/>
              <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={row.voyageNum}/>
              <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={row.date}/>
              <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={row.effyShare}/>
              <input name="editedBy" placeholder="Edited By" value={row.editedBy} readOnly/>
              <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={row.revSS}/>
              <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={row.revCC}/>
              <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={row.ssFee}/>
              <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={row.ccFee}/>
              <input name="euRev" placeholder="EU VAT" onChange={handleInputChange} value={row.euVAT}/>
              <input name="discounts" placeholder="Discounts" onChange={handleInputChange} value={row.discounts}/>
              <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={row.carnivalShare}/>
              <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={row.execFolio}/>
              <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={row.mealCharge}/>
              <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={row.officeSup}/>
              <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={row.cashPaid}/>
              <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={row.cashAdv}/>
              <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={row.paroleFee}/>
              <label className="statusPaidLabel">Status</label>
              <select
                name="statusPaid"
                onChange={handleInputChange}
                value={row.statusPaid}
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className="btns">
              <input
                className="fileUpload"
                type="file"
                onChange={handleFileChange}
                accept=".pdf"
              />
              <button className="submitBtn">Submit</button>
            </div>
          </form>
    )
}
export default AddModal;

// Node.js version
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
//           // PDF text
//           const pdfdata = data.text.trim();
//           // ... rest of your parsing logic ...

//           // Example: Set Ship Name in state
//           const lines = pdfdata.split("\n");
//           const shipNameLine = lines[0].trim();
//           const shipName = shipNameLine.split(" ").pop();
//           setPdfContent(`Ship Name: ${shipName}`);

//           // Retrieve the last string from the second line as VoyageNum
//           const voyageLine = lines[1].trim();
//           const voyageNum = voyageLine.split(" ").pop();
//           setPdfContent(`Voyage #: ${voyageNum}`);

//           // Date trimming (Accept 2 type of voyage numbers and convert to date)
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

//           // Initialize the variables to store the data
//           let effyShare,
//             revSS,
//             revCC,
//             discounts = null,
//             carnivalShare,
//             execFolio,
//             euVAT = null,
//             ssFee,
//             ccFee,
//             mealCharge = null,
//             paroleFee = null,
//             cashAdv = null,
//             officeSup = null,
//             cashPaid = null;

//           // Get the last string of numbers from the line "NET AMOUNT DUE" as effyShare
//           const netAmountLine = lines.find((line) =>
//             line.includes("NET AMOUNT DUE")
//           );
//           const netAmountMatches = netAmountLine.match(/\d+\.\d+/g);
//           effyShare = netAmountMatches[netAmountMatches.length - 1];
//           setPdfContent(`Effy Share: ${effyShare}`);

//           // Go through all the lines between "REVENUE SETTLEMENT" and "NET AMOUNT"
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
//             const amount = amountMatch
//               ? amountMatch[1].replace(/,/g, "")
//               : null;

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
//             // Add more conditions here as necessary for other fields.
//             // setPdfContent() to return
//             setPdfContent(`Ship Name: ${shipName}`);
//             setPdfContent(`Voyage#: ${voyageNum}`);
//             setPdfContent(`Date: ${date}`);
//             setPdfContent(`Effy Share: ${effyShare}`);
//             setPdfContent(`revSS: ${revSS}`);
//             setPdfContent(`revCC: ${revCC}`);
//             setPdfContent(`euRev: ${euVAT}`);
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
//           // Log other variables as they are captured
//           // catch error
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
