import type { Metadata } from "next";
import Container from "../components/Container/Container";
import PageNav from "../components/PageNav/PageNav";
import WorkClient from "./WorkClient";
import { Project } from "../interfaces/Project";
import styles from "./Work.module.scss";

export const metadata: Metadata = {
	title: "Work • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/work",
	},
};

// TODO:
const Work = async () => {
	const url = process.env.API_URL!;
	const headers = {
		"X-SILO-KEY": process.env.API_KEY!,
		"Content-Type": "application/json",
	};

	// TODO:
	const response = await fetch(url, { headers, next: { revalidate: 60 } });
	const workData: Project[] = await response.json();

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
