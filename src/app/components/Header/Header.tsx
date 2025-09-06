"use client";
import { useEffect, useRef } from "react";
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

	const burgerBtn = useRef<HTMLDivElement>(null);
	const header = useRef<HTMLElement>(null);
	const burgerMenu = useRef<HTMLDivElement>(null);

	function toggleBurgerBtn() {
		if (burgerBtn.current?.classList.contains(styles["burger-btn--active"])) {
			header.current?.classList.remove(styles["header--active"]);
			burgerMenu.current?.classList.remove(styles["burger-menu--active"]);
			burgerBtn.current?.classList.remove(styles["burger-btn--active"]);
		} else {
			header.current?.classList.add(styles["header--active"]);
			burgerMenu.current?.classList.add(styles["burger-menu--active"]);
			burgerBtn.current?.classList.add(styles["burger-btn--active"]);
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", () => {
			burgerBtn.current?.classList.remove(styles["burger-btn--active"]);
			header.current?.classList.remove(styles["header--active"]);
			burgerMenu.current?.classList.remove(styles["burger-menu--active"]);
		});

		document
			.querySelectorAll(`.${styles["burger-menu__nav-link"]}`)
			.forEach((link) => {
				link.addEventListener("click", () => {
					burgerBtn.current?.classList.remove(styles["burger-btn--active"]);
					header.current?.classList.remove(styles["header--active"]);
					burgerMenu.current?.classList.remove(styles["burger-menu--active"]);
				});
			});
	}, []);

	const inactiveMenuLink = styles["burger-menu__nav-link"];
	const activeMenuLink = `${styles["burger-menu__nav-link"]} ${styles["burger-menu__nav-link--active"]}`;

	return (
		<header ref={header} className={styles.header}>
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
					<div ref={burgerBtn} className={styles["burger-btn"]}></div>
				</div>
			</div>
			<div ref={burgerMenu} className={styles["burger-menu"]}>
				<nav className={styles["burger-menu__nav"]}>
					<div className={styles["burger-menu__nav-item"]}>
						<Link
							className={pathname === "/" ? activeMenuLink : inactiveMenuLink}
							href="/"
						>
							Home
						</Link>
					</div>
					<div className={styles["burger-menu__nav-item"]}>
						<Link
							className={
								pathname === "/about" ? activeMenuLink : inactiveMenuLink
							}
							href="/about"
						>
							About
						</Link>
					</div>
					<div className={styles["burger-menu__nav-item"]}>
						<Link
							className={
								pathname === "work" ? activeMenuLink : inactiveMenuLink
							}
							href="/work"
						>
							<span>Work</span>
							<span className="work-qty">{workData.length}</span>
						</Link>
					</div>
					<div className={styles["burger-menu__nav-item"]}>
						<Link
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
