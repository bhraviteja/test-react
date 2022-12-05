import React, { useEffect, useState } from "react";
import { Card, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fatchList();
  }, []);

  const fatchList = async () => {
  await axios
      .get("http://localhost:8000/api/assignment")
      .then((response) => setUserData(response.data.data));
  };  

  const deleteRecord = async (id) => {
    const isConfirm = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        return result.isConfirmed
      });

      if(!isConfirm){
        return;
      }

      await axios.delete(`http://localhost:8000/api/assignment/${id}`).then(({data})=>{
        Swal.fire({
            icon:"success",
            text:data.message
        })
        fatchList()
      }).catch(({response:{data}})=>{
        Swal.fire({
            text:data.message,
            icon:"error"
        })
      })
}

  return (
    <div className="Container">
      <Card style={{ width: "68rem" }}>
        <Card.Body>
          <Card.Title className="text-center">DashBoard</Card.Title>

          <Link to="/insertform">
            <Button variant="primary">Add New Record</Button>
          </Link>
        </Card.Body>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((userInfo, i) => {
              return [
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{userInfo.fullname}</td>
                  <td>{userInfo.email}</td>
                  <td>{userInfo.role}</td>
                  <td>
                    <Link to={`/update/${userInfo.id}`}>
                      <Button variant="primary">Edit</Button>
                    </Link>
                    <Button
                      onClick={() => deleteRecord(userInfo.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>,
              ];
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
