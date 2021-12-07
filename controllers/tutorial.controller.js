import Tutorial from "../models/tutorial.model.js";
import Token from "../models/token.model.js";

function Controller() {
	const tutorial = new Tutorial({
		title: "",
		description: "",
		published: "" || false,
	});

	const token = new Token({
		email: "",
		token: "",
	});

	// Create and Save a new Tutorial
	this.create = (req, res) => {
		// Validate request
		if (!req.body) {
			res.status(400).send({
				message: "Content can not be empty!",
			});
		}

		// Create a Tutorial
		const tutorial = new Tutorial({
			title: req.body.title,
			description: req.body.description,
			published: req.body.published || false,
		});

		// Save Tutorial in the database
		tutorial.create(tutorial, (err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while creating the Tutorial.",
				});
			else res.send(data);
		});
	};

	// Retrieve all Tutorials from the database (with condition).
	this.findAll = (req, res) => {
		token.findById(req, (err, data) => {
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
			} else {
				const title = req.query.title;

				tutorial.getAll(title, (err, data) => {
					if (err)
						res.status(500).send({
							message:
								err.message ||
								"Some error occurred while retrieving tutorials.",
						});
					else res.send(data);
				});
			}
		});
	};

	// Find a single Tutorial by Id
	this.findOne = (req, res) => {
		console.log(req.query.name);
		tutorial.findById(req.query.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Tutorial with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: "Error retrieving Tutorial with id " + req.params.id,
					});
				}
			} else res.send(data);
		});
	};

	// find all published Tutorials
	this.findAllPublished = (req, res) => {
		tutorial.getAllPublished((err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while retrieving tutorials.",
				});
			else res.send(data);
		});
	};

	// Update a Tutorial identified by the id in the request
	this.update = (req, res) => {
		// Validate Request
		if (!req.body) {
			res.status(400).send({
				message: "Content can not be empty!",
			});
		}

		console.log(req.body);

		tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Tutorial with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: "Error updating Tutorial with id " + req.params.id,
					});
				}
			} else res.send(data);
		});
	};

	// Delete a Tutorial with the specified id in the request
	this.delete = (req, res) => {
		tutorial.remove(req.params.id, (err, data) => {
			if (err) {
				if (err.kind === "not_found") {
					res.status(404).send({
						message: `Not found Tutorial with id ${req.params.id}.`,
					});
				} else {
					res.status(500).send({
						message: "Could not delete Tutorial with id " + req.params.id,
					});
				}
			} else res.send({ message: `Tutorial was deleted successfully!` });
		});
	};

	// Delete all Tutorials from the database.
	this.deleteAll = (req, res) => {
		tutorial.removeAll((err, data) => {
			if (err)
				res.status(500).send({
					message:
						err.message || "Some error occurred while removing all tutorials.",
				});
			else res.send({ message: `All Tutorials were deleted successfully!` });
		});
	};
}

export default Controller;
