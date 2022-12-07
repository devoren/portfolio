import React from "react";
import { Nav } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import iconTwitter from "src/assets/img/icon-twitter.svg";
import iconTelegram from "src/assets/img/icon-tg.svg";
import iconGithub from "src/assets/img/icon-github.svg";

interface NavLinkProps {
	activeLink: string;
	onUpdateActiveLink: (v: string) => void;
	isDesktop: boolean;
	activeSection: number | undefined;
}

const NavLink = ({
	activeLink,
	onUpdateActiveLink,
	isDesktop,
	activeSection,
}: NavLinkProps) => {
	return (
		<>
			<Nav id="list" className="me-auto">
				<Nav.Link
					href="#home"
					className={
						activeSection === 0
							? "active navbar-link"
							: "navbar-link"
					}
					onClick={() => onUpdateActiveLink("home")}
				>
					Home
				</Nav.Link>
				<Nav.Link
					href="#skills"
					className={
						activeSection === 1
							? "active navbar-link"
							: "navbar-link"
					}
					onClick={() => onUpdateActiveLink("skills")}
				>
					Skills
				</Nav.Link>
				<Nav.Link
					href="#projects"
					className={
						activeSection === 2
							? "active navbar-link"
							: "navbar-link"
					}
					onClick={() => onUpdateActiveLink("projects")}
				>
					Projects
				</Nav.Link>
			</Nav>
			<span className="navbar-text">
				{isDesktop && (
					<div className="social-icon align-items">
						<a
							href="https://t.me/orennurkeldi"
							rel="noopener noreferrer"
							target={"_blank"}
						>
							<img src={iconTelegram} alt="iconTelegram" />
						</a>
						<a
							href="https://twitter.com/orennurkeldi"
							rel="noopener noreferrer"
							target={"_blank"}
						>
							<img src={iconTwitter} alt="iconTwitter" />
						</a>
						<a
							href="https://github.com/devoren"
							rel="noopener noreferrer"
							target={"_blank"}
						>
							<img src={iconGithub} alt="iconGithub" />
						</a>
					</div>
				)}
				<HashLink to="#connect">
					<button className="connect">
						<span>Let’s Connect</span>
					</button>
				</HashLink>
			</span>
		</>
	);
};

export default NavLink;
