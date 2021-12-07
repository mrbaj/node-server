import connection from "./db.js";

const Teacher = function (teacher) {
	this.email = teacher.email;
	this.password = teacher.password;
};

Teacher.prototype.create = (newTeacher, result) => {
	connection.query("INSERT INTO teachers SET ?", newTeacher, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created teacher: ", { id: res.insertId, ...newTeacher });
		result(null, { id: res.insertId, ...newTeacher });
	});
};

Teacher.prototype.findById = ({ email, password }, result) => {
	connection.query(
		`SELECT * FROM teachers WHERE email = '${email}' AND password = '${password}'`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("found tutorial: ", res[0]);
				result(null, res[0]);
				return;
			}

			// not found Tutorial with the email
			result({ kind: "not_found" }, null);
		}
	);
};

export default Teacher;
