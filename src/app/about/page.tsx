import Head from "next/head";
import Link from "next/link";
import styles from "./About.module.scss";
import Container from "../components/Container/Container";

const About = () => {
	return (
		<>
			<Head>
				<title>About | heeeyooo studio</title>
				<link rel="canonical" href="https://www.heeeyooo.studio/about" />
			</Head>
			<main className={styles.about}>
				<Container>
					<div style={{ marginBottom: 20 }}>
						<Link className={styles["page-nav__link"]} href="/">
							Home
						</Link>{" "}
						&bull; <span style={{ color: "hsl(0, 0%, 50%)" }}>About</span>
					</div>
					<p>Page under construction</p>
				</Container>
			</main>
		</>
	);
};

export default About;
