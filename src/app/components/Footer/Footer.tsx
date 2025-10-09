"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../Container/Container";
import styles from "./Footer.module.scss";

const Footer = () => {
	const pathname = usePathname();

	const inactiveFooterLink = styles["footer__nav-link"];
	const activeFooterLink = `${styles["footer__nav-link"]} ${styles["footer__nav-link--active"]}`;

	return (
		<footer className={styles.footer}>
			<Container>
				<p style={{ fontSize: "3rem" }}>heeeyooo studio</p>
				<div className={styles["footer-top"]}>
					<div className={styles["footer__nav"]}>
						<p>Sitemap</p>
						<Link
							className={
								pathname === "/" ? activeFooterLink : inactiveFooterLink
							}
							href="/"
						>
							Home
						</Link>
						<Link
							className={
								pathname === "/about" ? activeFooterLink : inactiveFooterLink
							}
							href="/about"
						>
							About
						</Link>
						<Link
							className={
								pathname === "/work" ? activeFooterLink : inactiveFooterLink
							}
							href="/work"
						>
							Work
						</Link>
						<Link
							className={
								pathname === "/contacts" ? activeFooterLink : inactiveFooterLink
							}
							href="/contacts"
						>
							Contacts
						</Link>
					</div>
				</div>
				<div className="footer-bottom">
					<p>&copy; 2025 heeeyooo studio</p>
					<p>All rights reserved</p>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
