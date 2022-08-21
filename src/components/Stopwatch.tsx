import React, { useEffect, useState } from "react";
import formatTime from "../lib/formatTime";
import "./Watch.css";
interface Props {
	time: number;
	mode: "work" | "rest" | "idle";
	setTime: React.Dispatch<React.SetStateAction<number>>;
	setMode: React.Dispatch<React.SetStateAction<"work" | "rest">>;
}

const Stopwatch = (props: Props) => {
	const [formattedTime, setFormattedTime] = useState({
		hours: "0",
		minutes: "0",
		seconds: "0",
	});
	const [timerState, setTimerState] = useState<
		"initial" | "running" | "paused"
	>("initial");

	useEffect(() => {
		props.setTime(() => 0);
	}, []);

	useEffect(() => {
		let interval: any;

		if (timerState === "running") {
			interval = setInterval(() => {
				console.log(props.mode);
				props.setTime((curr) => curr + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [props.time, timerState]);

	useEffect(() => {
		const { hours, minutes, seconds } = formatTime(props.time);

		setFormattedTime({
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		});
	}, [props.time, props.setTime]);

	const handleStart = () => {
		setTimerState("running");
	};
	const handlePause = () => {
		setTimerState("paused");
	};
	const handleStop = () => {
		props.setMode(() => "rest");
	};

	return (
		<div className='stopwatch'>
			<h1 className='time'>
				{formattedTime.hours} : {formattedTime.minutes} :{" "}
				{formattedTime.seconds}
			</h1>
			<div className='buttons'>
				{timerState === "initial" && <a onClick={handleStart}>Start</a>}

				{timerState === "paused" && (
					<>
						<a onClick={handleStart}>Start</a>
						<a onClick={handleStop}>Stop</a>
					</>
				)}

				{timerState === "running" && (
					<>
						<a onClick={handlePause}>Pause</a>
						<a onClick={handleStop}>Stop</a>
					</>
				)}
			</div>
		</div>
	);
};

export default Stopwatch;
