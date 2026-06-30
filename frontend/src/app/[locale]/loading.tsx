import Image from "next/image";

const Loading = () => {
	return (
		<div
			style={{
				height: "100svh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Image
				src="/heeeyooo-studio-logo-white-v1.svg"
				width={100}
				height={100}
				alt="heeeyooo studio logo"
			/>
		</div>
	);
};

export default Loading;
