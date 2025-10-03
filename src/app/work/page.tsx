import type { Metadata } from "next";
import Container from "../components/Container/Container";
import PageNav from "../components/PageNav/PageNav";
import WorkClient from "./WorkClient";
import styles from "./Work.module.scss";

export const metadata: Metadata = {
	title: "Work • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/work",
	},
};

const Work = () => {
	return (
		<main className={styles.work}>
			<Container>
				<PageNav />
				<WorkClient />
			</Container>
		</main>
	);
};

export default Work;
