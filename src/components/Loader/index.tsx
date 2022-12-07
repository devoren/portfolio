import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
	return (
		<ThreeDots
			height="80"
			width="80"
			radius="9"
			color="#eee"
			ariaLabel="three-dots-loading"
			visible={true}
		/>
	);
};

export default Loader;
