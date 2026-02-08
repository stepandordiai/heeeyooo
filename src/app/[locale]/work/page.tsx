import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import WorkClient from "./WorkClient";
import { fetchWork } from "@/app/lib/api";
import styles from "./Work.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	// TODO: learn this
	const t = await getTranslations({ locale });
	const baseUrl = "https://www.heeeyooo.studio";

	const lngUrls = {
		en: `${baseUrl}/en/work`,
		uk: `${baseUrl}/uk/work`,
		cs: `${baseUrl}/cs/work`,
	};

	return {
		title: t("workTitle"),
		description: t("workMetaDesc"),
		alternates: {
			canonical: `${baseUrl}/${locale}/work`,
			languages: {
				...lngUrls,
				"x-default": `${baseUrl}/en/work`,
			},
		},
	};
}

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
