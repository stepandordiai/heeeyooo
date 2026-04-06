import { getTranslations } from "next-intl/server";
import styles from "./ContactUs.module.scss";

const ContactUs = async () => {
	const t = await getTranslations();

	return (
		<section className={styles["contact-us"]}>
			<h3 className={styles["contact-us__title"]}>{t("contactUs.title")}</h3>
			<a
				className={styles["underline-link"]}
				href="mailto:stepandordiai@gmail.com"
			>
				hello@heeeyooo.studio
			</a>
		</section>
	);
};

export default ContactUs;
