import type { Metadata } from "next";
import Container from "../components/Container/Container";
import PageNav from "../components/PageNav/PageNav";
import WorkClient from "./WorkClient";
import { getWorkData } from "../lib/api";
import styles from "./Work.module.scss";

export const metadata: Metadata = {
	title: "Work • heeeyooo studio",
	description:
		"Explore heeeyooo studio’s creative work — branding, design, and digital projects that bring bold ideas to life. See how we turn concepts into standout results.",
	alternates: {
		canonical: "https://www.heeeyooo.studio/work",
	},
};

// TODO:
const Work = async () => {
	const workData = await getWorkData();

	return (
		<main className={styles.work}>
			<Container>
				<PageNav pageName="Work" />
				<WorkClient workData={workData} />
			</Container>
		</main>
	);
};

export default Work;
