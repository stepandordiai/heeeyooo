import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import servicesData from "./../../data/services-data.json";
import Container from "@/app/components/Container/Container";
import Breadcrumbs from "@/app/components/common/Breadcrumbs/Breadcrumbs";
import EnvelopeIcon from "@/app/icons/EnvelopeIcon";
import InstagramIcon from "@/app/icons/InstagramIcon";
import styles from "./Contact.module.scss";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	const t = await getTranslations({ locale });

	const locales = ["en", "uk", "cs"];
	const alternates = Object.fromEntries(
		locales.map((l) => [l, `/${l}/contact`]),
	);

	return {
		title: t("contactTitle"),
		description: t("contactMetaDesc"),
		alternates: {
			canonical: "/${locale}/contact",
			languages: {
				...alternates,
				"x-default": "/en/contact",
			},
		},
	};
}

export default async function Contact() {
	const t = await getTranslations();

	return (
		<main className={styles.contact}>
			<Container>
				<Breadcrumbs links={[{ label: t("contactTitle") }]} />
				<div className={styles["contact__inner"]}>
					<div className={styles["contact__container"]}>
						<a
							className={styles["contact__details"]}
							href="mailto:stepandordiai@gmail.com"
						>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignSelf: "flex-end",
								}}
							>
								<span className={styles["contact__details-title"]}>
									Say hello
								</span>
								<span>hello@heeeyooo.studio</span>
							</div>
							<EnvelopeIcon size={24} />
						</a>
						<a
							href="https://www.instagram.com/heeeyooo.studio/"
							target="_blank"
							className={styles["contact__details"]}
						>
							<span
								style={{ alignSelf: "flex-end" }}
								className={styles["contact__details-title"]}
							>
								Follow us on Instagram
							</span>
							<InstagramIcon size={24} />
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
									autoComplete="name"
									required
								/>
							</div>
							<div>
								<label htmlFor="email">E-mail</label>
								<input
									className={styles["input"]}
									type="email"
									name="email"
									id="email"
									autoComplete="email"
									required
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
								className={styles["form__link"]}
								href="mailto:stepandordiai@gmail.com"
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
