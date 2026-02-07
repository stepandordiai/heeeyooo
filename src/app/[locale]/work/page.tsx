import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
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
export default async function Work() {
	const t = await getTranslations();

	const workData = await fetchWork();

	return (
		<main className={styles.work}>
			<Container>
				<Breadcrumbs links={[{ label: t("workTitle") }]} />
				<WorkClient workData={workData} />
			</Container>
		</main>
	);
}
