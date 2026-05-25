import { getTranslations } from "next-intl/server";
import WordLine from "../../WordLine/WordLine";
import ServicesClient from "./ServicesClient";
import styles from "./Services.module.scss";

export default async function Services() {
	const t = await getTranslations("services");

	return (
		<section className={styles.services}>
			<h2 className={styles["services__title"]}>
				<WordLine text={t("title")} />
			</h2>
			<p className={styles["services__desc"]}>
				<WordLine text={t("desc")} />
			</p>
			<ServicesClient />
		</section>
	);
}
