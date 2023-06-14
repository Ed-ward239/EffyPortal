import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TablePagination from '@mui/material/TablePagination';
//import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Table.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
//import EditDelete from './EditDelete';
//import Username from './WelcomeName';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleSelectChange = (event, index) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = event.target.value;
    setSelectedValues(newSelectedValues);
  };

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} sx={{ '& > *': { borderBottom: 'set' }, width: "30%"}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.shipName}</TableCell>
        <TableCell align="center">{row.voyageNum}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.effyShare}</TableCell>
        <TableCell align="center">
          <Select
            value={selectedValues[row.paidStatus] || ''}
            onChange={(event) => handleSelectChange(event, row.paidStatus)}
            variant="outlined"
            label="Status"
          >
            <MenuItem value={0}></MenuItem>
            <MenuItem value={1}><Chip label="Paid" variant="outlined" color="success" size="small" /></MenuItem>
            <MenuItem value={2}><Chip label="Pending" variant="outlined" color="warning" size="small" /></MenuItem>
            <MenuItem value={3}><Chip label="Unpaid" variant="outlined" color="error" size="small" /></MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">{row.editedBy}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="collapseBox" sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">Details ($)</Typography>
              <Table size="small" aria-label="purchases">
              {row.details.map((detailsRow) => (
                <TableBody align="center">
                  <TableRow key={detailsRow.revSS}>
                    <TableCell align="right">Revenue S&S: </TableCell>
                    <TableCell align='center'>{detailsRow.revSS}</TableCell>
                    <TableCell align="right">Revenue CC: </TableCell>
                    <TableCell align='center'>{detailsRow.revCC}</TableCell>
                    <TableCell align="right">Exec. Folio: </TableCell>
                    <TableCell align='center'>{detailsRow.execFolio}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">EU Revenue: </TableCell>
                    <TableCell align='center'>{detailsRow.euRev}</TableCell>
                    <TableCell align="right">Carnival Share: </TableCell>
                    <TableCell align='center'>{detailsRow.carnivalShare}</TableCell>
                    <TableCell align="right">Office Supplies: </TableCell>
                    <TableCell align='center'>{detailsRow.officeSup}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Discount: </TableCell>
                    <TableCell align='center'>{detailsRow.discount}</TableCell>                    
                    <TableCell align="right">S&S Fee: </TableCell>
                    <TableCell align='center'>{detailsRow.ssFee}</TableCell>
                    <TableCell align="right">CC Fee: </TableCell>
                    <TableCell align='center'>{detailsRow.ccFee}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">Meal Charge: </TableCell>
                    <TableCell align='center'>{detailsRow.mealCharge}</TableCell>
                    <TableCell align="right">Cash Advance: </TableCell>
                    <TableCell align='center'>{detailsRow.cashAdv}</TableCell>
                    <TableCell align="right">Cash Paid: </TableCell>
                    <TableCell align='center'>{detailsRow.cashPaid}</TableCell>
                  </TableRow>
                </TableBody>
                ))}
              </Table>
            </Box>
            <IconButton className='deleteBtn' color='warning'><DeleteForeverIcon/></IconButton>
            <IconButton className='editBtn'><EditIcon/></IconButton>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createData(shipName, voyageNum, date, effyShare, paidStatus, editedBy){
  return {
    shipName,
    voyageNum,
    date,
    effyShare,
    paidStatus, 
    editedBy,
    details: [
      {
        revSS: 292115,
        euRev: 11091700,
        discount: 3,
        mealCharge: 129032,

        revCC: 19842,
        carnivalShare: 102923,
        ssFee: 30921,
        cashAdv: 230213,

        execFolio: 19312,
        officeSup: 21323,
        ccFee: 30294,
        cashPaid: 230213,
      },
    ],
  };
}

