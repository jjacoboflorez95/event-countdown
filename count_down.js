"use strict";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

$(document).ready(() => {
	$("#countdown").click(() => {
		const eventName = $("#event").val();
		const eventDate = $("#date").val();
		const messageLbl = $("#message");

		// make sure user entered task and event date
		if (eventName.length == 0 || eventDate.length == 0) {
			messageLbl.text("Please enter both a name and a date.");
			return;
		}

		// make sure event date string has two slashes
		const dateParts = eventDate.split("/");
		if (dateParts.length != 3) {
			messageLbl.text("Please enter the date in MM/DD/YYYY format.");
			return;
		}

		// Variables for month and day validation
		const monthEventDate = dateParts[0];
		const dayEventDate = dateParts[1];
		const yearEventDate = dateParts[2];
		// Validates if month value is between 1 and 12.
		if (isNaN(monthEventDate) || monthEventDate < 1 || monthEventDate > 12) {
			messageLbl.text(
				"Please enter a valid month. Value should be a number between 1 and 12."
			);
			return;
		}
		// Stores the last day of the month.
		const lastDayOfMonth = new Date(yearEventDate, monthEventDate, 0).getDate();
		// Validates if the day is between 1 and the last day of the month.
		if (
			isNaN(dayEventDate) ||
			dayEventDate < 1 ||
			dayEventDate > lastDayOfMonth
		) {
			messageLbl.text(
				"Please enter a valid day. Value should be a number between 1 and " +
					lastDayOfMonth +
					"."
			);
			return;
		}

		// make sure event date string has a 4-digit year
		const year = eventDate.substring(eventDate.length - 4);
		if (isNaN(year)) {
			messageLbl.text("Please enter the date in MM/DD/YYYY format.");
			return;
		}
		// convert event date string to Date object and check for validity
		let date = new Date(eventDate);
		if (date == "Invalid Date") {
			messageLbl.text("Please enter the date in MM/DD/YYYY format.");
			return;
		}

		// capitalize each word of event name
		let formattedName = "";
		const words = eventName.split(" ");
		for (const i in words) {
			const firstLetter = words[i].substring(0, 1).toUpperCase();
			const word = firstLetter + words[i].substring(1).toLowerCase();
			formattedName += word.padEnd(word.length + 1);
		}
		formattedName = formattedName.trimEnd();

		// calculate days
		const today = new Date();
		const msFromToday = date.getTime() - today.getTime();
		const msForOneDay = 24 * 60 * 60 * 1000; // hrs * mins * secs * milliseconds
		let daysToDate = Math.ceil(msFromToday / msForOneDay);

		// create and display message
		let msg = "";
		date = date.toDateString();
		if (daysToDate == 0) {
			msg = `Hooray! Today is ${formattedName}! (${date})`;
		} else if (daysToDate > 0) {
			msg = `${daysToDate} day(s) until ${formattedName}! (${date})`;
		} else if (daysToDate < 0) {
			daysToDate = Math.abs(daysToDate);
			msg = `${formattedName} happened ${daysToDate} day(s) ago. 
                  (${date})`;
		}
		messageLbl.text(msg);
	});

	$("#event").focus();
});
