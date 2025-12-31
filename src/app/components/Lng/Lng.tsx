"use client";

import { useRef } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation"; // Використовуйте ваш файл routing
import classNames from "classnames";
import styles from "./Lng.module.scss";

// Дані можна тримати тут або в окремому файлі config
const lngData = [
	{ code: "en", name: "EN" },
	{ code: "uk", name: "UA" },
];

const Lng = () => {
	const locale = useLocale(); // Отримуємо поточну мову (uk або en)
	const router = useRouter();
	const pathname = usePathname();
	const lngSelectRef = useRef<HTMLDivElement | null>(null);

	const handleLanguageChange = (newLocale: string) => {
		// next-intl сама оновить URL, зберігши поточний шлях
		// Наприклад: /uk/about -> /en/about
		router.replace(pathname, { locale: newLocale });
	};

	return (
		<div ref={lngSelectRef} className={styles.lng}>
			{lngData.map((lng) => (
				<button
					key={lng.code}
					onClick={() => handleLanguageChange(lng.code)}
					className={classNames(styles["lng-btn"], {
						[styles["lng-btn--active"]]: locale === lng.code,
					})}
				>
					<span>{lng.name}</span>
				</button>
			))}
		</div>
	);
};

export default Lng;
