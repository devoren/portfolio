import React, { useEffect, useState } from "react";
import { Alert, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { EmailFormFields } from "react-mailchimp-subscribe";

interface Props {
	status: "error" | "success" | "sending" | null;
	message: string | Error | null;
	onValidated: ({}: EmailFormFields) => void;
}

const Newsletter = ({ status, message, onValidated }: Props) => {
	const [email, setEmail] = useState("");
	const [state, setState] = useState(false);

	useEffect(() => {
		if (status === "success") clearFields();
	}, [status]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		email &&
			email.indexOf("@") > -1 &&
			onValidated({
				EMAIL: email,
			});
		setState(true);
	};

	const clearFields = () => {
		setEmail("");
	};

	return (
		<Col lg={12}>
			<div className="newsletter-bx wow slideInUp">
				<Row>
					<Col lg={6} md={6} xl={5}>
						<h3>
							Subscribe to my Newsletter<br></br> & Never miss
							latest updates
						</h3>
						<ToastContainer
							className="p-3 fixed"
							position="bottom-start"
							containerPosition="fixed"
						>
							{status === "sending" && (
								<Toast autohide>
									<Alert style={{ margin: 0 }}>
										Sending...
									</Alert>
								</Toast>
							)}
							{status === "error" && (
								<Toast autohide delay={3000}>
									<Alert
										variant="danger"
										style={{ margin: 0 }}
										data-bs-dismiss="toast"
									>
										{message?.toString()}
									</Alert>
								</Toast>
							)}
							{status === "success" && (
								<Toast
									autohide
									delay={3000}
									show={state}
									onClose={() => setState(false)}
								>
									<Alert
										variant="success"
										style={{ margin: 0 }}
										data-bs-dismiss="toast"
									>
										{message?.toString()}
									</Alert>
								</Toast>
							)}
						</ToastContainer>
					</Col>
					{status && status === "success" ? (
						<Col md={6} xl={7}>
							<Alert
								variant="success"
								style={{ margin: 0 }}
								data-bs-dismiss="toast"
							>
								{message?.toString()}
							</Alert>
						</Col>
					) : (
						<Col md={6} xl={7}>
							<form onSubmit={handleSubmit}>
								<div className="new-email-bx">
									<input
										value={email}
										type="email"
										onChange={(e) =>
											setEmail(e.target.value)
										}
										placeholder="Email Address"
									/>
									<button type="submit">Submit</button>
								</div>
							</form>
						</Col>
					)}
				</Row>
			</div>
		</Col>
	);
};

export default Newsletter;
