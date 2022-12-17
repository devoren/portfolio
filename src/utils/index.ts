import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "src/firebase.config";

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height,
	};
}

export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowDimensions;
}

export const getAllProjects = async () => {
	const items = await getDocs(
		query(collection(firestore, "Projects"), orderBy("id", "desc"))
	);

	return items.docs.map((doc) => doc.data());
};

export const Shuffle = (items: any) => {
	for (let i = items.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[items[i], items[j]] = [items[j], items[i]];
	}
	return items;
};

export const isWinter = () => {
	const WINTER_MONTHS = [0, 1, 11];
	let month = new Date().getMonth();
	return WINTER_MONTHS.includes(month);
};
