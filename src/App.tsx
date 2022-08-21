import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Timer from "./components/Timer";
import Stopwatch from "./components/Stopwatch";
import "./App.css";

function App() {
	const [mode, setMode] = useState<"work" | "rest">("work");
	const [time, setTime] = useState<number>(0);

	return (
		<div className='container'>
			<h1>Flowtimer</h1>
			<main className='main'>
				<div className='modes'>
					<a
						href='#'
						onClick={() => setMode(() => "work")}
						className={mode === "work" ? "active" : ""}
					>
						Work
					</a>
					<a
						href='#'
						onClick={() => setMode(() => "rest")}
						className={mode === "rest" ? "active" : ""}
					>
						Rest
					</a>
				</div>
				<div>
					{mode === "work" && (
						<Stopwatch
							time={time}
							mode={mode}
							setTime={setTime}
							setMode={setMode}
						/>
					)}
					{mode === "rest" && (
						<Timer
							time={time}
							mode={mode}
							setTime={setTime}
							setMode={setMode}
						/>
					)}
				</div>
			</main>
		</div>
	);
}

export default App;
