const appendLeadingZero = (num: number) => {
	const str = num.toString();
	if (str.length > 1) {
		return str;
	} else {
		return "0" + str;
	}
};

export default appendLeadingZero;
