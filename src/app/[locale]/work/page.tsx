import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import WorkClient from "./WorkClient";
import ContactUs from "@/components/ContactUs/ContactUs";
import styles from "./Work.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "work.meta" });
	const page = "work";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: t("title"),
		description: t("desc"),
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

	return (
		<main className={styles.work}>
			<Container>
				<Breadcrumbs links={[{ label: t("workTitle") }]} />
				<WorkClient />
				<ContactUs />
			</Container>
		</main>
	);
}
