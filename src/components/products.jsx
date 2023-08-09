import React, { useEffect, useState } from "react";
import styled from "styled-components";

import fetchData from "./utils/fetchData";

import Navbar from "./common/navBar";
import AddNewPopup from "./products/addNewPopup";
import EditPopup from "./products/editPopup";
import DeletePopup from "./common/popups/deletePopup";
import SuccessPopup from "./common/popups/successPopup";
import ErrorPopup from "./common/popups/errorPopup";

const ItemsStyle = styled.div`
  .items {
    display: flex;
  }

  .items_content {
    margin-left: 250px;
    padding: 20px;
  }

  .buttons {
    margin: 0 5px;
  }

  @media only screen and (max-width: 768px) {
    .items {
      flex-direction: column;
    }

    .items_content {
      margin-left: 0;
    }
  }
`;

const Products = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [error, setError] = useState("");

  const [showAddNewPopup, setAddNewShowPopup] = useState(false);
  const [showEditPopup, setEditShowPopup] = useState(false);
  const [showDeletePopup, setDeleteShowPopup] = useState(false);

  const [showSuccessPopup, setSuccessShowPopup] = useState(false);
  const [showErrorPopup, setErrorShowPopup] = useState(false);

  useEffect(() => {
    fetchData("products").then((response) => setProducts(response.data));
  }, []);

  const openAddNewPopup = () => {
    setAddNewShowPopup(true);
  };

  const closeAddNewPopup = () => {
    setAddNewShowPopup(false);
  };

  const openEditPopup = (_id) => {
    changeSelected(_id);
    setEditShowPopup(true);
  };

  const closeEditPopup = () => {
    changeSelected("");
    setEditShowPopup(false);
  };

  const openDeletePopup = (_id) => {
    changeSelected(_id);
    setDeleteShowPopup(true);
  };

  const closeDeletePopup = () => {
    changeSelected("");
    setDeleteShowPopup(false);
  };

  const openSuccessPopup = () => {
    closeAddNewPopup();
    setSuccessShowPopup(true);
  };

  const closeSuccessPopup = () => {
    setSuccessShowPopup(false);
  };

  const closeErrorPopup = () => {
    setErrorShowPopup(false);
  };

  const changeSelected = (_id) => {
    setSelectedProduct(_id);

    const product = products.find((product) => product._id === _id);
    if (!product) {
      setError("Product not found");
      setId("");
      setName("");
      setCategory("");
      setPrice(0);
      setQuantity(0);
      setDescription("");
      return;
    }

    setId(product._id);
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setQuantity(product.quantity);
    setDescription(product.description);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const { name, category, price, quantity, description } = event.target.elements;

    const newProduct = {
      name: name.value,
      category: category.value,
      price: price.value,
      quantity: quantity.value,
      description: description.value,
    };

    fetchData("products", "POST", newProduct).then((response) => {
      if (response.status === 200) {
        closeAddNewPopup();
        openSuccessPopup();
        setProducts([...products, response.data]);
      } else {
        setError(response.data);
        setErrorShowPopup(true);
      }
    });
  };

  const handleEdit = (event) => {
    event.preventDefault();

    const { name, category, price, quantity, description } = event.target.elements;

    const newProduct = {
      name: name.value,
      category: category.value,
      price: price.value,
      quantity: quantity.value,
      description: description.value,
    };

    fetchData(`products/${id}`, "PUT", newProduct).then((response) => {
      if (response.status === 200) {
        closeEditPopup();
        openSuccessPopup();

        const newProducts = products.map((product) => {
          if (product._id === id) {
            return response.data;
          }
          return product;
        });

        setProducts(newProducts);
      } else {
        setError(response.data);
        setErrorShowPopup(true);
      }
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();

    fetchData(`products/${id}`, "DELETE").then((response) => {
      if (response.status === 200) {
        closeDeletePopup();
        openSuccessPopup();
        const newProducts = products.filter((product) => product._id !== id);
        setProducts(newProducts);
      } else {
        setError(response.data);
        setErrorShowPopup(true);
      }
    });
  };

  const handleChange = (what, value) => {
    if (what === "name") {
      setName(value);
    } else if (what === "category") {
      setCategory(value);
    } else if (what === "price") {
      setPrice(value);
    } else if (what === "quantity") {
      setQuantity(value);
    } else if (what === "description") {
      setDescription(value);
    }
  };

  return (
    <React.Fragment>
      <ItemsStyle>
        <div className="items">
          <Navbar />
          <div className="items_content">
            <button className="btn btn-primary mb-3" onClick={openAddNewPopup}>
              Add new product
            </button>
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.description}</td>
                    <td>
                      <button className="btn btn-primary buttons" onClick={() => openEditPopup(product._id)}>
                        Edit
                      </button>
                      <button className="btn btn-danger buttons" onClick={() => openDeletePopup(product._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ItemsStyle>

      {showAddNewPopup && <AddNewPopup onSubmit={handleAdd} onClose={closeAddNewPopup} />}

      {showEditPopup && (
        <EditPopup
          product={{
            id,
            name,
            category,
            price,
            quantity,
            description,
          }}
          onSubmit={handleEdit}
          onClose={closeEditPopup}
          onChange={handleChange}
        />
      )}

      {showDeletePopup && <DeletePopup id={id} what="product" onDelete={handleDelete} onClose={closeDeletePopup} />}

      {showSuccessPopup && <SuccessPopup onClose={closeSuccessPopup} />}

      {showErrorPopup && <ErrorPopup error={error} onClose={closeErrorPopup} />}
    </React.Fragment>
  );
};

export default Products;
