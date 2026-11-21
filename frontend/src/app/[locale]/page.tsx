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
import { BASE_URL } from "@/lib/constants";

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
	const jsonLd = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": `${BASE_URL}/#organization`,
				name: "heeeyooo studio",
				url: BASE_URL,
				logo: {
					"@type": "ImageObject",
					url: `${BASE_URL}/heeeyooo-studio-logo-white-v1.svg`,
					contentUrl: `${BASE_URL}/heeeyooo-studio-logo-white-v1.svg`,
				},
				description: "Creative web design and development studio.",
				email: "hello@heeeyooo.com",
				sameAs: ["https://www.instagram.com/heeeyooo.studio/"],
			},
			{
				"@type": "WebSite",
				"@id": `${BASE_URL}/#website`,
				url: BASE_URL,
				name: "heeeyooo studio",
				publisher: { "@id": `${BASE_URL}/#organization` },
				inLanguage: ["en", "uk", "cs"],
			},
		],
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
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
		</>
	);
}
