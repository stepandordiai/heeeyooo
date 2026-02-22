import type { Metadata } from "next";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import photo from "./../../../../public/photo.jpg";
import AboutClient from "./AboutUsClient";
import { getTranslations } from "next-intl/server";
import styles from "./AboutUs.module.scss";
import WordLine from "@/app/components/WordLine/WordLine";

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
		en: `${baseUrl}/en/about-us`,
		uk: `${baseUrl}/uk/about-us`,
		cs: `${baseUrl}/cs/about-us`,
	};

	return {
		title: t("aboutUsTitle"),
		description: t("aboutMetaDesc"),
		alternates: {
			canonical: `${baseUrl}/${locale}/about-us`,
			languages: {
				...lngUrls,
				"x-default": `${baseUrl}/en/about-us`,
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
			</Container>
		</main>
	);
}
