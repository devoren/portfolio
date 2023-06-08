import { Col } from "react-bootstrap";
import { IProject } from "src/model";

const ProjectCard = ({ title, description, imgURL, link }: IProject) => {
	return (
		<Col size={12} sm={6} md={4} className="proj-container">
			<div className="proj-imgbx">
				<img src={imgURL} alt="card-img" />
				<div className="proj-txtx">
					<a href={link} target="_blank" rel="noopener noreferrer">
						<h4>{title}</h4>
					</a>
					<span>{description}</span>
				</div>
			</div>
		</Col>
	);
};
export default ProjectCard;
