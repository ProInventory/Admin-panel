import React from "react";

import Popup from "../common/popup";

const ErrorPopup = (props) => {
	const { error, onCloseErrorPopup } = props;

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
							onClick={onCloseErrorPopup}
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
