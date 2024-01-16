import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from '@mui/material/IconButton';
import AddModal from "../Component/AddModal";
import EditModal from "../Component/EditModal";
import Modal from "@mui/material/Modal";
import MUIDataTable from "mui-datatables";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import "./Table.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.open = false;
    this.state = { 
      open: false,
      modalType: 'addModal', 
      edit: false };
    this.array = [];
    this.currentData = [];
    this.editing = false;
  }
  
  loadContentFromServer() {
    // Back-end server
    const url = "http://localhost:8081/get";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ results: json });
      });
  }

  componentDidMount() {
    this.loadContentFromServer();
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.loadContentFromServer();
  };

  // Render the data in array format
  render() {
    const { open, modalType, currentData } = this.state;
    //const array = this.array;
    var data = [];
    //var editing = false;

    if (!!this.state.results) {
      this.array = this.state.results.map((res) => [
        res.ship_name,
        res.voyage_num,
        res.date,
        res.effy_share,
        res.status_paid,
        res.editor,
        res.rev_ss,
        res.rev_cc,
        res.eu_vat,
        res.carnival_share,
        res.office_supp,
        res.discounts,
        res.exec_folio,
        res.ss_fee,
        res.cc_fee,
        res.meal_charge,
        res.parole_fee,
        res.cash_adv,
        res.cash_paid,
        ""
      ]);
    }

    if (!!this.state.array) {
      data = this.state.array;
    } else {
      data = this.array;
    }

    // Calling RESTful endpoint from the backend
    // Submit button from addModal
    const handleAddModal = (data) => {
      data.id = data.length + 1;
      const addUser = [data.ship_name, data.voyage_num, data.date, data.effy_share, data.status_paid, data.editor, 
                       data.rev_ss, data.rev_cc, data.eu_vat, data.carnival_share, data.office_supp, data.discounts, 
                       data.exec_folio, data.ss_fee, data.cc_fee, data.meal_charge, data.parole_fee, data.cash_adv, data.cash_paid, ""];
      this.setState({ array: data.concat([addUser]) });
      this.handleClose();
    };
    
    // addButton was called in addModal.jsx
    const addButton = () => {
      this.setState({ edit: false });
      this.handleOpen();
      this.setState({
        modalType: 'addModal',
        currentData: {},
        open: true
      });
    };

    // Delete Data 
    const deleteRow = (voyage_num) => {
       this.setState({ edit: false });
       this.setState({ array: data.filter((data) => data.voyage_num !== voyage_num) });
     };

    // Update Table data
    const updateRow = (voyage_num, updateData) => {
      this.setState({ edit: false });
      const editUser = [
        updateData.ship_name,
        updateData.voyage_num,
        updateData.date,
        updateData.effy_share,
        updateData.status_paid,
        updateData.editor,
        updateData.rev_ss,
        updateData.rev_cc,
        updateData.eu_vat,
        updateData.carnival_share,
        updateData.office_supp,
        updateData.discounts,
        updateData.exec_folio,
        updateData.ss_fee,
        updateData.cc_fee,
        updateData.meal_charge,
        updateData.parole_fee,
        updateData.cash_adv,
        updateData.cash_paid,
        ""
      ];
      this.setState({
        array: data.map((data) => (data[0] === voyage_num ? editUser : data))
      });
      this.handleClose();
    };

    // Edit button
    const editButton = (rowData) => {
      this.setState({ 
        edit: true, 
        modalType: 'editModal',
        currentData: {
          ship_name: rowData[0],
          voyage_num: rowData[1],
          date: rowData[2],
          effy_share: rowData[3],
          status_paid: rowData[4],
          editor: rowData[5],
          rev_ss: rowData[6],
          rev_cc: rowData[7],
          eu_vat: rowData[8],
          carnival_share: rowData[9],
          office_supp: rowData[10],
          discounts: rowData[11],
          exec_folio: rowData[12],
          ss_fee: rowData[13],
          cc_fee: rowData[14],
          meal_charge: rowData[15],
          parole_fee: rowData[16],
          cash_adv: rowData[17],
          cash_paid: rowData[18],
          action: ""
        },
        open: true
      }, () => {;
      this.handleOpen();
    });
    };

    //editing = this.state.edit;
    //currentData = this.state.arrayEdit;
    //console.log(currentData);

    // Table Column names
    const columns = [
      { name: "Ship Name", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Voyage#", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Date", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Effy Share", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Status", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Editor", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Revenue SS", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Revenue CC", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "EU VAT", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Carnival Share", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Office Supplies", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Discounts", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Exec. Folio", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "SS Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "CC Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Meal Charge", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Parole Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Cash Advance", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      { name: "Cash Paid Onboard", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"justify"}}) } },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
            <p className="edit_delete_btn">
              <IconButton
                value={value}
                onClick={() => {
                  editButton(tableMeta.rowData);
                }}
                onChange={e => {updateValue(e.target.value)}}
                className="editBtn"> <EditNoteIcon/>
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteRow(tableMeta.rowData);
                }}
                className="deleteBtn"> <DeleteForeverIcon style={{color:'red'}}/>
              </IconButton>
            </p>  
            );
          }
        }
      }
    ];
    // Table options
    const options = {
      searchPlaceholder: "Type Anything to Search",
      sort: true,
      filter: true,
      filterType: "multiselect",
      elevation: 20,
      responsive: 'vertical',
      rowsPerPage: 50,
      rowsPerPageOptions: [5, 50, 100, 500],
      print: false,
      fixedSelectColumn: false,
      tableBodyHeight: '65vh',
      downloadOptions: {
        filename: "HFC-Voyages.csv",
        separator: ","
      }
    };

    return (
      <div className="table">
        <Button className="addBtn" variant="outlined" startIcon={<PlaylistAddIcon />}
          onClick={() => { addButton(); }}>Add</Button>

        <MUIDataTable className="dataTable" data={data} columns={columns} options={options} />
        <Modal open={open} onClose={this.handleClose}>
          <div className="modal">
            {modalType === 'editModal' ? (
              <Fragment>
              <div className="modalBackground">
              <h3 className="modalHeaderTxt">Edit Carnival Data</h3>
              <EditModal
                currentData={currentData}
                updateRow={updateRow}
                closeModal={this.handleClose}
              />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="modalBackground">
              <h3 className="modalHeaderTxt">Carnival Data Entry</h3>
              <AddModal 
                addModal={handleAddModal}
                loadContentFromServer={this.loadContentFromServer}
              />
              </div>
            </Fragment>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
export default Table;