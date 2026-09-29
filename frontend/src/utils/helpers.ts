// TODO: learn this
export const getMonthYear = (date: string, locale: string) => {
	return new Date(date).toLocaleDateString(locale, {
		month: "long",
		year: "numeric",
	});
};
