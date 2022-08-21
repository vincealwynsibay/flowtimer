import React, { useEffect, useState } from "react";
import formatTime from "../lib/formatTime";
import "./Watch.css";

interface Props {
	time: number;
	setMode: React.Dispatch<React.SetStateAction<"work" | "rest">>;
	setTime: React.Dispatch<React.SetStateAction<number>>;
	mode: "work" | "rest";
}

const Timer = (props: Props) => {
	const [restTime, setRestTime] = useState(
		Math.floor(props.time / 5) > 300 ? Math.floor(props.time / 5) : 300
	);
	const [formattedRestTime, setFormattedRestTime] = useState(
		formatTime(restTime)
	);
	const [timerState, setTimerState] = useState<
		"initial" | "running" | "paused"
	>("initial");

	useEffect(() => {
		let interval: any;
		if (timerState === "running") {
			interval = setInterval(() => {
				if (restTime > 0) {
					setRestTime((curr) => curr - 1);
				} else {
					const greeting = new Notification("Flowtime", {
						body: "Time to Work!",
					});
					setTimeout(() => {
						greeting.close();
					}, 3000);
					props.setMode("work");
				}
			}, 1000);
			setFormattedRestTime(formatTime(restTime));
		}

		return () => clearInterval(interval);
	}, [restTime, timerState]);

	const handleStart = () => {
		setTimerState("running");
	};
	const handlePause = () => {
		setTimerState("paused");
	};

	const handleStop = () => {
		props.setTime(0);
		props.setMode("work");
	};

	return (
		<div className='timer'>
			<h1 className='time'>
				{" "}
				{formattedRestTime.hours} : {formattedRestTime.minutes} :{" "}
				{formattedRestTime.seconds}
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

export default Timer;
