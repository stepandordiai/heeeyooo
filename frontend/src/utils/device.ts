export const isHoverDevice = () => {
	if (typeof window === "undefined") return false;

	return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
};
