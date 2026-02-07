import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { fetchWork } from "../lib/api";
import Container from "../components/Container/Container";
import WordLine from "../components/WordLine/WordLine";
import Services from "../components/home/Services/Services";
import Technologies from "../components/home/Technologies/Technologies";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import styles from "./Home.module.scss";

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations();

	return {
		title: t("homeMetaTitle"),
		description: t("homeMetaDesc"),
	};
}

export default async function Home() {
	const t = await getTranslations();
	const work = await fetchWork();

	return (
		<main className={styles.home}>
			<Container>
				<div className={styles["home-inner"]}>
					<section className={styles["home-hero"]}>
						{/* <div className={styles["construction"]}>
							<WordLine text="Website under construction" />
						</div> */}
						<h1 className={styles["home__title"]}>
							<WordLine text={t("home.heroTitle")} />
						</h1>
						<p className={styles["home__desc"]}>
							<WordLine text={t("home.heroSecTitle")} />
						</p>
						<a
							className={styles["home-hero__link"]}
							href="mailto:stepandordiai@gmail.com"
						>
							stepandordiai@gmail.com
						</a>
					</section>
					<div>
						<h2 className={styles["featured-work__title"]}>
							<WordLine text={t("home.featuredWork")} />
						</h2>
						<div style={{ marginTop: 20, marginBottom: 20 }}>
							<WordLine text={t("home.featuredWorkDesc")} />
						</div>
						<div className={styles["home__works"]}>
							{work
								.filter((project) => project.isFeatured)
								.map((project) => (
									<ProjectCard key={project.id} project={project} />
								))}
						</div>
					</div>
					<Services />
					<Technologies />
					{/* <h2>Our process</h2>
				<p>Efficient, Transparent, and Custom-Tailored</p>
				<p>
					We follow a streamlined process to ensure your app is developed
					efficiently and meets the highest standards.
				</p>
				<div>
					<div>
						<p>1</p>
						<p>Consultation</p>
						<p>
							We begin by understanding your business needs and goals for your
							app.
						</p>
					</div>
					<div>
						<p>2</p>
						<p>Design</p>
						<p>
							Our team designs a user-friendly interface that offers an engaging
							experience on all devices.
						</p>
					</div>
					<div>
						<p>3</p>
						<p>Development</p>
						<p>
							We build your app using cutting-edge technologies for optimal
							performance across all browsers and devices.
						</p>
					</div>
					<div>
						<p>4</p>
						<p>Launch</p>
						<p>
							We successfully launch your app and provide ongoing support to
							ensure long-term success.
						</p>
					</div>
				</div> */}
				</div>
			</Container>
		</main>
	);
}
