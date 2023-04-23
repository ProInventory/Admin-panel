import React from "react";

import Popup from "../popup";

const ErrorPopup = (props) => {
	const { error, onClose } = props;

	return (
		<React.Fragment>
			<Popup
				title="Error"
				body={
					<React.Fragment>
						<p>{error}</p>
						<button
							type="button"
							className="btn btn-secondary ml-3"
							onClick={onClose}
						>
							Sure
						</button>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	);
};

export default ErrorPopup;
