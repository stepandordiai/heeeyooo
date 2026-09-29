import WordLine from "@/components/WordLine/WordLine";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import styles from "./styles.module.scss";

export default async function Hero() {
	const t = await getTranslations();

	return (
		<section className={styles["home-hero"]} aria-labelledby="hero-heading">
			<h1 id="hero-heading" className={styles["home__title"]}>
				<WordLine text={t("hero.heading")} />
			</h1>
			<p className={styles["home__desc"]}>
				<WordLine text={t("hero.description")} />
			</p>
			<div className={styles["hero__btn-container"]}>
				<Link className={styles["hero__secondary-btn"]} href="/work">
					{t("hero.exploreWork")}
				</Link>
				<Link className={styles["hero__primary-btn"]} href="/contact">
					{t("hero.contactUs")}
				</Link>
			</div>
		</section>
	);
}
