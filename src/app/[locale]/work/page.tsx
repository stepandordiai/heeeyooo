import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import WorkClient from "./WorkClient";
import { fetchWork } from "@/lib/api";
import ContactUs from "@/components/ContactUs/ContactUs";
import styles from "./Work.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const page = "work";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: t("workTitle"),
		description: t("workMetaDesc"),
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
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
