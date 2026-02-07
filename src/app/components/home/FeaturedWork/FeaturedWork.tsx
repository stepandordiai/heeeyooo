import { getTranslations } from "next-intl/server";
import { fetchWork } from "@/app/lib/api";
import ProjectCard from "../../ProjectCard/ProjectCard";
import WordLine from "../../WordLine/WordLine";
import styles from "./FeaturedWork.module.scss";

const FeaturedWork = async () => {
	const t = await getTranslations();
	const work = await fetchWork();

	return (
		<section>
			<h2>
				<WordLine text={t("home.featuredWork")} />
			</h2>
			<div style={{ marginTop: 20, marginBottom: 20 }}>
				<WordLine text={t("home.featuredWorkDesc")} />
			</div>
			<div className={styles["featured-work__grid"]}>
				{work
					.filter((project) => project.isFeatured)
					.map((project) => (
						<ProjectCard key={project.id} project={project} />
					))}
			</div>
		</section>
	);
};

export default FeaturedWork;
