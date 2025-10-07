import PageNav from "./components/PageNav/PageNav";

const NotFound = () => {
	return (
		<main className="not-found">
			<PageNav pageName="404" />
			<p
				style={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					fontSize: "3rem",
				}}
			>
				404
			</p>
		</main>
	);
};

export default NotFound;
