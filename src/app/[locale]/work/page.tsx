import type { Metadata } from "next";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/PageNav/PageNav";
import WorkClient from "./WorkClient";
import { fetchWork } from "@/app/lib/api";
import styles from "./Work.module.scss";

export const metadata: Metadata = {
	title: "Work | heeeyooo studio",
	description:
		"Explore heeeyooo studio’s creative work — branding, design, and digital projects that bring bold ideas to life. See how we turn concepts into standout results.",
	alternates: {
		canonical: "https://www.heeeyooo.studio/work",
	},
};

// TODO:
const Work = async () => {
	const workData = await fetchWork();

	return (
		<main className={styles.work}>
			<Container>
				<Breadcrumbs pageName="Work" />
				<WorkClient workData={workData} />
			</Container>
		</main>
	);
};

export default Work;
