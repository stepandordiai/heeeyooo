import type { Metadata } from "next";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import AboutClient from "./AboutUsClient";
import { getTranslations } from "next-intl/server";
import WordLine from "@/app/components/WordLine/WordLine";
import ContactUs from "@/app/components/ContactUs/ContactUs";
import styles from "./AboutUs.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	const t = await getTranslations({ locale });

	const locales = ["en", "uk", "cs"];
	const alternates = Object.fromEntries(
		locales.map((l) => [l, `/${l}/about-us`]),
	);

	return {
		title: t("aboutUsTitle"),
		description: t("aboutMetaDesc"),
		alternates: {
			canonical: `/${locale}/about-us`,
			languages: {
				...alternates,
				"x-default": "/en/about-us",
			},
		},
	};
}

export default async function AboutUs() {
	const t = await getTranslations();

	return (
		<main className={styles.about}>
			<Container>
				<Breadcrumbs links={[{ label: t("aboutUsTitle") }]} />
				<AboutClient />
				<section className={styles["about-hero"]}>
					{/* <div style={{ width: "50%" }}> */}
					<h1 className={styles["about-us__title"]}>
						<WordLine text={t("aboutUs.title")} />
					</h1>
					<div>
						<p>
							<WordLine text={t("aboutUs.desc1")} />
						</p>
						<br />
						<p>
							<WordLine text={t("aboutUs.desc2")} />
						</p>
						<br />
						<p>
							<WordLine text={t("aboutUs.desc3")} />
						</p>
					</div>
					{/* </div> */}
					{/* <div style={{ display: "flex", justifyContent: "center" }}>
						<Image
							src={photo.src}
							width={400}
							height={400}
							alt="Author"
						></Image>
					</div> */}
				</section>
				<ContactUs />
			</Container>
		</main>
	);
}
