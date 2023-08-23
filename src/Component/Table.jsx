import React, { Fragment } from "react";
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
    const url = "https://jsonplaceholder.typicode.com/users";

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ results: json });
      });
  }

  componentDidMount() {
    this.loadContentFromServer();
  }

  render() {
    const array = this.array;
    var data = [];
    var open = false;
    var editing = false;
    var currentUser = [];

    const handleOpen = () => {
      this.setState({ open: true });
    };

    const handleClose = () => {
      this.setState({ open: false });
    };

    open = this.state.open;

    if (!!this.state.results) {
      this.array = this.state.results.map((result) => [
        result.id,
        result.username,
        result.address.zipcode,
        result.name,
        result.address.zipcode,
        result.address.suite,
        result.name,
        result.address.geo.lat,
        result.address.geo.lng,
        result.phone,
        result.id,
        result.website,
        result.company.name,
        result.address.street,
        result.address.city,
        result.address.zipcode,
        result.address.suite,
        result.name,
        result.address.geo.lat,
        "",
        ""
      ]);
    }

    if (!!this.state.array) {
      data = this.state.array;
    } else {
      data = this.array;
    }

    // CRUD operations
    const addUser = (user) => {
      user.id = data.length + 1;
      const addUser = [user.id, user.name, user.username, user.email, ""];
      this.setState({ array: data.concat([addUser]) });
      handleClose();
    };

    const addButton = () => {
      this.setState({ edit: false });
      handleOpen();
    };

    const deleteUser = (id) => {
      this.setState({ edit: false });
      this.setState({ array: data.filter((user) => user.id !== id) });
    };

    const updateUser = (id, updatedUser) => {
      this.setState({ edit: false });
      const editUser = [
        updatedUser.id,
        updatedUser.name,
        updatedUser.username,
        updatedUser.email,
        updatedUser.name,
        updatedUser.address.zipcode,
        updatedUser.address.suite,
        updatedUser.name,
        updatedUser.address.geo.lat,
        updatedUser.address.geo.lng,
        updatedUser.phone,
        updatedUser.id,
        updatedUser.website,
        updatedUser.company.name,
        updatedUser.address.street,
        updatedUser.address.city,
        updatedUser.address.zipcode,
        updatedUser.address.suite,
        updatedUser.name,
        updatedUser.address.geo.lat,
        "",
        ""
      ];
      this.setState({
        array: data.map((user) => (user[0] === id ? editUser : user))
      });
      handleClose();
    };

    const editButton = (user) => {
      this.setState({ edit: true });
      this.setState({
        arrayEdit: {
          id: user[0],
          name: user[1],
          username: user[2],
          email: user[3],
          name1: user[4],
          zipcode: user[5],
          suite: user[6],
          name: user[7],
          action: ""
        }
      });
      handleOpen();
    };

    editing = this.state.edit;
    currentUser = this.state.arrayEdit;

    const columns = [
      { name: "ID" },
      { name: "Ship Name" },
      { name: "Voyage #" },
      { name: "Date" },
      { name: "Effy Share" },
      { name: "Status" },
      { name: "Editor" },
      { name: "Revenue SS" },
      { name: "Revenue CC" },
      { name: "EU Revenue" },
      { name: "Carnival Share" },
      { name: "Office Supplies" },
      { name: "Discount" },
      { name: "Exec. Folio" },
      { name: "SS Fee" },
      { name: "CC Fee" },
      { name: "Meal Charge" },
      { name: "Parole Fee" },
      { name: "Cash Advance" },
      { name: "Cash Paid Onboard" },
      {
        name: "Action",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <button
                onClick={() => {
                  editButton(tableMeta.rowData);
                }}
                className="editBtn"
              >
                Edit
              </button>
            );
          }
        }
      }
    ];

    const options = {
      filter: true,
      onFilterChange: (changedColumn, filterList) => {
        console.log(changedColumn, filterList);
      },
      filterType: "dropdown",
      responsive: "scrollMaxHeight",
      rowsPerPage: 10,
      rowsPerPageOptions: [5, 10, 100, 500, 1000],
      print: false,
      tableBodyHeight: '750px',
      downloadOptions: {
        filename: "HFC-Voyages.csv",
        separator: ","
      }
    };

    return (
      <div className="table">
        <button
          type="button"
          className="addBtn"
          onClick={() => {
            addButton();
          }}>Add</button>

        <MUIDataTable className="dataTable" data={data} columns={columns} options={options} />

        <Modal
          open={open}
          onClose={handleClose}
        >
          <div className="modal">
            {editing ? (
              <Fragment>
                <h2 id="simple-modal-title">Edit Data</h2>
                <div id="simple-modal-description">
                  <EditModal
                    editing={editing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                  />
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <h2 id="simple-modal-title">Add Data</h2>
                <div id="simple-modal-description">
                  <AddModal addUser={addUser} />
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
