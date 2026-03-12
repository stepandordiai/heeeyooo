import { getTranslations } from "next-intl/server";
import WordLine from "../../WordLine/WordLine";
import styles from "./Technologies.module.scss";

const technologies = [
	"Next.js",
	"React",
	"TypeScript",
	"Sass",
	"JavaScript",
	"Node.js",
	"CSS",
	"HTML",
	"express.js",
	"Python",
	"MongoDB",
	"Figma",
	"GitHub",
	"Git",
	"Bootstrap",
	"PostgreSQL",
];

const Technologies = async () => {
	const t = await getTranslations();

	return (
		<section className={styles.section}>
			<h2>
				<WordLine text={t("home.technologies")} />
			</h2>
			<ul className={styles.technologies}>
				{technologies.map((technology, index) => {
					return <li key={index}>{technology}</li>;
				})}
			</ul>
		</section>
	);
};

export default Technologies;
