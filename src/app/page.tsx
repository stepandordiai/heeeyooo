import type { Metadata } from "next";
import WordLine from "./components/WordLine/WordLine";
import Services from "./components/Services/Services";
import Technologies from "./components/Technologies/Technologies";
import Container from "./components/Container/Container";
import { Project } from "./interfaces/Project";
import ProjectCard from "./components/ProjectCard/ProjectCard";
import styles from "./page.module.scss";

export const metadata: Metadata = {
	title: "Creative web design & development agency • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/",
	},
};

// TODO:
const Home = async () => {
	const url = process.env.API_URL!;
	const headers = {
		"X-SILO-KEY": process.env.API_KEY!,
		"Content-Type": "application/json",
	};

	// TODO:
	const response = await fetch(url, { headers });
	const workData: Project[] = await response.json();

	return (
		<main className={styles.home}>
			<Container>
				<div className={styles["home-inner"]}>
					<div className={styles["home-top"]}>
						<div className={styles["construction"]}>
							<WordLine text="Website under construction" />
						</div>
						<h1 className={styles["home__title"]}>
							<WordLine text="Creative web design & development agency" />
						</h1>
						<div
							className={styles["home__desc"]}
							style={{ color: "hsl(0,0%,50%)" }}
						>
							<WordLine text="We create modern websites, landing pages, and online stores that work fast, look great, and grow your business." />
						</div>
					</div>
					<div>
						<h2 className={styles["featured-work__title"]}>
							<WordLine text="Featured work" />
						</h2>
						<div style={{ marginTop: 20, marginBottom: 20 }}>
							<WordLine text="Explore our featured projects to see how we’ve helped businesses improve their online presence, boost engagement, and achieve their goals through innovative digital solutions. Some projects were built for clients, others for ourselves" />
						</div>
						<div className={styles["home__works"]}>
							{workData
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
};

export default Home;
