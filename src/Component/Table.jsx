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
    this.state = { open: false, edit: false };
    this.array = [];
    this.currentUser = [];
    this.editing = false;
  }
  
  loadContentFromServer() {
    // Back-end server
    const url = "http://localhost:8081/";

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
  };

  render() {
    //const array = this.array;
    var data = [];
    var open = false;
    var editing = false;
    var currentUser = [];

    open = this.state.open;

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
    
    // addButton call addModal.jsx
    const addButton = () => {
      this.setState({ edit: false });
      this.handleOpen();
    };

    // Delete Data 
    const deleteRow = (id) => {
       this.setState({ edit: false });
       this.setState({ array: data.filter((data) => data.id !== id) });
     };

    // Update Table data
    const updateRow = (id, updateData) => {
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
        "",
        ""
      ];
      this.setState({
        array: data.map((data) => (data[0] === id ? editUser : data))
      });
      this.handleClose();
    };

    // Edit button
    const editButton = (data) => {
      this.setState({ edit: true });
      this.setState({
        arrayEdit: {
          ship_name: data[0],
          voyage_num: data[1],
          date: data[2],
          effy_share: data[3],
          status_paid: data[4],
          editor: data[5],
          rev_ss: data[6],
          rev_cc: data[7],
          eu_vat: data[8],
          carnival_share: data[9],
          office_supp: data[10],
          discounts: data[11],
          exec_folio: data[12],
          ss_fee: data[13],
          cc_fee: data[14],
          meal_charge: data[15],
          parole_fee: data[16],
          cash_adv: data[17],
          cash_paid: data[18],
          action: ""
        }
      });
      this.handleOpen();
    };

    editing = this.state.edit;
    currentUser = this.state.arrayEdit;

    // Table Column names
    const columns = [
      { name: "Ship Name", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Voyage#", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Date", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Effy Share", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Status", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Editor", options: { filter: true, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Revenue SS", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Revenue CC", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "EU VAT", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Carnival Share", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Office Supplies", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Discounts", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Exec. Folio", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "SS Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "CC Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Meal Charge", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Parole Fee", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Cash Advance", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      { name: "Cash Paid Onboard", options: { filter: false, setCellProps: () => ({style: {whiteSpace:'nowrap', align:"center"}}) } },
      {
        name: "Action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
            <p className="edit_delete_btn">
              <IconButton
                onClick={() => {
                  editButton(tableMeta.rowData);
                }}
                className="editBtn"> <EditNoteIcon/>
              </IconButton>
              <IconButton
                onClick={() => {
                  deleteRow(tableMeta.voyage_num);
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
      responsive: 'standard',
      rowsPerPage: 50,
      rowsPerPageOptions: [5, 50, 100, 500],
      print: false,
      fixedSelectColumn: true,
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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}>
          <div className="modal">
            {editing ? (
              <Fragment>
              <div className="modalBackground">
              <h3 className="modalHeaderTxt">Edit Carnival Data</h3>
              <EditModal
                editing={editing}
                currentUser={currentUser}
                updateRow={updateRow}
              />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="modalBackground">
              <h3 className="modalHeaderTxt">Carnival Data Entry</h3>
              <AddModal addModal={handleAddModal} />
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