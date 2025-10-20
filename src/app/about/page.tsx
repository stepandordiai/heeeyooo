import type { Metadata } from "next";
import Container from "../components/Container/Container";
import PageNav from "../components/PageNav/PageNav";
import styles from "./About.module.scss";

export const metadata: Metadata = {
	title: "About • heeeyooo studio",
	description:
		"heeeyooo studio is a creative team crafting bold design, branding, and web experiences that connect with people and make brands shine.",
	alternates: {
		canonical: "https://www.heeeyooo.studio/about",
	},
};

const About = () => {
	return (
		<main className={styles.about}>
			<Container>
				<PageNav pageName="About" />
				<p>Page under construction</p>
			</Container>
		</main>
	);
};

export default About;
