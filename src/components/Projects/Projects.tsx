import "./styles.css";
import "animate.css";

import { forwardRef, useContext, useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import TrackVisibility from "react-on-screen";
import { Context } from "src/App";
import { colorSharp2 } from "src/assets/img";
import Loader from "src/components/Loader";
import { IProject } from "src/model";
import { getAllProjects, Shuffle } from "src/utils";

import ProjectCard from "./ProjectCard";

const Projects = forwardRef(
	(_, ref: React.LegacyRef<HTMLElement> | undefined) => {
		const isDesktop = useContext(Context);
		const [data, setData] = useState<IProject[]>([]);
		const [isLoading, setIsLoading] = useState(false);
		const itemsRef = useRef(false);
		const getItems = async () => {
			setIsLoading(true);
			const data = await getAllProjects();
			setData(data as IProject[]);
			setIsLoading(false);
		};

		const webProjects: IProject[] = useMemo(
			() => Shuffle(data.filter((project) => project.isWeb)),
			[data]
		);
		const mobileProjects: IProject[] = useMemo(
			() => Shuffle(data.filter((project) => project.isMobile)),
			[data]
		);

		useEffect(() => {
			if (itemsRef.current) {
				getItems();
			}
			return () => {
				itemsRef.current = true;
			};
		}, []);

		return (
			<section className="project part" id="projects" ref={ref}>
				<Container>
					<Row>
						<Col>
							<TrackVisibility
								partialVisibility
								offset={-100}
								once={!isDesktop}
							>
								{({ isVisible }) => (
									<div
										className={
											isVisible
												? "animate__animated animate__fadeIn"
												: "animate__animated animate__fadeOut"
										}
									>
										<h2>Projects</h2>
										<p>Some Things I’ve Built</p>
										<Tab.Container
											id="projects-tabs"
											defaultActiveKey={"web"}
											transition={isDesktop}
										>
											<Nav
												variant="pills"
												className={[
													"mb-5 justify-content-center align-items-center nav-pills",
													isDesktop ? "width" : "",
												].join(" ")}
												id="pills-tab"
											>
												<Nav.Item>
													<Nav.Link eventKey="web">
														Web App
													</Nav.Link>
												</Nav.Item>
												<Nav.Item>
													<Nav.Link eventKey="mobile">
														Mobile App
													</Nav.Link>
												</Nav.Item>
											</Nav>
											<Tab.Content>
												<Tab.Pane eventKey="web">
													<Row>
														{isLoading ? (
															<div className="loader">
																<Loader />
															</div>
														) : (
															webProjects.map(
																(project) => {
																	return (
																		<ProjectCard
																			key={
																				project.id
																			}
																			{...project}
																		/>
																	);
																}
															)
														)}
													</Row>
												</Tab.Pane>
												<Tab.Pane eventKey="mobile">
													<Row>
														{isLoading ? (
															<div className="loader">
																<Loader />
															</div>
														) : (
															mobileProjects.map(
																(project) => {
																	return (
																		<ProjectCard
																			key={
																				project.id
																			}
																			{...project}
																		/>
																	);
																}
															)
														)}
													</Row>
												</Tab.Pane>
											</Tab.Content>
										</Tab.Container>
									</div>
								)}
							</TrackVisibility>
						</Col>
					</Row>
				</Container>
				<img
					className="background-image-right"
					src={colorSharp2}
					alt="bg-img-left"
				/>
			</section>
		);
	}
);

export default Projects;
