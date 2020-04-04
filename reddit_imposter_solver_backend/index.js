const express = require("express");
const app = express();
const fs = require("fs");
const readline = require("readline");

const imposter_options = [];
const human_options = [];
let current_options = ["","","","",""];
let current_choice = -1;

app.get('/clear', function (req, res) {
	console.log("cleanup");
	current_options = ["","","","",""];
	current_choice = -1;
	res.send("cleanup");
})

app.get('/read_options', function (req, res) {
	current_options[req.query.index] = req.query.value;
	console.log(`receive option ${req.query.index} == "${req.query.value}"`);
	if (human_options.includes(req.query.value))
		console.log("This is a known human option.");
	else if (imposter_options.includes(req.query.value))
		console.log("This is a known imposter option.");
	res.send(`receive option ${req.query.index} == "${req.query.value}"`);
})

app.get('/pick_option', function (req, res) {
	for (const i in current_options) {
		if (imposter_options.includes(current_options[i]))
			current_choice = i;
	}
	
	while (current_choice == -1) {
		const num = Math.floor(Math.random()*5);
		if (!human_options.includes(current_options[num]))
			current_choice = num;
		
	}
	console.log(`current_choice = ${current_choice}`);
	res.send(JSON.stringify(current_choice));
});

app.get('/correct', function (req, res) {
	//we got an imposter
	if (current_choice == -1) {
		console.log("current choice is -1, abort");
	} else {
		log_imposter_answer(current_options[current_choice]);
		for (const i of current_options)
			if (!imposter_options.includes(i))
				log_human_answer(i);
	}
})

app.get('/incorrect', function (req, res) {
	//we got a human
	if (current_choice == -1) {
		console.log("current choice is -1, abort");
	} else {
		log_human_answer(current_options[current_choice]);
	}
})


read_imposter_answer(); 
read_human_answer();
app.listen(34563, "127.0.0.1",
			() => {console.log("web server started")}
			);

function log_imposter_answer(answer) {
	if (!imposter_options.includes(answer)) {
		console.log(`"${answer}" is imposter`);
		imposter_options.push(answer);
		fs.writeFileSync("imposter_answers", answer + "\n", {flag: "a"});
	}
}

function read_imposter_answer() {
	console.log("reading imposter answers from file.")
	const readInterface = readline.createInterface({
		input: fs.createReadStream("imposter_answers"),
		output: null,
		console: false
	});
	readInterface.on("line", function(line) {
		if (line != undefined && line != null && line != "")
			imposter_options.push(line);
	});
	readInterface.on("close", function() {
		console.log("imposter list read complete");
	});
}

function log_human_answer(answer) {
	if (!human_options.includes(answer)) {
		console.log(`"${answer}" is human`);
		human_options.push(answer);
		fs.writeFileSync("human_answers", answer + "\n", {flag: "a"});
	}
}

function read_human_answer() {
	console.log("reading human answers from file.")
	const readInterface = readline.createInterface({
		input: fs.createReadStream("human_answers"),
		output: null,
		console: false
	});
	readInterface.on("line", function(line) {
		if (line != undefined && line != null && line != "")
			human_options.push(line);
	});
	readInterface.on("close", function() {
		console.log("human list read complete");
	});
}