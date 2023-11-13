const text = `CARNIVAL CRUISE LINESSHIP: CARNIVAL BREEZE
FLEET FINANCEVOYAGE: BR20230116005
EFFY VOYAGE SETTLEMENTCURRENCY: USD
REVENUE BY TENDER TYPE:
% OF TOTALTENDER TYPEREVENUEFOLIO 9999VATSSTIPSXTIPSTOTAL
37.25%CREDIT CARD15,015.000.000.000.000.0015,015.00
62.75%SAIL AND SIGN25,296.000.000.000.000.0025,296.00
40,311.000.000.000.000.0040,311.00
BREAKDOWN OF REVENUE:
NET SALESDISCOUNTSETT. NETCCL NET %CCL% RENT
COMMISIONABLE
REVENUE
GUEST40,311.000.0040,311.0038.00%15318.18
CCL CREW0.000.000.0038.00%0
CCL SENIOR OFFICER0.000.000.0038.00%0
EFFY CREW0.000.000.0038.00%0
Sub-Total:40,311.000.0040,311.0015,318.18
TOTAL40,311.000.0040,311.0015,318.18
REVENUE SETTLEMENT:
TRANSACTION DETAILSCOMMENTSVOUCHER DETAILSAMOUNT
 PLUS  SAIL AND SIGN REVENUE25,296.00
 PLUS  DIRECT CC REVENUE15,015.00
 LESS  CCL SHARE OF REVENUE(15,318.18)
 LESS  EXECUTIVE FOLIO CHARGESBar 30% of sale:571.5 tips:102.89(274.34)
 LESS  SAIL AND SIGN CC PROCESSING FEES&S CC   61.09%, CC Fee: 2.2%(339.97)
 LESS  DIRECT CREDIT CARD PROCESSING FEECC Processing Fee    2.20%(330.33)
 LESS  MEAL CHARGE$20.00 (Rate) x 25 (Qty)(500.00)
 LESS  CASH VISAMEX VISA SOFF 0118 COZUMEL 514478$41.00 (Rate) x 1 (Qty)(41.00)
NET AMOUNT DUE TO / (FROM) EFFY23,507.18
PAYMENT REQUEST:
REQUEST PAYMENT FROM A/P TO EFFY IN THE AMOUNT OF:USD 23,507.18
(VENDOR #328417)STAMP HERE
MAKE PAYMENT PAYABLE TO:
EFFY
HFC Group Corp
7 W 45th St, 10th Floor
New York, NY  10036
INVOICE NUMBERCOLOCATIONCENTERACCOUNTANALYSIS
BR0501162310023100002030077727
Approved By:Menino Fernandes
FINANCE DIRECTOR
Invoice Date:01/21/2023`;

// Splitting text into lines
const lines = text.split('\n');

// Retrieve the last word from the first line as ShipName
const shipNameLine = lines[0].trim();
const shipName = shipNameLine.split(' ').pop();

// Retrieve the last string from the second line as VoyageNum
const voyageLine = lines[1].trim();
const voyageNum = voyageLine.split(' ').pop();
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
const date = trimDate(voyageNum);
// Initialize the variables to store the data
let effyShare, revSS, revCC, discounts, carnivalShare, execFolio, euVAT, ssFee, ccFee, mealCharge, paroleFee, cashAdv, officeSup, cashPaid = null;

// Get the last string of numbers from the line "NET AMOUNT DUE" as effyShare
const netAmountLine = lines.find(line => line.includes('NET AMOUNT DUE'));
const netAmountMatches = netAmountLine.match(/\d+\.\d+/g);
effyShare = netAmountMatches[netAmountMatches.length - 1];

// Go through all the lines between "REVENUE SETTLEMENT" and "NET AMOUNT"
const revenueSettlementIndex = lines.findIndex(line => line.includes('REVENUE SETTLEMENT'));
const netAmountIndex = lines.findIndex(line => line.includes('NET AMOUNT DUE'));
const transactionLines = lines.slice(revenueSettlementIndex + 1, netAmountIndex);

transactionLines.forEach(line => {
  const amountMatch = line.match(/\(([\d.,]+)\)/);
  const amount = amountMatch ? amountMatch[1].replace(/,/g, '') : null;

  if (line.startsWith(' PLUS  SAIL AND SIGN')) revSS = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, '');
  if (line.startsWith(' PLUS  DIRECT CC REVENUE')) revCC = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, '');
  if (line.startsWith(' PLUS CCL CREW SALES DISCOUNT')) discounts = line.match(/[\d,]+\.?\d*/)[0].replace(/,/g, '');
  if (line.startsWith(' LESS  CCL SHARE OF REVENUE')) carnivalShare = amount;
  if (line.startsWith(' LESS  EXECUTIVE FOLIO')) execFolio = amount;
  if (line.startsWith(' LESS  SAIL AND SIGN CC PROCESSING FEES')) ssFee = amount;
  if (line.startsWith(' LESS  DIRECT CREDIT CARD PROCESSING FEE')) ccFee = amount;
  if (line.startsWith(' LESS  MEAL CHARGE')) mealCharge = amount;
  if (line.startsWith(' LESS  CASH VISA')) cashAdv = amount;
  if (line.startsWith(' LESS PAROLE')) paroleFee = amount;
  if (line.startsWith(' LESS EUROPE')) euVAT = amount;
  if (line.startsWith(' LESS CASH PAID ON BOARD')) cashPaid = amount;
  if (line.startsWith(' LESS OFFICE SUPPLIES')) officeSup = amount;
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
