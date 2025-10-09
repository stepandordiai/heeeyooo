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

interface WorkData {
	id: string;
	name: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: {
		value: string;
		name: string;
	}[];
}

// TODO:
const Work = async () => {
	const url = "https://api.jsonsilo.com/7e780e1a-7722-49d8-8a68-c1c31e75cf74";
	const headers = {
		"X-SILO-KEY": "crj7ApdJAqcBXnnuSVNoBIBi8VrjBIRImNwtyJPtdk",
		"Content-Type": "application/json",
	};

	// TODO:
	const response = await fetch(url, { headers });
	const workData: WorkData[] = await response.json();

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
