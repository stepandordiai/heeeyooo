"use client";

import { useEffect, useState } from "react";
import workData from "./../../data/work-data.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoImg from "./../../../../public/heeeyooo-studio-logo-white-v1.svg";
import styles from "./Header.module.scss";

const Header = () => {
	// TODO:
	const pathname = usePathname();

	const [isMenuActive, setIsMenuActive] = useState(false);

	useEffect(() => {
		setIsMenuActive(false);
	}, [pathname]);

	useEffect(() => {
		const closeMenuOnEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMenuActive(false);
			}
		};

		document.addEventListener("keydown", closeMenuOnEsc);

		return () => {
			document.removeEventListener("keydown", closeMenuOnEsc);
		};
	}, []);

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

	function toggleBurgerBtn() {
		setIsMenuActive((prev) => !prev);
	}

	const inactiveLink = styles["header__nav-link"];
	const activeLink = `${styles["header__nav-link"]} ${styles["header__nav-link--active"]}`;

	const inactiveMenuLink = isMenuActive
		? `${styles["menu__nav-link"]} ${styles["menu__nav-link--show"]}`
		: `${styles["menu__nav-link"]}`;
	const activeMenuLink = isMenuActive
		? `${styles["menu__nav-link"]} ${styles["menu__nav-link--active"]} ${styles["menu__nav-link--show"]}`
		: `${styles["menu__nav-link"]} ${styles["menu__nav-link--active"]}`;

	return (
		<header
			className={
				isMenuActive
					? `${styles.header} ${styles["header--active"]}`
					: styles.header
			}
		>
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
						href="/"
					>
						<span>Home</span>
					</Link>
					<Link
						className={pathname === "/about" ? activeLink : inactiveLink}
						href="/about"
					>
						About
					</Link>
					<Link
						className={pathname === "/work" ? activeLink : inactiveLink}
						href="/work"
					>
						<span>Work</span>
						<span className={styles["header__work-qty"]}>
							{workData.length}
						</span>
					</Link>
					<Link
						className={pathname === "/contacts" ? activeLink : inactiveLink}
						href="/contacts"
					>
						Contacts
					</Link>
				</nav>
				<div
					onClick={toggleBurgerBtn}
					className={styles["burger-btn__container"]}
				>
					<div
						className={
							isMenuActive
								? `${styles["burger-btn"]} ${styles["burger-btn--active"]}`
								: styles["burger-btn"]
						}
					></div>
				</div>
			</div>
			<div
				className={
					isMenuActive
						? `${styles["menu"]} ${styles["menu--active"]}`
						: styles["menu"]
				}
			>
				<nav className={styles["menu__nav"]}>
					<div className={styles["menu__nav-item"]}>
						<Link
							onClick={() => setIsMenuActive(false)}
							className={pathname === "/" ? activeMenuLink : inactiveMenuLink}
							href="/"
						>
							Home
						</Link>
					</div>
					<div className={styles["menu__nav-item"]}>
						<Link
							onClick={() => setIsMenuActive(false)}
							className={
								pathname === "/about" ? activeMenuLink : inactiveMenuLink
							}
							href="/about"
						>
							About
						</Link>
					</div>
					<div className={styles["menu__nav-item"]}>
						<Link
							onClick={() => setIsMenuActive(false)}
							className={
								pathname === "work" ? activeMenuLink : inactiveMenuLink
							}
							href="/work"
						>
							<span>Work</span>
							<span className="work-qty">{workData.length}</span>
						</Link>
					</div>
					<div className={styles["menu__nav-item"]}>
						<Link
							onClick={() => setIsMenuActive(false)}
							className={
								pathname === "/contacts" ? activeMenuLink : inactiveMenuLink
							}
							href="/contacts"
						>
							Contacts
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
