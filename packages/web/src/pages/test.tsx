import React from "react";
import Box from "@poodle/ui/Box";
import Button from "@poodle/ui/Button";
import Modal from "@poodle/ui/Modal";
import ModalHeader from "@poodle/ui/ModalHeader";
import ModalBody from "@poodle/ui/ModalBody";
import ModalFooter from "@poodle/ui/ModalFooter";
import { Provider } from "../layout/Provider";

const IndexPage = () => {
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Provider>
			<Button
				onClick={() => {
					setOpen(true);
				}}
			>
				Open modal
			</Button>
			<Modal
				isOpen={open}
				onRequestClose={handleClose}
				modalProps={{
					"aria-labelledby": "modalTitlte",
					"aria-describedby": "modalBody",
				}}
			>
				<ModalHeader
					id="modalTitlte"
					withClose={true}
					closeProps={{
						onClick: handleClose,
					}}
				>
					Modal title
				</ModalHeader>
				<ModalBody id="modalBody">
					The selected document <Box as="strong">“price.docx”</Box> will be
					sent.
				</ModalBody>
				<ModalFooter>
					<Button variant="fill">Send</Button>
					<Button ml="scale-2" onClick={handleClose}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
		</Provider>
	);
};

export default IndexPage;
