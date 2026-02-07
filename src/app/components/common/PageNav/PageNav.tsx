import styles from "./Breadcrumbs.module.scss";
import { Link } from "@/i18n/navigation";

type BreadcrumbsProps = {
	pageName: string;
	projectName?: string;
};

const Breadcrumbs = ({ pageName, projectName }: BreadcrumbsProps) => {
	return (
		<nav className="breadcrumbs" style={{ marginBottom: 20 }}>
			<Link className={styles["breadcrumbs__link"]} href="/">
				Home
			</Link>{" "}
			&bull;{" "}
			{projectName ? (
				<Link className={styles["breadcrumbs__link"]} href="/work">
					{pageName}
				</Link>
			) : (
				<span style={{ color: "hsl(0, 0%, 50%)" }}>{pageName}</span>
			)}
			{projectName && (
				<>
					{" "}
					&bull; <span style={{ color: "hsl(0, 0%, 50%)" }}>{projectName}</span>
				</>
			)}
		</nav>
	);
};

export default Breadcrumbs;
