import "./styles.css";

import {
	forwardRef,
	memo,
	useEffect,
	useState,
	useContext,
	useCallback,
} from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import TrackVisibility from "react-on-screen";
import { headerImg } from "src/assets/img";

import Text from "./Text";

const Banner = forwardRef(
	(_, ref: React.LegacyRef<HTMLElement> | undefined) => {
		const [isSectionVisible, setIsSectionVisible] = useState(false);
		const [text, isDone] = Text(isSectionVisible);
		const callbackFn = useCallback(
			(entries: IntersectionObserverEntry[]) => {
				const [entry] = entries;

				setIsSectionVisible(entry.isIntersecting);
			},
			[]
		);
		const options = {
			root: null,
			rootMargin: "0px",
			threshold: 0.2,
		};

		useEffect(() => {
			const observer = new IntersectionObserver(callbackFn, options);
			if ((ref as React.RefObject<HTMLElement>).current) {
				observer.observe(
					(ref as React.RefObject<HTMLElement>).current as HTMLElement
				);
			}
			return () => {
				if ((ref as React.RefObject<HTMLElement>).current) {
					observer.unobserve(
						(ref as React.RefObject<HTMLElement>)
							.current as HTMLElement
					);
				}
			};
		}, []);

		return (
			<section className="banner" id="home" ref={ref}>
				<Container>
					<Row className="align-items-center">
						<Col xs={12} md={6} xl={7}>
							<TrackVisibility once>
								{({ isVisible }) => {
									return (
										<div
											className={
												isVisible
													? "animate__animated animate__fadeIn"
													: "animate__animated animate__fadeOut"
											}
										>
											<span className="tagline">
												Welcome to my Portfolio
											</span>
											<div className={"about"}>
												<h1>
													{`Hi I'm Oren `}
													<span className="txt-rotate">
														<span
															className={`wrap ${
																isDone
																	? "animate"
																	: ""
															}`}
														>
															{isSectionVisible
																? text
																: "Web Developer"}
														</span>
													</span>
												</h1>
											</div>
											<p>
												Front-End Developer and Mobile
												(Cross-Platform) App Developer
												based in Kazakhstan. A dreamer
												and a fanatic of all digital
												things. Love minimal design,
												games and pizza. I enjoy
												creating things that live on the
												internet.
											</p>
											<a href="#connect">
												Let's connect
												<ArrowRightCircle size={25} />
											</a>
										</div>
									);
								}}
							</TrackVisibility>
						</Col>
						<Col xs={12} md={6} xl={5}>
							<TrackVisibility once>
								{({ isVisible }) => (
									<div
										className={
											isVisible
												? "animate__animated animate__zoomIn"
												: ""
										}
									>
										<img
											src={headerImg}
											alt="Header Image"
										/>
									</div>
								)}
							</TrackVisibility>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
);

export default memo(Banner);
