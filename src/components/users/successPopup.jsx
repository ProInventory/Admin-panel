import React from "react";

import Popup from "../common/popup";

const SuccessPopup = (props) => {
	const { onClose } = props;

	return (
		<React.Fragment>
			<Popup
				title="Success"
				body={
					<React.Fragment>
						<p>Operation complete</p>
						<button
							type="button"
							className="btn btn-secondary ml-3"
							onClick={onClose}
						>
							Ok
						</button>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	);
};

export default SuccessPopup;
