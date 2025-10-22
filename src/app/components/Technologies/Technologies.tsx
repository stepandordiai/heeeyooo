import styles from "./Technologies.module.scss";

const Technologies = () => {
	const technologiesData = [
		{ name: "Next.js", fontClr: "#ffffff", bgClr: "#ffffff33" },
		{ name: "React.js", fontClr: "#61dbfb", bgClr: "#61dcfb33" },
		{ name: "TypeScript", fontClr: "#007acc", bgClr: "#007acc33" },
		{ name: "Sass", fontClr: "#cc6699", bgClr: "#cc669933" },
		{ name: "JavaScript", fontClr: "#f0db4f", bgClr: "#f0db4f33" },
		{ name: "Node.js", fontClr: "#3c873a", bgClr: "#3c873a33" },
		{ name: "CSS", fontClr: "#2965f1", bgClr: "#2965f133" },
		{ name: "HTML", fontClr: "#e34c26", bgClr: "#e34c2633" },
		{ name: "express.js", fontClr: "#ffffff", bgClr: "#ffffff33" },
		{ name: "Python", fontClr: "#ffd43b", bgClr: "#ffd43b33" },
		{ name: "MongoDB", fontClr: "#4db33d", bgClr: "#4db33d33" },
		{ name: "Figma", fontClr: "#ff7262", bgClr: "#ff726233" },
		{ name: "GitHub", fontClr: "#9cdaf1", bgClr: "#9cdaf133" },
		{ name: "Git", fontClr: "#f1502f", bgClr: "#f1502f33" },
		{ name: "Bootstrap", fontClr: "#563d7c", bgClr: "#563d7c33" },
	];

	return (
		<div>
			<h2 style={{ textAlign: "center" }}>Technologies</h2>
			<div className={styles.technologies}>
				{technologiesData.map((technology, index) => {
					return (
						<p
							key={index}
							style={{
								color: technology.fontClr,
								backgroundColor: technology.bgClr,
							}}
						>
							{technology.name}
						</p>
					);
				})}
			</div>
		</div>
	);
};

export default Technologies;
