import { Edupage } from "edupage-api";
import ora from "ora";

const spinner = ora("Logging in to EduPage").start();

if(!process.env.EDUPAGE_USERNAME || !process.env.EDUPAGE_PASSWORD) {
	spinner.fail("Please set the EDUPAGE_USERNAME and EDUPAGE_PASSWORD environment variables.");
	process.exit(1);
}

const ep = new Edupage();
await ep.login(process.env.EDUPAGE_USERNAME, process.env.EDUPAGE_PASSWORD);

if(process.argv.length < 4) {
	spinner.fail("Please specify the last day and the subject short name.");
	console.error("Like this: bun run main.js 2023-09-01 GL");
	process.exit(1);
}

const lastDay = new Date(process.argv[2]);
const today = new Date();

// for every day from today to lastDay, starting with today and going back in time to lastDay
for(let date = today; date >= lastDay; date.setDate(date.getDate() - 1)) {
	spinner.text = "Getting timetable for " + date.toLocaleDateString(process.env.DATE_LOCALE) + "...";
	const timetable = await ep.getTimetableForDate(date);
	for(const lesson of timetable.lessons) {
		spinner.text = "Getting timetable for " + date.toLocaleDateString(process.env.DATE_LOCALE) + "... " + lesson.subject.short;
		spinner.stop();
		if(lesson.subject.short != process.argv[3]) {
			spinner.start();
			continue;
		}
		console.log(date.toLocaleDateString(process.env.DATE_LOCALE) + ": " + (lesson.curriculum ? lesson.curriculum : "-"));
		spinner.start();
	}
}

spinner.stop();
ep.exit();