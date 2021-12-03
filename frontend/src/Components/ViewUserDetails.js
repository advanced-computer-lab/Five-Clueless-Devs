import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { BACKEND_URL } from '../API/URLS';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableRow } from '@mui/material';


const ViewUserDetails = () => {

  const [sent, setSent] = useState(false)
  const [text, setText] = useState("")

  const handleSend = async (e) => {
    setSent(true)
    try {

      console.log(user.email);
      //  BACKEND_URL + "users/search?userId=" + id)
      await axios.post(BACKEND_URL + "users/send_mail?userId=" + id, {
        text, to: user.email
      })
    } catch (error) {

      console.error(error)
    }
  }



  const history = useHistory();
  const [user, setUser] = useState({
    userId: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    homeAddress: '',
    countryCode: '',
    telephone: '',
    email: '',
    passportNumber: '',
    isAdmin: '',
    reservations: ''
  });
  let { id } = useParams();

  useEffect(() => {
    console.log("Print id: " + { id });
    axios
      .get(BACKEND_URL + "users/search?userId=" + id)
      .then(res => {
        //console.log(res.data);
        //console.log(res.data[0].email);
        //currEmail=res.data.email;
        setUser(res.data[0] || {});
      })
      .catch(err => {
        console.log(err);
      })
  }
    , []);



  const onDeleteConfirm = () => {
    axios
      .delete(BACKEND_URL + "users/deleteUser?userId=" + id)
      .then(res => {
        history.push("/search");
      })
      .catch(err => {
        console.log("Error form ViewUserDetails_deleteClick");
        console.log(err);
      })
  };
  const [showConfirm, setConfirm] = useState(false);
  const setConfirmButton = () => {
    setConfirm(true)
    // setDelete(false)
  };

  const [showDelete, setDelete] = useState(true);
  const setDeleteButton = () => {
    showDelete(false)
  };

  const toggleDialog = () => {
    setConfirm(!showConfirm);
  }


  return (
    <div className="ViewFlight">
      <div className="container">
        <div className="row">
          <br />
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">User's Record</h1>
            <p className="lead text-center">
              View User's Info
            </p>
            <hr /> <br />
          </div>
        </div>
        <div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Table sx={{ maxWidth: 500 }} className="table table-hover table-dark">
              {/* <thead>
          <TableRow>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </TableRow>
        </thead> */}
              <TableBody>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>User ID</TableCell>
                  <TableCell>{user?.userId}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">2</th> */}
                  <TableCell>Username</TableCell>
                  <TableCell>{user?.username}</TableCell>
                </TableRow>
                {/* <TableRow>
                  
                  <TableCell>password</TableCell>
                  <TableCell>{user?.password}</TableCell>
                </TableRow> */}
                <TableRow>
                  {/* <th scope="row">4</th> */}
                  <TableCell>Email</TableCell>
                  <TableCell>{user?.email}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>First Name</TableCell>
                  <TableCell>{user?.firstName}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>Last Name</TableCell>
                  <TableCell>{user?.lastName}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>Home Address</TableCell>
                  <TableCell>{user?.homeAddress}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>Telephone Number</TableCell>
                  <TableCell>{user?.telephone}</TableCell>
                </TableRow>
                <TableRow>
                  {/* <th scope="row">1</th> */}
                  <TableCell>Passport Number</TableCell>
                  <TableCell>{user?.passportNumber}</TableCell>
                </TableRow>

                {/* <th scope="row">4</th> */}



              </TableBody>
            </Table>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
          </div>

          <div className="col-md-6" style={{ margin: "10px" }}>
            {/* <Link to={`/update-flight/${id}`} className="btn btn-outline-info btn-lg btn-block">
              Edit Flights
            </Link>
            <br /> */}

            <Button
              onClick={() => history.push(`/edit-user/${id}`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > Edit Information </Button>
            <Button
              onClick={() => history.push(`/Reserved-flights`)}
              variant="outlined"
              style={{ marginRight: "10px" }}
            > View Reservations </Button>

            {/*showDelete ? <Button onClick={setConfirmButton} variant="outlined" color="error">Delete </Button> : null*/}
            {/* {showConfirm ? <Button onClick={onDeleteConfirm} variant="outlined" color="error">Confirm</Button> : null} */}

          </div>
        </div>
      </div>


      <div>

        <Dialog
          open={showConfirm}
          onClose={toggleDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete this user?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={toggleDialog} variant="text">Cancel </Button>
            <Button onClick={onDeleteConfirm} variant="text" color="error">Delete</Button>
          </DialogActions>
        </Dialog>

      </div>

      {/* <div className="App">

			{!sent ? (
				<form onClick={handleSend}>
					<button type="button">Send Email</button>
				</form>
			) : (
				<h1>Email Sent</h1>
			)}
		</div> */}

    </div>
  )
}

export default ViewUserDetails;