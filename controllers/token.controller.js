import Token from "../models/token.model.js";

function TokenController() {
	const token = new Token({
		email: "",
		token: "",
	});

	//Create and save new Token
	this.create = (req, res) => {
		// Validate request
		if (!req.body) {
			res.status(400).send({
				message: "Content can not be empty!",
			});
		}

		// Create a teacher
		const token = new Token({
			email: req.body.email,
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
	};

	this.remove = (req, res) => {
		token.remove(req.params.token, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found token  ${req.params.token}.`,
					});
				} else {
					res.status(500).send({
						message: "Could not delete token with tokenid " + req.params.token,
					});
				}
			} else res.send({ message: `token was deleted successfully!` });
		});
	};

	this.findOne = (req, res) => {
		token.findById(req.query.email, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found token with email ${req.query.email}.`,
					});
				} else {
					res.status(500).send({
						message: "Error retrieving token with email " + req.query.email,
					});
				}
			} else res.send(data);
		});
	};
}

export default TokenController;
