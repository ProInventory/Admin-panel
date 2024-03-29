import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Navbar from "./common/navBar";
import Box from "./dashboard/box";

import fetchData from "./utils/fetchData";

const DashStyle = styled.div`
  .dashboard {
    display: flex;
  }

  .dashboard_content {
    margin-left: 250px;
    padding: 20px;
  }

  .table td {
    width: 200px;
    height: 200px;
    padding: 25px;
  }

  @media only screen and (max-width: 768px) {
    .dashboard {
      flex-direction: column;
    }

    .dashboard_content {
      margin-left: 0;
    }
  }
`;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    fetchData("users").then((response) => setUsers(response.data));
    fetchData("branches").then((response) => setBranches(response.data));
    fetchData("products").then((response) => setProducts(response.data));
    fetchData("deliveries").then((response) => setDeliveries(response.data));
  }, []);

  return (
    <React.Fragment>
      <DashStyle>
        <div className="dashboard">
          <Navbar />
          <div className="dashboard_content">
            <h1>Welcome to your Dashboard</h1>
            <p>Here you can see your latest updates and messages.</p>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <Box title="Users" body={<React.Fragment>Total : {users.length}</React.Fragment>} link="/users" />
                  </td>
                  <td>
                    <Box title="Branches" body={<React.Fragment>Total : {branches.length}</React.Fragment>} link="/branches" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Box title="Products" body={<React.Fragment>Total : {products.length}</React.Fragment>} link="/products" />
                  </td>
                  <td>
                    <Box title="Deliveries" body={<React.Fragment>Total : {deliveries.length}</React.Fragment>} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DashStyle>
    </React.Fragment>
  );
};

export default Dashboard;
