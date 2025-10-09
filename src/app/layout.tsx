// TODO: word "type" specifies that i only import type not an object
import type { Metadata } from "next";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import { Chakra_Petch } from "next/font/google";
import "./globals.scss";

const chakraPetch = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal"],
	variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
	title: "Creative web design & development agency • heeeyooo studio",
};

interface WorkData {
	id: string;
	name: string;
	desc?: string;
	date: string;
	img: string[];
	siteUrl: string;
	isFeatured?: boolean;
	palette?: { value: string; name: string }[];
	typo?: string;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// TODO:
	const url = "https://api.jsonsilo.com/7e780e1a-7722-49d8-8a68-c1c31e75cf74";
	const headers = {
		"X-SILO-KEY": "crj7ApdJAqcBXnnuSVNoBIBi8VrjBIRImNwtyJPtdk",
		"Content-Type": "application/json",
	};

	// TODO:
	const response = await fetch(url, { headers: headers });
	const workData: WorkData[] = await response.json();

	return (
		<html lang="en" className={chakraPetch.className}>
			<body>
				<Header workDataLength={workData.length} />
				{children}
				<CustomCursor />
				<Footer />
			</body>
		</html>
	);
}
