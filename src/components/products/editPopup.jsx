import React from "react";

import Popup from "../common/popup";

const EditPopup = (props) => {
	const { onClose, onChange, onSubmit } = props;
	const { id, name, category, price, quantity, description } = props.product;

	return (
		<React.Fragment>
			<Popup
				title="Edit Product"
				body={
					<React.Fragment>
						<p>Product id: {id}</p>
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									id="name"
									name="name"
									className="form-control"
									value={name}
									onChange={(e) =>
										onChange("name", e.target.value)
									}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="category">Category:</label>
								<input
									type="text"
									id="category"
									name="category"
									className="form-control"
									value={category}
									onChange={(e) =>
										onChange("category", e.target.value)
									}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="price">Price:</label>
								<input
									type="number"
									id="price"
									name="price"
									className="form-control"
									value={price}
									onChange={(e) =>
										onChange("price", e.target.value)
									}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="quantity">Quantity:</label>
								<input
									type="number"
									id="quantity"
									name="quantity"
									className="form-control"
									value={quantity}
									onChange={(e) =>
										onChange("quantity", e.target.value)
									}
								/>
							</div>

							<div className="form-group">
								<label htmlFor="description">
									Description:
								</label>
								<input
									type="text"
									id="description"
									name="description"
									className="form-control"
									value={description}
									onChange={(e) =>
										onChange("description", e.target.value)
									}
								/>
							</div>

							<button type="submit" className="btn btn-primary">
								Submit
							</button>

							<button
								style={{ marginLeft: "10px" }}
								type="button"
								className="btn btn-secondary ml-3"
								onClick={onClose}
							>
								Cancel
							</button>
						</form>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	);
};

export default EditPopup;
