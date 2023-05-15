import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import './Table.css';
import ExportCSV from './ExportCSV';
import Upload from './UploadPDF_Car';
import Search from './Search';
//import Username from './WelcomeName';



function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'set' }, width: "10%"}}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="medium"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">{row.cruiseName}</TableCell>
        <TableCell align="center">{row.voyageNum}</TableCell>
        <TableCell align="center">{row.fat}</TableCell>
        <TableCell align="center">{row.effyShare}</TableCell>
        <TableCell align="center">{row.editedBy}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">Details</Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>

                  <TableCell>
                    <TableRow align="right">Revenue S&S:</TableRow>
                    <TableRow align="right">Revenue CC:</TableRow>
                    <TableRow align="right">Exec. Folio:</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="right">EU Revenue:</TableRow>
                    <TableRow align="right">Carnival Share:</TableRow>
                    <TableRow align="right">Office Supplies:</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="right">Discount:</TableRow>                    
                    <TableRow align="right">S&S Fee:</TableRow>
                    <TableRow align="right">CC Fee:</TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow align="right">Meal Charge:</TableRow>
                    <TableRow align="right">Cash Advance:</TableRow>
                    <TableRow align="right">Cash Paid:</TableRow>
                  </TableCell>
                  
                </TableHead>

                <TableBody>
                  {row.details.map((detailsRow) => (
                    <TableRow key={detailsRow.date}>
                      <TableCell component="th" scope="row" align="center">{detailsRow.date}</TableCell>
                      <TableCell align="center">{detailsRow.customerId}</TableCell>
                      <TableCell align="center">{detailsRow.amount}</TableCell>
                      <TableCell align="center">{Math.round(detailsRow.amount * row.price * 100) / 100}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createData(cruiseName, voyageNum, fat, effyShare, editedBy, price) {
  return {
    cruiseName,
    voyageNum,
    fat,
    effyShare,
    editedBy,
    price,
    details: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
        carnivalShare: '129032',
      },
    ],
  };
}

Row.propTypes = {
  row: PropTypes.shape({
    cruiseName: PropTypes.string.isRequired,
    voyageNum: PropTypes.string.isRequired,
    effyShare: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    editedBy: PropTypes.string.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.number.isRequired,
        date: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('ELATION', 'EL20211011005', '2021-10-11', '$ 23,151.25', 'Edward'),
  createData('PANORAMA', 237, 9.0, 37, 4.3, 4.99),
  createData('MAGIC', 262, 16.0, 24, 6.0, 3.79),
  createData('MIRACLE', 305, 3.7, 67, 4.3, 2.5),
  createData('DREAM', 356, 16.0, 49, 3.9, 1.5),
  createData('GLORY', 356, 16.0, 49, 3.9, 1.5),
  createData('ECSTASY', 305, 3.7, 67, 4.3, 2.5),
  createData('BREEZE', 356, 16.0, 49, 3.9, 1.5),
  createData('SPLENDOR', 356, 16.0, 49, 3.9, 1.5),
  createData('VALOR', 237, 9.0, 37, 4.3, 4.99),
  createData('SPIRIT', 356, 16.0, 49, 3.9, 1.5),
  createData('SPIRIT', 356, 16.0, 49, 3.9, 1.5),
  createData('SPIRIT', 356, 16.0, 49, 3.9, 1.5),
  createData('SPIRIT', 356, 16.0, 49, 3.9, 1.5),
  createData('SPIRIT', 356, 16.0, 49, 3.9, 1.5),
];





function CollapsibleTable() {
  return (
    <div className='tableDiv'>
    <div className="search_Export">
    <Search/>
    <ExportCSV/>
    </div>  
    <TableContainer className="tableContainer" component={Paper}>
      <Table className="table" aria-label="collapsible table">
        <TableHead stickyHeader={true}>
          <TableRow>
            <TableCell />
            <TableCell align="center">CRUISE NAME</TableCell>
            <TableCell align="center">VOYAGE #</TableCell>
            <TableCell align="center">DATE</TableCell>
            <TableCell align="center">EFFY SHARE</TableCell>
            <TableCell align="center">Edited By</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.cruiseName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='upload'>
      <Upload/>
    </div>
    </div>
  );
}
export default CollapsibleTable;