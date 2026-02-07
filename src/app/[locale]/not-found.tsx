import Breadcrumbs from "../components/common/PageNav/PageNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "404 • heeeyooo studio",
	robots: {
		index: false,
		follow: false,
	},
};

const NotFound = () => {
	return (
		<main className="not-found">
			<Breadcrumbs pageName="404" />
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
