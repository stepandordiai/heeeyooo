const isTouchDevice = () => {
	// TODO:
	if (typeof window === "undefined") return false; // SSR guard
	return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export default isTouchDevice;
