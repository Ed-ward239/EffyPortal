import React from "react";
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
   // const array = this.array;
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

   /* const deleteUser = (id) => {
      this.setState({ edit: false });
      this.setState({ array: data.filter((user) => user.id !== id) });
    };*/

    const updateUser = (id, updatedUser) => {
      this.setState({ edit: false });
      const editUser = [
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
      handleOpen();
    };

    editing = this.state.edit;
    currentUser = this.state.arrayEdit;

    const columns = [
      { name: "Ship Name",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Voyage #",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Date",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Effy Share",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Status",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Editor",
        options: {
          filter: true,
          //display: 'excluded',
          sortThirdClickReset: true,
          sortDescFirst: true,
      } },
      { name: "Revenue SS",
      options: {
        filter: true,
        //display: 'excluded',
        sortThirdClickReset: true,
        sortDescFirst: true,
    }  },
      { name: "Revenue CC" ,
      options: {
        filter: true,
        //display: 'excluded',
        sortThirdClickReset: true,
        sortDescFirst: true,
    } },
    //   { name: "EU Revenue" ,
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // } },
    //   { name: "Carnival Share",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Office Supplies",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Discount",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Exec. Folio",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "SS Fee",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "CC Fee",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Meal Charge",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Parole Fee",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Cash Advance",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
    //   { name: "Cash Paid Onboard",
    //   options: {
    //     filter: true,
    //     //display: 'excluded',
    //     sortThirdClickReset: true,
    //     sortDescFirst: true,
    // }  },
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
                className="editBtn"> <EditNoteIcon/>       
              </IconButton>
            );
          }
        }
      }
    ];

    const options = {
      sort: true,
      options: {
        sortDirection: 'desc'
      },
      filter: true,
      onFilterChange: (changedColumn, filterList) => {
        console.log(changedColumn, filterList);
      },
      filterType: "dropdown",
      serverSide: true,
      elevation: 10,
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
        <Button className="addBtn" variant="outlined" startIcon={<PlaylistAddIcon/>}
          onClick={() => {addButton();}}>Add</Button>

        <MUIDataTable 
          className="dataTable" 
          data={data} 
          columns={columns} 
          options={options} 
        />
        <Modal 
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open} 
          onClose={handleClose}>
          <div className="modal">
            {editing ? (
                  <EditModal
                    editing={editing}
                    currentUser={currentUser}
                    updateUser={updateUser}
                  />
            ) : (
                  <AddModal addUser={addUser} />
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
export default Table;
