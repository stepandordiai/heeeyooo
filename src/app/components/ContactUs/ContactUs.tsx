import styles from "./ContactUs.module.scss";

const ContactUs = () => {
	return (
		<div className={styles["contact-us"]}>
			<p className={styles["contact-us__title"]}>
				Let&apos;s create something awesome together!
			</p>
			<a
				className={styles["underline-link"]}
				href="mailto:stepandordiai@gmail.com"
			>
				hello@heeeyooo.studio
			</a>
		</div>
	);
};

export default ContactUs;
