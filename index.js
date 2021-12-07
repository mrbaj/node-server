import express from "express";
import cors from "cors";
import router from "./routes/tutorial.routes.js";

const app = express();

var corsOptions = {
	origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/api/tutorials", router);

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
