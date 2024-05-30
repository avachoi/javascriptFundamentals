// The provided course information.
const CourseInfo = {
	id: 451,
	name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
	id: 12345,
	name: "Fundamentals of JavaScript",
	course_id: 451,
	group_weight: 25,
	assignments: [
		{
			id: 1,
			name: "Declare a Variable",
			due_at: "2023-01-25",
			points_possible: 50,
		},
		{
			id: 2,
			name: "Write a Function",
			due_at: "2023-02-27",
			points_possible: 150,
		},
		{
			id: 3,
			name: "Code the World",
			due_at: "3156-11-15",
			points_possible: 500,
		},
	],
};

// The provided learner submission data.
const LearnerSubmissions = [
	{
		learner_id: 125,
		assignment_id: 1,
		submission: {
			submitted_at: "2023-01-25",
			score: 47,
		},
	},
	{
		learner_id: 125,
		assignment_id: 2,
		submission: {
			submitted_at: "2023-02-12",
			score: 150,
		},
	},
	{
		learner_id: 125,
		assignment_id: 3,
		submission: {
			submitted_at: "2023-01-25",
			score: 400,
		},
	},
	{
		learner_id: 132,
		assignment_id: 1,
		submission: {
			submitted_at: "2023-01-24",
			score: 39,
		},
	},
	{
		learner_id: 132,
		assignment_id: 2,
		submission: {
			submitted_at: "2023-03-07",
			score: 140,
		},
	},
];

//   function getLearnerData(course, ag, submissions) {
//     // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];

//     return result;
//   }

//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//   console.log(result);

function getLearnerData(course, ag, submissions) {
	let result = [];
	let current = {};
	for (let i = 0; i < submissions.length; i++) {
		let learner = submissions[i];

		//adding new learnerRecord
		if (!result[learner.learner_id]) {
			result[learner.learner_id] = { id: learner.learner_id, avg: 0 };
		}
		current = result[learner.learner_id];

		//find the assignment and the due date
		let assignmentId = learner.assignment_id;
		let assignments = AssignmentGroup.assignments;
		let assignment = {};
		let due = "";
		for (let i = 0; i < assignments.length; i++) {
			if (assignmentId === assignments[i].id) {
				assignment = assignments[i];
				due = assignments[i].due_at;
			}
		}

		//find today's date in same format
		function formatDate(date) {
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, "0");
			const day = String(date.getDate()).padStart(2, "0");
			return `${year}-${month}-${day}`;
		}

		const today = new Date();
		const formattedDate = formatDate(today);

		//adding new result of an assignment
		let score = learner.submission.score;
		if (formattedDate < due) {
			continue;
		} else if (due < learner.submission.submitted_at) {
			console.log("late!");
			score -= assignment.points_possible * 0.1;
		}
		current[learner.assignment_id] = Number(
			Math.round(score / assignment.points_possible).toFixed(3)
		);

		//adding average
		let total = 0;
		let nOfScores = Object.keys(current).length - 2;
		for (key in current) {
			if (Number(key) / 1) {
				total += current[key];
				console.log("total", total);
			}
		}
		current.avg = total / nOfScores;
	}
	return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
