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
    res.render("index");
});

app.get("/blogs", (req, res) => {
    res.render("blog", { posts })
});

app.get("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < posts.length) {
        const post = posts[index];
        res.render('edit', { post, index });
    } else {
        res.redirect('/');
    }
});

app.post("/", (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.render("blog", { posts });
});

app.post("/delete", (req, res) => {
    const { index } = req.body;
    posts.splice(index, 1);
    res.redirect("/");
});

app.post("/edit/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { title, content } = req.body;
    if (index >= 0 && index < posts.length) {
        posts[index] = { ...posts[index], title, content };
    }   
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});