import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EditNoteIcon from '@mui/icons-material/EditNote';
import IconButton from '@mui/material/IconButton';
import AddModal from "../Component/AddModal";
import EditModal from "../Component/EditModal";
import Modal from "@mui/material/Modal";
import MUIDataTable from "mui-datatables";
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

    // CRUD operations
    const handleAddModal = (user) => {
      user.id = data.length + 1;
      const addUser = [user.id, user.name, user.username, user.email, ""];
      this.setState({ array: data.concat([addUser]) });
      this.handleClose();
    };

    const addButton = () => {
      this.setState({ edit: false });
      this.handleOpen();
    };

    /* const deleteUser = (id) => {
       this.setState({ edit: false });
       this.setState({ array: data.filter((user) => user.id !== id) });
     };*/

    // Update Table data
    const updateUser = (id, updateData) => {
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
        array: data.map((user) => (user[0] === id ? editUser : user))
      });
      this.handleClose();
    };

    // Edit button
    const editButton = (user) => {
      this.setState({ edit: true });
      this.setState({
        arrayEdit: {
          name: user[1],
          username: user[2],
          email: user[3],
          name1: user[4],
          zipcode: user[5],
          suite: user[6],
          name2: user[7],
          id: user[8],
          action: ""
        }
      });
      this.handleOpen();
    };

    editing = this.state.edit;
    currentUser = this.state.arrayEdit;

    // Table Column names
    const columns = [
      { name: "Ship Name", options: { filter: true } },
      { name: "Voyage#", options: { filter: true } },
      { name: "Date", options: { filter: true } },
      { name: "Effy Share", options: { filter: true } },
      { name: "Status", options: { filter: true } },
      { name: "Editor", options: { filter: true } },
      { name: "Revenue SS", options: { filter: true } },
      { name: "Revenue CC", options: { filter: true } },
      { name: "EU VAT", options: { filter: true } },
      { name: "Carnival Share", options: { filter: true } },
      { name: "Office Supplies", options: { filter: true } },
      { name: "Discounts", options: { filter: true } },
      { name: "Exec. Folio", options: { filter: true } },
      { name: "SS Fee", options: { filter: true } },
      { name: "CC Fee", options: { filter: true } },
      { name: "Meal Charge", options: { filter: true } },
      { name: "Parole Fee", options: { filter: true } },
      { name: "Cash Advance", options: { filter: true } },
      { name: "Cash Paid Onboard", options: { filter: true } },
      {
        name: "Action",
        options: {
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <IconButton
                onClick={() => {
                  editButton(tableMeta.rowData);
                }}
                className="editBtn"> <EditNoteIcon />
              </IconButton>
            );
          }
        }
      }
    ];
    // Table options
    const options = {
      sort: true,
      filter: true,
      filterType: "dropdown",
      elevation: 20,
      rowsPerPage: 10,
      rowsPerPageOptions: [5, 10, 100, 500, 1000],
      print: false,
      fixedSelectColumn: true,
      tableBodyHeight: '620px',
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
                updateUser={updateUser}
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