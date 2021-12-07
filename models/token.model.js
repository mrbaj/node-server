import connection from "./db.js";

const Token = function (record) {
	this.email = record.email;
	this.token = record.token;
};

Token.prototype.create = (newToken, result) => {
	connection.query("INSERT INTO login_tokens SET ?", newToken, (err, res) => {
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		console.log("created token: ", { id: res.insertId, ...newToken });
		result(null, { id: res.insertId, ...newToken });
	});
};

Token.prototype.remove = (token, result) => {
	connection.query(
		"DELETE FROM login_tokens WHERE token = ?",
		token,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(null, err);
				return;
			}

			if (res.affectedRows == 0) {
				// not found Tutorial with the id
				result({ kind: "not_found" }, null);
				return;
			}

			console.log("deleted token with id: ");
			result(null, res);
		}
	);
};

Token.prototype.findById = (req, result) => {
	connection.query(
		`SELECT * FROM login_tokens WHERE email = '${req.headers["email"]}' AND token = '${req.headers["token"]}'`,
		(err, res) => {
			if (err) {
				console.log("error: ", err);
				result(err, null);
				return;
			}

			if (res.length) {
				console.log("found tutorial: ", res[0]);
				result(null, res[0].token);
				return;
			}

			// not found Tutorial with the email
			result({ kind: "not_found" }, null);
		}
	);
};

export default Token;
