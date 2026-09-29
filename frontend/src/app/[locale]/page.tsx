import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import Services from "@/components/home/Services/Services";
import Technologies from "@/components/home/Technologies/Technologies";
import FeaturedWork from "@/components/home/FeaturedWork/FeaturedWork";
import ContactUs from "@/components/ContactUs/ContactUs";
import styles from "./Home.module.scss";
import Hero from "@/components/home/Hero/Hero";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "home.meta" });
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}`]),
	);

	return {
		title: t("title"),
		description: t("desc"),
		alternates: {
			canonical: `/${locale}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}`,
			},
		},
	};
}

export default function Home() {
	return (
		<main className={styles.home}>
			<Container>
				<div className={styles["home-inner"]}>
					<Hero />
					<FeaturedWork />
					<Services />
					<Technologies />
					<ContactUs />
				</div>
			</Container>
		</main>
	);
}
