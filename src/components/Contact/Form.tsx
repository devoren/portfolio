import React, { useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Context } from "src/App";

interface FormProps {
	handleSubmit: React.FormEventHandler<HTMLFormElement>;
	formDetails: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		message: string;
	};
	onFormUpdate: (category: string, value: string) => void;
	buttonText: string;
}

const Form = (props: FormProps) => {
	const { handleSubmit, formDetails, onFormUpdate, buttonText } = props;
	const isDesktop = useContext(Context);
	const ref = useRef<HTMLFormElement | null>(null);

	const isDisabled =
		formDetails.email === "" ||
		formDetails.firstName === "" ||
		formDetails.lastName === "" ||
		formDetails.message === "";

	const submitClassName =
		isDisabled && isDesktop
			? "disabled"
			: !isDesktop && isDisabled
			? "disabled me"
			: !isDesktop
			? "me"
			: "";

	return (
		<form
			onSubmit={(e) => {
				handleSubmit(e);
				ref.current?.reset();
			}}
			ref={ref}
		>
			<Row>
				<Col size={12} sm={6} className="px-1">
					<input
						type="text"
						value={formDetails.firstName}
						placeholder="First Name"
						onChange={(e) =>
							onFormUpdate("firstName", e.target.value)
						}
						required
					/>
				</Col>
				<Col size={12} sm={6} className="px-1">
					<input
						type="text"
						value={formDetails.lastName}
						placeholder="Last Name"
						onChange={(e) =>
							onFormUpdate("lastName", e.target.value)
						}
						required
					/>
				</Col>
				<Col size={12} sm={6} className="px-1">
					<input
						type="email"
						value={formDetails.email}
						placeholder="Email Address"
						onChange={(e) => onFormUpdate("email", e.target.value)}
						required
					/>
				</Col>
				<Col size={12} sm={6} className="px-1">
					<input
						type="tel"
						value={formDetails.phone}
						placeholder="Phone No."
						onChange={(e) => onFormUpdate("phone", e.target.value)}
						required
					/>
				</Col>
				<Col size={12} className="px-1">
					<textarea
						rows={6}
						value={formDetails.message}
						placeholder="Message"
						onChange={(e) =>
							onFormUpdate("message", e.target.value)
						}
						required
					/>
					<button
						type="submit"
						disabled={isDisabled}
						className={submitClassName}
					>
						<span>{buttonText}</span>
					</button>
				</Col>
			</Row>
		</form>
	);
};

export default Form;
