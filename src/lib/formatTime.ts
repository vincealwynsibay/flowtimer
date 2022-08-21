import appendLeadingZero from "./appendLeadingZero";

const formatTime = (num: number) => {
	const hours = Math.floor(num / 3600);
	const minutes = Math.floor((num - hours * 3600) / 60);
	const seconds = Math.floor(num - hours * 3600 - minutes * 60);

	return {
		hours: appendLeadingZero(hours),
		minutes: appendLeadingZero(minutes),
		seconds: appendLeadingZero(seconds),
	};
};

export default formatTime;
