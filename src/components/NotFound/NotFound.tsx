import React from "react";
import { Container } from "react-bootstrap";
import notFound from "src/assets/img/error_404.svg";
import "./styles.css";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Container>
			<div className="error">
				<div className="image">
					<img src={notFound} alt="not_found" />
				</div>
				<Link to={"/"}>
					<h1>Home</h1>
				</Link>
			</div>
		</Container>
	);
};

export default NotFound;
