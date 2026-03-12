import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import WorkClient from "./WorkClient";
import { fetchWork } from "@/app/lib/api";
import ContactUs from "@/app/components/ContactUs/ContactUs";
import styles from "./Work.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	const t = await getTranslations({ locale });

	const locales = ["en", "uk", "cs"];
	const alternates = Object.fromEntries(locales.map((l) => [l, `/${l}/work`]));

	return {
		title: t("workTitle"),
		description: t("workMetaDesc"),
		alternates: {
			canonical: `/${locale}/work`,
			languages: {
				...alternates,
				"x-default": "/en/work",
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
				<ContactUs />
			</Container>
		</main>
	);
}
