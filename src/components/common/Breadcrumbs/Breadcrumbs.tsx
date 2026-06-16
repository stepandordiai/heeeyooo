import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Fragment } from "react";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import styles from "./Breadcrumbs.module.scss";

type BreadcrumbsProps = {
	links: {
		label: string;
		path?: string;
	}[];
};

const Breadcrumbs = async ({ links }: BreadcrumbsProps) => {
	const t = await getTranslations();

	return (
		<nav className={styles["breadcrumbs"]}>
			<Link className={styles["breadcrumbs__link"]} href="/">
				{t("homeTitle")}
			</Link>
			<ChevronRightIcon />
			{links.map((link, i) => {
				const isLastLink = i === links.length - 1;
				return link.path && !isLastLink ? (
					<Fragment key={i}>
						<Link className={styles["breadcrumbs__link"]} href={link.path}>
							{link.label}
						</Link>
						<ChevronRightIcon />
					</Fragment>
				) : (
					<span key={i} style={{ color: "hsl(0, 0%, 50%)" }}>
						{link.label}
					</span>
				);
			})}
		</nav>
	);
};

export default Breadcrumbs;
