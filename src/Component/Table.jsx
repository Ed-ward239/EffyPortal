import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./Table.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
//import EditDelete from './EditDelete';
//import Username from './WelcomeName';

export const CollapsibleTable = ({ rows, deleteRow, editRow }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedIndex, setSelectedIndex] = React.useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExpand = (index) => {
    if(selectedIndex === index) {
      setSelectedIndex("")
    }else{
      setSelectedIndex(index)
    }
  }

  return (
    <>
      <div className="tableNpagination">
        <TableContainer
          className="tableContainer"
        >
          <Table className="table" aria-label="collapsible table" stickyHeader>
            <TableHead sx={{"& th": {backgroundColor: "#a5a5a5", fontWeight: "bold", fontSize: "15px" }}}>
              <TableRow className="headerRow">
                <TableCell />
                <TableCell align="center">SHIP NAME</TableCell>
                <TableCell align="center">VOYAGE #</TableCell>
                <TableCell align="center">DATE</TableCell>
                <TableCell align="center">EFFY SHARE ($)</TableCell>
                <TableCell align="center">STATUS</TableCell>
                <TableCell align="center">EDITED BY</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx, index) => {
                const statusText =
                  row.statusPaid.charAt(0).toUpperCase() +
                  row.statusPaid.slice(1);
                return (
                  <React.Fragment>
                    <TableRow hover className="tableRows" sx={{"& th": {fontWeight: "medium"}}}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="medium"
                          onClick={() => {handleExpand(!index)}}
                        >
                          {index === selectedIndex ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">{row.shipName}</TableCell>
                      <TableCell align="center">{row.voyageNum}</TableCell>
                      <TableCell align="center">{row.date}</TableCell>
                      <TableCell align="center">{row.effyShare}</TableCell>
                      <TableCell align="center">
                        <span className={`label label-${row.statusPaid}`}>
                          {statusText}
                        </span>
                      </TableCell>
                      <TableCell align="center">{row.editedBy}</TableCell>
                    </TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={7}
                    >
                      <Collapse in={index === selectedIndex} timeout="auto" unmountOnExit>
                        <Box className="collapseBox" sx={{ margin: 1 }}>
                          <h3 variant="h6" gutterBottom component="div">
                            Details ($)
                          </h3>
                          <Table size="small" aria-label="purchases">
                            <TableBody align="center">
                              <TableRow>
                                <TableCell align="right">Revenue S&S: </TableCell>
                                <TableCell align="center">{row.revSS}</TableCell>
                                <TableCell align="right">Revenue CC: </TableCell>
                                <TableCell align="center">{row.revCC}</TableCell>
                                <TableCell align="right">Exec. Folio: </TableCell>
                                <TableCell align="center">{row.execFolio}</TableCell>
                                <TableCell align="right">Parole Fee: </TableCell>
                                <TableCell align="center">{row.paroleFee}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="right">EU Revenue: </TableCell>
                                <TableCell align="center">{row.euRev}</TableCell>
                                <TableCell align="right">Carnival Share: </TableCell>
                                <TableCell align="center">{row.carnivalShare}</TableCell>
                                <TableCell align="right">Office Supplies: </TableCell>
                                <TableCell align="center">{row.officeSup}</TableCell>
                                <TableCell align="right">Cash Paid: </TableCell>
                                <TableCell align="center">{row.cashPaid}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="right">Discount: </TableCell>
                                <TableCell align="center">{row.discount}</TableCell>
                                <TableCell align="right">S&S Fee: </TableCell>
                                <TableCell align="center">{row.ssFee}</TableCell>
                                <TableCell align="right">CC Fee: </TableCell>
                                <TableCell align="center">{row.ccFee}</TableCell>
                                <TableCell align="right">Cash Advance: </TableCell>
                                <TableCell align="center">{row.cashAdv}</TableCell>
                              </TableRow>
                              <tr>
                                <td align="right">Meal Charge: </td>
                                <td align="center">{row.mealCharge}</td>
                                <td align="right">
                                  <IconButton className="editBtn">
                                    <EditIcon onClick={() => editRow(idx)} />
                                  </IconButton>
                                </td>
                                <td align="right">
                                  <IconButton
                                    className="deleteBtn"
                                    color="warning"
                                  >
                                    <DeleteForeverIcon
                                      onClick={() => deleteRow(idx)}
                                    />
                                  </IconButton>
                                </td>
                              </tr>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="pagination"
          rowsPerPageOptions={[5, 25, 50, 100, 200]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

/*
// PDF parsing function


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
