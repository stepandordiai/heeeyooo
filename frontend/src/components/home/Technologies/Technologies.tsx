import { getTranslations } from "next-intl/server";
import WordLine from "@/components/WordLine/WordLine";
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
	"C#",
];

const Technologies = async () => {
	const t = await getTranslations("technologies");

	return (
		<section>
			<h2>
				<WordLine text={t("title")} />
			</h2>
			<p>
				<WordLine text={t("desc")} />
			</p>
			<ul className={styles.technologies}>
				{technologies.map((technology, index) => {
					return <li key={index}>{technology}</li>;
				})}
			</ul>
		</section>
	);
};

export default Technologies;
