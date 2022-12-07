import { useContext, createContext, useEffect, useState } from "react";
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
	User,
} from "firebase/auth";
import { auth } from "src/firebase.config";

export interface Auth {
	googleSignIn: () => void;
	logOut: () => void;
	user: User | null;
}

export const AuthContext = createContext<Auth>({
	googleSignIn: function (): void {},
	logOut: function (): void {},
	user: null,
});

export const AuthContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useState<User | null>(null);

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		// signInWithPopup(auth, provider);
		signInWithRedirect(auth, provider);
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(currentUser) => {
				setUser(currentUser);
			},
			(error) => {
				console.log("User", error);
			}
		);
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
