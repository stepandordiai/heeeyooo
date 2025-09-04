const isTouchDevice = () => {
	// TODO:
	return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

export default isTouchDevice;
