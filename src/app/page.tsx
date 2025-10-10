import type { Metadata } from "next";
import WordLine from "./components/WordLine/WordLine";
import Link from "next/link";
import Services from "./components/Services/Services";
import Technologies from "./components/Technologies/Technologies";
import Container from "./components/Container/Container";
import Image from "next/image";
import { Project } from "./interfaces/Project";
import styles from "./page.module.scss";

export const metadata: Metadata = {
	title: "Creative web design & development agency • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/",
	},
};

// TODO:
const Home = async () => {
	const url = "https://api.jsonsilo.com/7e780e1a-7722-49d8-8a68-c1c31e75cf74";
	const headers = {
		"X-SILO-KEY": "crj7ApdJAqcBXnnuSVNoBIBi8VrjBIRImNwtyJPtdk",
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
								.map((project) => {
									return (
										<Link
											data-cursor-text="See more"
											key={project.id}
											className={styles["home__work"]}
											href={`/work/${project.id}`}
										>
											<div className={styles["home__work-img-wrapper"]}>
												<Image
													className={styles["home__work-img"]}
													src={project.img[0]}
													width={2560}
													height={2560}
													alt={project.name}
												/>
											</div>
											<div className={styles["home__work-details"]}>
												<p className={styles["home__work-name"]}>
													{project.name}
												</p>
												<p className={styles["home__work-date"]}>
													{project.date}
												</p>
											</div>
										</Link>
									);
								})}
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