Row.propTypes = {
  row: PropTypes.shape({
    shipName: PropTypes.string.isRequired,
    voyageNum: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    effyShare: PropTypes.number.isRequired,
    paidStatus: PropTypes.number.isRequired,
    editedBy: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        revSS: PropTypes.number.isRequired,
        euRev: PropTypes.number.isRequired,
        discount: PropTypes.number.isRequired,
        mealCharge: PropTypes.number.isRequired,

        revCC: PropTypes.number.isRequired,
        carnivalShare: PropTypes.number.isRequired,
        ssFee: PropTypes.number.isRequired,
        cashAdv: PropTypes.number.isRequired,

        execFolio: PropTypes.number.isRequired,
        officeSup: PropTypes.number.isRequired,
        ccFee: PropTypes.number.isRequired,
        cashPaid: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('ELATION', 'EL20211011005', '2021-10-11', '23,151.25', 0, 'Lucy'),
  createData('PANORAMA', 'PO20211211007', '2021-12-11', '58,693.83', 1, 'Ei'),
  createData('MAGIC', 'MC20221010005', '2022-10-10', '41,690.52', 2, 'Ei'),
  createData('MIRACLE', 'MI20230406005', '2023-04-06', '27,298.66', 3, 'Lee'),
  createData('DREAM', 'DR20230219006', '2023-02-19', '70,982.15', 1, 'Jessica'),
  createData('GLORY', 'GL20211219007', '2021-12-19', '34,784.67', 0, 'Ei'),
  createData('ECSTASY', 'EC20220421004', '2022-04-21', '11,119.38', 2, 'Lucy'),
  createData('BREEZE', 'BR20230318005', '2023-03-18', '26,729.19', 3, 'Jessica'),
  createData('SPLENDOR', 'SL04100522', '2022-10-04', '19,546.61', 1, 'Skylar'),
  createData('VALOR', 'VA20211120005', '2021-11-12', '18,399.08', 0, 'Lucy'),
];

export const CollapsibleTable = ({ row_s, deleteRow, editRow }) => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className='tableNpagination'>
    <TableContainer className="tableContainer" component={Paper} sx={{ maxHeight: 600}}>
      <Table className="table" aria-label="collapsible table" stickyHeader>
        <TableHead className='tableHeader' stickyHeader>
          <TableRow>
            <TableCell/>
            <TableCell align="center">SHIP NAME</TableCell>
            <TableCell align="center">VOYAGE #</TableCell>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="center">EFFY SHARE ($)</TableCell>
            <TableCell align="center">STATUS</TableCell>
            <TableCell align="center">Edited By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row.shipName} row={row}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
          className='pagination'
          rowsPerPageOptions={[10, 25, 50, 100, 150]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  );
}
export default CollapsibleTable;






/*{
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleSelectChange = (event, index) => {
    const newSelectedValues = [...selectedValues];
    newSelectedValues[index] = event.target.value;
    setSelectedValues(newSelectedValues);
  };

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} sx={{ '& > *': { borderBottom: 'set' }, width: "30%"}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.shipName}</TableCell>
        <TableCell align="center">{row.voyageNum}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.effyShare}</TableCell>
        <TableCell align="center">
          <Select
            value={selectedValues[row.id] || ''}
            onChange={(event) => handleSelectChange(event, row.id)}
            variant="outlined"
          >
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
            <MenuItem value="option3">Option 3</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="center">{row.editedBy}</TableCell>
      </TableRow>
      {/* Rest of the code...







      async function parsePDF(file) {
        try {
          const pdfBytes = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(pdfBytes);
      
          const form = pdfDoc.getForm();
          const fields = form.getFields();
      
          return fields.map((field) => field.getFullName());
        } catch (error) {
          console.error('Error parsing PDF:', error);
          return [];
        }
      }
      

      function PDFFieldParser() {
        const [fields, setFields] = useState([]);
      
        const handleFileChange = async (event) => {
          const file = event.target.files[0];
          const extractedFields = await parsePDF(file);
          setFields(extractedFields);
        };
      
        return (
          <div>
            <input type="file" onChange={handleFileChange} accept=".pdf" />
            {fields.length > 0 && (
              <ul>
                {fields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            )}
          </div>
        );
      } */

      