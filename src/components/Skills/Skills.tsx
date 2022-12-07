import "./styles.css";
import "react-multi-carousel/lib/styles.css";

import { forwardRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import { colorSharp, meter1, meter2, meter3 } from "src/assets/img";
import { skills } from "src/constants";
import SkillItem from "./SkillItem";

const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 6,
	},
	desktop: {
		breakpoint: { max: 1920, min: 1024 },
		items: 6,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

const Skills = forwardRef(
	(_, ref: React.LegacyRef<HTMLElement> | undefined) => {
		return (
			<section className="skill part" id="skills" ref={ref}>
				<Container>
					<Row>
						<Col>
							<div className="skill-bx">
								<h2>Skills</h2>
								<p>
									I write code and improve my design and
									skills every day. Here are a few
									technologies I’ve been working with
									recently:
								</p>
								<Carousel
									responsive={responsive}
									infinite={false}
									swipeable
									draggable
									minimumTouchDrag={50}
									autoPlay={true}
									autoPlaySpeed={5500}
									className="skill-slider"
								>
									{skills.map((skill) => (
										<SkillItem
											key={skill.id}
											src={skill.imgUrl}
											title={skill.title}
										/>
									))}
								</Carousel>
							</div>
						</Col>
					</Row>
				</Container>
				<img
					className="background-image-left"
					src={colorSharp}
					alt="color-sharp"
				/>
			</section>
		);
	}
);

export default Skills;
