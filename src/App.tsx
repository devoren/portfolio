import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { createContext, useLayoutEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useScrollSpy from "react-use-scrollspy";
import Banner from "src/components/Banner";
import Contact from "src/components/Contact";
import Footer from "src/components/Footer";
import NavBar from "src/components/NavBar";
import Projects from "src/components/Projects";
import Skills from "src/components/Skills";

import Snowfall from "react-snowfall";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { AuthContextProvider } from "./context/AuthContext";
import { isWinter, useWindowDimensions } from "./utils";
import { snowflake as snowflakeImg } from "./assets/img";

const snowflake = document.createElement("img");
snowflake.src = snowflakeImg;

export const Context = createContext<boolean>(false);

const Main = () => {
	const sectionRefs = [
		useRef<HTMLElement>(null),
		useRef<HTMLElement>(null),
		useRef<HTMLElement>(null),
		useRef<HTMLElement>(null),
	];
	const activeSection = useScrollSpy({
		sectionElementRefs: sectionRefs,
		offsetPx: -80,
	});

	return (
		<>
			<NavBar activeSection={activeSection} />
			<Banner ref={sectionRefs[0]} />
			<Skills ref={sectionRefs[1]} />
			<Projects ref={sectionRefs[2]} />
			<Contact ref={sectionRefs[3]} />
			<Footer />
		</>
	);
};

function App() {
	const { width } = useWindowDimensions();
	const [isDesktop, setIsDesktop] = useState(false);

	useLayoutEffect(() => {
		if (width >= 992) {
			setIsDesktop(true);
		} else {
			setIsDesktop(false);
		}
	}, []);

	return (
		<Context.Provider value={isDesktop}>
			{isWinter() ? (
				<Snowfall
					style={{
						position: "fixed",
						width: "100vw",
						height: "100vh",
					}}
					radius={[10, 30]}
					speed={[0.25, 1.8]}
					snowflakeCount={120}
					wind={[-0.5, 0.2]}
					rotationSpeed={[-0.5, 0.3]}
					images={[snowflake]}
				/>
			) : null}
			<div className="App">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route
						path="/dashboard"
						element={
							<AuthContextProvider>
								<Dashboard />
							</AuthContextProvider>
						}
					/>
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</Context.Provider>
	);
}

export default App;
