import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import servicesData from "./../../data/services-data.json";
import Container from "@/app/components/Container/Container";
import PageNav from "@/app/components/PageNav/PageNav";
import styles from "./Contact.module.scss";

export const metadata: Metadata = {
	title: "Contact | heeeyooo studio",
	description:
		"Get in touch with heeeyooo studio — a creative team passionate about design, web, and branding. Let’s bring your ideas to life. Contact us today!",
	alternates: {
		canonical: "https://www.heeeyooo.studio/contact",
	},
};

export default async function Contact() {
	const t = await getTranslations();

	return (
		<main className={styles.contact}>
			<Container>
				<PageNav pageName="Contact" />
				<div className={styles["contact__inner"]}>
					<div className={styles["contact__container"]}>
						<a
							className={styles["contact__email"]}
							href="mailto:stepandordiai@gmail.com"
						>
							<p className={styles["contact__details-title"]}>Say hello</p>
							<i className="fa-solid fa-envelope"></i>
						</a>
						<a
							href="https://www.instagram.com/heeeyooo.studio/"
							target="_blank"
							className={styles["contact__details"]}
						>
							<p className={styles["contact__details-title"]}>
								Follow us on Instagram
							</p>
							<i className="fa-brands fa-instagram"></i>
						</a>
					</div>
					<div className={styles["contact__form-details"]}>
						<p className={styles["contact__form-details-title"]}>
							Tell us more about yourself and what you&apos;ve got in mind.
						</p>
						<form
							className={styles["contact__form"]}
							action="https://formspree.io/f/xovddpld"
							method="post"
						>
							<div>
								<label htmlFor="fullName">Full name</label>
								<input
									className={styles["input"]}
									type="text"
									name="fullName"
									id="fullName"
								/>
							</div>
							<div>
								<label htmlFor="email">E-mail</label>
								<input
									className={styles["input"]}
									type="email"
									name="email"
									id="email"
								/>
							</div>
							<div>
								<label htmlFor="message">
									Tell us a little about the project...
								</label>
								<textarea
									className={styles["textarea"]}
									name="message"
									id="message"
									rows={3}
								></textarea>
							</div>
							<div>
								<p style={{ marginBottom: 5 }}>How can we help?</p>
								<div className={styles["check-container"]}>
									{servicesData.map((service) => {
										return (
											<label
												key={service.id}
												className={styles["checkbox-label"]}
											>
												<input
													className={styles["checkbox"]}
													type="checkbox"
													name="howCanWeHelp"
													value={service.title}
												/>
												{t(service.title)}
											</label>
										);
									})}
								</div>
							</div>
							<div style={{ alignSelf: "flex-end" }}>
								<input
									className={styles["input-reset"]}
									type="reset"
									value="Reset"
								/>
								<button className={styles["contact__form-btn"]} type="submit">
									Let&apos;s get started!
								</button>
							</div>
						</form>
						<div style={{ marginTop: 10 }}>
							<p>Don&apos;t like forms? Write us a message instead!</p>
							<a
								href="mailto:stepandordiai@gmail.com"
								style={{ color: "#000" }}
							>
								stepandordiai@gmail.com
							</a>
						</div>
					</div>
				</div>
			</Container>
		</main>
	);
}
