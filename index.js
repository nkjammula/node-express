const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());
let courses = [
  { name: "data structures", id: "1" },
  { name: "java", id: "2" },
  { name: "C# and dotnet", id: "3" },
];
app.get("/", (req, res) => {
  res.send("Hello, world!!!");
});
app.get("/api/courses", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((c) => c.id === id);
  if (course) {
    res.send(course);
  } else {
    res.status(404).send(`requested course id ${id} not found`);
  }
});

app.put("/api/courses/:id", (req, res) => {
  // check if course exists
  // if exists update the course and send back updated course.
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    res.status(404).send("course not exits");
  }
  course.name = req.body.name;
  res.send(course);
});
app.delete("/api/courses/:id", (req, res) => {
  // check if course exists
  // if exists update the course and send back updated course.
  let course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    res.status(404).send("course not exits");
    return;
  }
  courses = courses.filter((c) => c.id !== course.id);
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).send(`${error}`);
    return;
  }

  //   // instead of doing below validation we can use libraries like JOI as above to do the validation.
  //   if (req.body.name === undefined || req.body.name.length < 3) {
  //     res
  //       .status(400)
  //       .send("name property does not exists or name is less than 3 characters");
  //     return;
  //   }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});
// use env variables for setting ports.using process object.
const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`listening on port ${port}...`));
