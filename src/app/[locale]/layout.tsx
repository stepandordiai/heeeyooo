import { Chakra_Petch } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { fetchWork } from "@/lib/api";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import "@/scss/globals.scss";

const chakraPetch = Chakra_Petch({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal"],
	variable: "--font-chakra-petch",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://www.heeeyooo.com"),
};

type LocaleLayoutProps = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
	children,
	params,
}: Readonly<LocaleLayoutProps>) {
	const work = await fetchWork();
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} className={chakraPetch.className}>
			<body>
				<NextIntlClientProvider locale={locale}>
					<Header workLength={work.length} />
					<CustomCursor />
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
