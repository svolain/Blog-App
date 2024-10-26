import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.set("view engine", "ejs");

let posts = [];

app.get("/", (req, res) => {
    res.render("index", {posts});
});

app.get("/submit", (req, res) => {
    res.render("submit")
});

app.post("/", (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.render("submit");
});

app.post("/delete", (req, res) => {
    const { index } = req.body;
    posts.splice(index, 1);
    res.redirect("/");
});

app.post("/update", (req, res) => {
    const { index, title, content } = req.body;
    posts[index] = { title, content };
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });