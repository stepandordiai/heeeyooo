// TODO: word "type" specifies that i only import type not an object
import type { Metadata } from "next";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CustomCursor from "../components/CustomCursor/CustomCursor";
import { Chakra_Petch } from "next/font/google";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getWorkData } from "../lib/api";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "@/app/scss/globals.scss";

const chakraPetch = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal"],
	variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
	title: "Creative web design & development agency | heeeyooo studio",
	description:
		"heeeyooo studio is a creative studio crafting bold branding, design, and web experiences that make brands shine.",
};

type LayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function RootLayout({
	children,
	params,
}: Readonly<LayoutProps>) {
	const workData = await getWorkData();
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} className={chakraPetch.className}>
			<body>
				<NextIntlClientProvider>
					<Header workDataLength={workData.length} />
					{children}
					<CustomCursor />
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
