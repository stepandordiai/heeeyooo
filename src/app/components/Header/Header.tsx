"use client";
import { useEffect } from "react";
import logoImg from "./../../../../public/heeeyooo-studio-logo-white-v1.svg";
import workData from "./../../data/work-data.json";
import styles from "./Header.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
	// TODO:
	const pathname = usePathname();

	useEffect(() => {
		let prevScroll = 0;
		function handleHeaderOnScroll() {
			const scroll = document.documentElement.scrollTop;
			const header =
				(document.querySelector(`.${styles.header}`) as HTMLHeadElement) ||
				null;
			if (scroll > prevScroll) {
				header?.classList.add(styles["header--hide"]);
			} else {
				header?.classList.remove(styles["header--hide"]);
			}
			prevScroll = scroll;
		}
		window.addEventListener("scroll", handleHeaderOnScroll);

		return () => {
			window.removeEventListener("scroll", handleHeaderOnScroll);
		};
	}, []);

	const inactiveLink = styles["header__nav-link"];
	const activeLink = `${styles["header__nav-link"]} ${styles["header__nav-link--active"]}`;

	return (
		<header className={styles.header}>
			<div className={styles["header__inner"]}>
				<Link className={styles["header__logo-link"]} href="">
					<img
						width={35}
						height={35}
						className={styles["header__logo-img"]}
						// need to specify src with Next.js
						src={logoImg.src}
						alt="heeeyooo studio Logo"
					/>
				</Link>
				<nav className={styles["header__nav"]}>
					<Link
						className={pathname === "/" ? activeLink : inactiveLink}
						href={`/`}
					>
						<span>Home</span>
					</Link>
					<Link
						className={pathname === "/about" ? activeLink : inactiveLink}
						href={`/about`}
					>
						About
					</Link>
					<Link
						className={pathname === "/work" ? activeLink : inactiveLink}
						href={`/work`}
					>
						<span>Work</span>
						<span className={styles["header__work-qty"]}>
							{workData.length}
						</span>
					</Link>
					<Link
						className={pathname === "/contacts" ? activeLink : inactiveLink}
						href={`/contacts`}
					>
						Contacts
					</Link>
				</nav>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						columnGap: 10,
					}}
				>
					<div className={styles["header__lng-btn-wrapper"]}>
						{/* <LngBtn /> */}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
