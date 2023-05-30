import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import './Table.css';
import EditDelete from './EditDelete';
import { colors } from '@mui/material';
//import Username from './WelcomeName';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';


function BasicSelect(){
  const [status, setStatus] = React.useState("");
  const handleChangeChip = (event) => {
    setStatus(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 20 }}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="status"
          onChange={handleChangeChip}
        >
          <MenuItem value={10}><Chip label="Paid"variant="outlined" color="success" size="small"/></MenuItem>
          <MenuItem value={20}><Chip label="Pending"variant="outlined" color="warning" size="small"/></MenuItem>
          <MenuItem value={30}><Chip label="Unpaid"variant="outlined" color="error" size="small"/></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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
        <TableCell align="center">{row.paidStatus}</TableCell>
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
            <EditDelete/>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function createData(shipName, voyageNum, date, effyShare, editedBy, paidStatus){
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
  createData('ELATION', 'EL20211011005', '2021-10-11', '23,151.25', 'Lucy'),
  createData('PANORAMA', 'PO20211211007', '2021-12-11', '58,693.83', 'Ei'),
  createData('MAGIC', 'MC20221010005', '2022-10-10', '41,690.52', 'Ei'),
  createData('MIRACLE', 'MI20230406005', '2023-04-06', '27,298.66', 'Lee'),
  createData('DREAM', 'DR20230219006', '2023-02-19', '70,982.15', 'Jessica'),
  createData('GLORY', 'GL20211219007', '2021-12-19', '34,784.67', 'Ei'),
  createData('ECSTASY', 'EC20220421004', '2022-04-21', '11,119.38', 'Lucy'),
  createData('BREEZE', 'BR20230318005', '2023-03-18', '26,729.19', 'Jessica'),
  createData('SPLENDOR', 'SL04100522', '2022-10-04', '19,546.61', 'Skylar'),
  createData('VALOR', 'VA20211120005', '2021-11-12', '18,399.08', 'Lucy'),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }
  return (
    <TableHead>

    </TableHead>
  )
}




function CollapsibleTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("shipName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
    // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <div className='tableNpagination'>
    <TableContainer className="tableContainer" component={Paper} sx={{ maxHeight: 600}}>
      <Table className="table" aria-label="collapsible table" stickyHeader>
        <TableHead className='tableHeader'>
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
            <Row key={row.shipName} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination 
          className='pagination'
          rowsPerPageOptions={[7, 15, 25, 50, 100, 150]}
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