import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/context/AuthContext";

import AddProject from "./AddProject";

const env = import.meta.env;

const Dashboard = () => {
	const [show, setShow] = useState(false);

	const { googleSignIn, user, logOut } = useContext(AuthContext);
	const navigate = useNavigate();
	const handleGoogleSignIn = () => {
		try {
			googleSignIn && googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};
	useLayoutEffect(() => {
		if (user != null && user.uid !== env.VITE_REACT_APP_AUTH_UID) {
			logOut();
			navigate("/");
		} else if (user && user.uid === env.VITE_REACT_APP_AUTH_UID) {
			setShow(true);
		}
	}, [user]);

	return show ? (
		<AddProject />
	) : (
		<div className="justify-center sign">
			<button onClick={handleGoogleSignIn} style={{ color: "white" }}>
				Google
			</button>
		</div>
	);
};

export default Dashboard;
