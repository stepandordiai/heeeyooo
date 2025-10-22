"use client";

import { usePathname } from "next/navigation";
import linksData from "./../../data/links-data.json";
import Container from "../Container/Container";
import Link from "next/link";
import styles from "./Footer.module.scss";

const Footer = () => {
	const pathname = usePathname();

	return (
		<footer className={styles.footer}>
			<Container>
				<p style={{ fontSize: "3rem" }}>heeeyooo studio</p>
				<div className={styles["footer-top"]}>
					<div className={styles["footer__nav"]}>
						<p>Sitemap</p>
						{linksData.map((link) => {
							return (
								<Link
									key={link.id}
									className={`${styles["footer__nav-link"]} ${
										pathname === link.path
											? styles["footer__nav-link--active"]
											: ""
									}`}
									href={link.path}
								>
									{link.name}
								</Link>
							);
						})}
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
