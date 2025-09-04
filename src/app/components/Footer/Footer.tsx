"use client";
// import { useTranslation } from "react-i18next";
// import { NavLink } from "react-router-dom";
// import LngBtn from "../LngBtn/LngBtn";
// import { useParams } from "react-router-dom";
import Link from "next/link";
import styles from "./Footer.module.scss";
import { usePathname } from "next/navigation";

const Footer = () => {
	const pathname = usePathname();
	// const { t } = useTranslation();

	// const { lng } = useParams();

	const inactiveFooterLink = styles["footer__nav-link"];
	const activeFooterLink = `${styles["footer__nav-link"]} ${styles["footer__nav-link--active"]}`;

	return (
		<footer className={styles.footer}>
			<p style={{ fontSize: "3rem" }}>heeeyooo studio</p>
			<div className={styles["footer-top"]}>
				<div className={styles["footer__nav"]}>
					<p>Sitemap</p>
					<Link
						className={pathname === "/" ? activeFooterLink : inactiveFooterLink}
						href={`/`}
					>
						{/* {t("home_title")} */}
						Home
					</Link>
					<Link
						className={
							pathname === "/about" ? activeFooterLink : inactiveFooterLink
						}
						href={`/about`}
					>
						{/* {t("about_title")} */}
						About
					</Link>
					<Link
						className={
							pathname === "/work" ? activeFooterLink : inactiveFooterLink
						}
						href={`/work`}
					>
						{/* {t("work_title")} */}
						Work
					</Link>
					<Link
						className={
							pathname === "/contacts" ? activeFooterLink : inactiveFooterLink
						}
						href={`/contacts`}
					>
						{/* {t("contacts_title")} */}
						Contacts
					</Link>
				</div>
			</div>
			{/* <LngBtn /> */}
			<div className="footer-bottom">
				<p>&copy; 2025 heeeyooo studio</p>
				<p>All rights reserved</p>
			</div>
		</footer>
	);
};

export default Footer;
