import Teacher from "../models/teacher.model.js";
import Token from "../models/token.model.js";

function TeacherController() {
	const teacher = new Teacher({
		email: "",
		password: "",
	});

	const token = new Token({
		email: "",
		token: "",
	});

	//Create and save new Teacher
	this.create = (req, res) => {
		// Validate request
		if (!req.body) {
			res.status(400).send({
				message: "Content can not be empty!",
			});
		}

		// Create a teacher
		const teacher = new Teacher({
			email: req.body.email,
			password: req.body.password,
		});

		// Save teacher in the database
		teacher.create(teacher, (err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the Teacher.",
				});
			else res.send(data);
		});
	};

	this.findOne = (req, res) => {
		teacher.findById(req.query, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Teacher with email ${req.query.email}.`,
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Teacher with email " + req.query.email,
					});
				}
			} else {
				// Create a teacher
				const token = new Token({
					email: req.query.email,
					token: Date.now() + "",
				});

				// Save teacher in the database
				token.create(token, (err, data) => {
					if (err) {
						res.status(500).send({
							message:
								"Error updating Token with id " +
								req.params.email +
								" " +
								token.email +
								" " +
								token.token,
						});
					} else res.send(data);
				});
			}
		});
	};
}

export default TeacherController;
