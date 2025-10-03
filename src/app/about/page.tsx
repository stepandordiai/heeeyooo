import type { Metadata } from "next";
import Link from "next/link";
import Container from "../components/Container/Container";
import styles from "./About.module.scss";

export const metadata: Metadata = {
	title: "About • heeeyooo studio",
	alternates: {
		canonical: "https://www.heeeyooo.studio/about",
	},
};

const About = () => {
	return (
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
	);
};

export default About;
