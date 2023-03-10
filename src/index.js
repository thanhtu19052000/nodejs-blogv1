import { engine } from "express-handlebars";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.static("src/public"));
app.use(morgan("combined"));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", `./src/resource/views`);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/news", (req, res) => {
  res.render("newsPage");
});
app.listen(3000, () => {
  console.log("Server started! at 3000");
});
