import "./styles.css";

import { memo, useContext, useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Context } from "src/App";
import { logo } from "src/assets/img";

import NavLink from "./NavLink";

interface NavBarProps {
	activeSection: number | undefined;
}

const NavBar = ({ activeSection }: NavBarProps) => {
	const [activeLink, setActiveLink] = useState("home");
	const [expanded, setExpanded] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const isDesktop = useContext(Context);

	useEffect(() => {
		const onScroll = () => {
			if (window.scrollY > 150) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
			setExpanded(false);
		};

		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const onUpdateActiveLink = (link: string) => setActiveLink(link);

	const scrollToTop = () => window.scrollTo({ top: 0 });

	return (
		<Navbar
			expand="lg"
			className={scrolled ? "scrolled" : ""}
			collapseOnSelect
			onToggle={(expanded) => setExpanded(expanded)}
			expanded={expanded}
		>
			<Container>
				<Navbar.Brand className={"brand"} onClick={() => scrollToTop()}>
					<img src={logo} alt="logo" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav">
					<span className="navbar-toggler-icon"></span>
				</Navbar.Toggle>
				<Navbar.Collapse id="basic-navbar-nav">
					{isDesktop ? (
						<NavLink
							activeLink={activeLink}
							onUpdateActiveLink={onUpdateActiveLink}
							isDesktop={isDesktop}
							activeSection={activeSection}
						/>
					) : (
						<div className="flex">
							<NavLink
								activeLink={activeLink}
								onUpdateActiveLink={onUpdateActiveLink}
								isDesktop={isDesktop}
								activeSection={activeSection}
							/>
						</div>
					)}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default memo(NavBar);
