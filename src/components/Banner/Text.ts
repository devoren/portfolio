import { useEffect, useMemo, useState } from "react";

const PERIOD = 500;
const Text = (isVisible: boolean) => {
	const [loopNum, setLoopNum] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDone, setIsDone] = useState(false);
	const [text, setText] = useState("");
	const [delta, setDelta] = useState(500 - Math.random() * 100);
	const toRotate = useMemo(
		() => ["Web Developer", "Mobile Developer", "UI/UX Developer"],
		[]
	);

	useEffect(() => {
		let ticker: string | number | NodeJS.Timeout | undefined;
		if (isVisible) {
			ticker = setInterval(() => {
				tick();
			}, delta);
		}

		return () => clearInterval(ticker);
	}, [text, isVisible]);

	const tick = () => {
		let i = loopNum % toRotate.length;
		let fullText = toRotate[i];
		let updatedText = isDeleting
			? fullText.substring(0, text.length - 1)
			: fullText.substring(0, text.length + 1);
		setText(updatedText);
		setIsDone(false);
		if (isDeleting) {
			setDelta((prevDelta) => prevDelta / 2);
			setIsDone(false);
		}
		if (!isDeleting && updatedText === fullText) {
			setIsDeleting(true);
			setDelta(PERIOD);
			setIsDone(true);
		} else if (isDeleting && updatedText === "") {
			setIsDeleting(false);
			setLoopNum((loopNum) => loopNum + 1);
			setDelta(500);
			setIsDone(true);
		}
	};
	return [text, isDone];
};

export default Text;
