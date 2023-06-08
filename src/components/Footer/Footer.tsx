import "./styles.css";

import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { Context } from "src/App";
import { iconGithub, iconTelegram, iconTwitter } from "src/assets/img";
import Mailchimp from "src/components/Mailchimp";

const Footer = () => {
	const isDesktop = useContext(Context);
	return (
		<footer className="footer">
			<Container>
				<Row className="align-items-center">
					<Mailchimp />
					{!isDesktop && (
						<div className="social-icon align-items justify-center">
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
					<p className="justify-center">
						Copyright {new Date().getFullYear()}. All Rights
						Reserved
					</p>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
