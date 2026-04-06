import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Container from "@/components/Container/Container";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import AboutClient from "./AboutUsClient";
import WordLine from "@/components/WordLine/WordLine";
import ContactUs from "@/components/ContactUs/ContactUs";
import styles from "./AboutUs.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const page = "about-us";
	const languages = Object.fromEntries(
		routing.locales.map((l) => [l, `/${l}/${page}`]),
	);

	return {
		title: t("aboutUsTitle"),
		description: t("aboutMetaDesc"),
		alternates: {
			canonical: `/${locale}/${page}`,
			languages: {
				...languages,
				"x-default": `/${routing.defaultLocale}/${page}`,
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
