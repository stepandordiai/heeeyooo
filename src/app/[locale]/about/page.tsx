import type { Metadata } from "next";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import Image from "next/image";
import photo from "./../../../../public/photo.jpg";
import styles from "./About.module.scss";
import AboutClient from "./AboutClient";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
	title: "About | heeeyooo studio",
	description:
		"heeeyooo studio is a creative team crafting bold design, branding, and web experiences that connect with people and make brands shine.",
	alternates: {
		canonical: "https://www.heeeyooo.studio/about",
	},
};

export default async function About() {
	const t = await getTranslations();

	return (
		<main className={styles.about}>
			<Container>
				<Breadcrumbs links={[{ label: t("aboutTitle") }]} />
				<AboutClient />
				<div className={styles["about__container"]}>
					<p>
						The Studio was founded with the ambition to craft Visual
						Personalities and Digital Experiences. The Studio is led by me,
						Frederik Kau. It embodies my dedication to creating work that
						combines strategy and aesthetics in a cohesive experience. Each
						project is a chance to combine visual and digital aspects of design
						to create designs that matter. Scroll to Explore my process and
						approach to projects. Together, we can explore how to bring your
						project to life.
					</p>
					<div style={{ display: "flex", justifyContent: "center" }}>
						<Image
							src={photo.src}
							width={400}
							height={400}
							alt="Author"
						></Image>
					</div>
				</div>
			</Container>
		</main>
	);
}
