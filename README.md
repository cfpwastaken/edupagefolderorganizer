# EdupageFolderOrganizer

A simple javascript program to organize your school folders by helping you figure out dates for every piece of paper you have.

## How to use

1. Download bun [here](https://bun.sh)
2. Download this repo
3. Run `bun install` in the repo folder
4. Linux: Run `export EDUPAGE_USERNAME="..."; export EDUPAGE_PASSWORD="..."; bun run main.js <date> <subject short>` in the repo folder
   
	 Windows (CMD): Run `set EDUPAGE_USERNAME="..."; set EDUPAGE_PASSWORD="..."; bun run main.js <date> <subject short>` in the repo folder
	 
	 Windows (Powershell): Run `$env:EDUPAGE_USERNAME = "..."; $env:EDUPAGE_PASSWORD = "..."; bun run main.js <date> <subject short>` in the repo folder

## Example

I have a big folder with the earliest paper being from 2023-07-03 and a lot of non-dated papers. I want to find out when the non-dated papers are from.
The subject is "Math" and Edupage's timetable shows that subject as "M" (it's short name).

My command would be `bun run main.js 2023-07-03 M` (omitting the `export` or `set`/`$env:` if you're on Windows)

## Optional arguments/variables

- set the `DATE_LOCALE` environment variable to your locale (example for Germany: `de-DE`, defaults to your system's locale)

## How it works

The tool fetches all the date's timetables from Edupage and prints the curriculum for the given subject for each date.
Most schools force teachers to write something meaningful into the curriculum, which is related to the topic of the paper you wrote on that day.
