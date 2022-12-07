import React from "react";

interface SkillItemProps {
	src: string;
	title: string;
}

const SkillItem = ({ src, title }: SkillItemProps) => {
	return (
		<figure className="item">
			<img src={src} alt="item" draggable={false} />
			<h5>{title}</h5>
		</figure>
	);
};

export default SkillItem;
