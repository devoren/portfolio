import "./styles.css";
import "animate.css";

import { forwardRef, memo, useState } from "react";
import {
	Alert,
	Col,
	Container,
	Row,
	Toast,
	ToastContainer,
} from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { contactImg } from "src/assets/img";

import Form from "./Form";
const env = import.meta.env;

interface Status {
	success: boolean;
	message: string;
}

const url = env.VITE_REACT_APP_CONTACT_SENDER_URL + "/contact";

const Contact = forwardRef(
	(_, ref: React.LegacyRef<HTMLElement> | undefined) => {
		const formInitialDetails = {
			firstName: "",
			lastName: "",
			email: "",
			phone: "",
			message: "",
		};
		const [formDetails, setFormDetails] = useState(formInitialDetails);
		const [buttonText, setButtonText] = useState("Send");
		const [status, setStatus] = useState<Status | null>(null);
		const [toastState, setToastState] = useState(false);

		const onFormUpdate = (category: string, value: string) => {
			setFormDetails({
				...formDetails,
				[category]: value,
			});
		};

		const handleSubmit = async (e: React.FormEvent) => {
			e.preventDefault();
			setButtonText("Sending...");
			let response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(formDetails),
			});
			setButtonText("Send");
			let result = await response.json();

			setFormDetails(formInitialDetails);
			if (response.status == 200) {
				setStatus({
					success: true,
					message: result.message,
				});
			} else {
				setStatus({
					success: false,
					message: "Something went wrong, please try again later.",
				});
			}
			setToastState(true);
		};

		return (
			<section className="contact" id="connect" ref={ref}>
				<Container>
					<Row className="align-items-center">
						<Col size={12} md={6}>
							<TrackVisibility once partialVisibility={true}>
								{({ isVisible }) => (
									<img
										className={
											isVisible
												? "animate__animated animate__zoomIn"
												: ""
										}
										src={contactImg}
										alt="Contact Us"
										draggable={false}
									/>
								)}
							</TrackVisibility>
						</Col>
						<Col size={12} md={6}>
							<TrackVisibility once offset={400}>
								{({ isVisible }) => (
									<div
										className={
											isVisible
												? "animate__animated animate__fadeIn"
												: "animate__animated animate__fadeOut"
										}
									>
										<h2>Get In Touch</h2>
										<Form
											handleSubmit={handleSubmit}
											formDetails={formDetails}
											buttonText={buttonText}
											onFormUpdate={onFormUpdate}
										/>
									</div>
								)}
							</TrackVisibility>

							<ToastContainer
								className="p-3 fixed"
								position="bottom-start"
								containerPosition="fixed"
							>
								{status?.success ? (
									<Toast
										autohide
										delay={3000}
										show={toastState}
										onClose={() => setToastState(false)}
									>
										<Alert
											variant="success"
											style={{ margin: 0 }}
											data-bs-dismiss="toast"
										>
											{status?.message}
										</Alert>
									</Toast>
								) : (
									<Toast
										autohide
										delay={3000}
										show={toastState}
										onClose={() => setToastState(false)}
										bg={"danegr"}
									>
										<Alert
											variant="danger"
											style={{ margin: 0 }}
											data-bs-dismiss="toast"
										>
											{status?.message}
										</Alert>
									</Toast>
								)}
							</ToastContainer>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
);

export default memo(Contact);
