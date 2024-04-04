const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.static(path.join(__dirname, "../MyFrontEnd")));

app.listen(port, function (error) {
  if (error) {
    console.log("Error creating server", error);
  } else {
    console.log("Server is listening on port " + port);
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

let students = [
  {
    SID: 1001,
    FirstName: "Harry",
    LastName: "Styles",
    Email: "harry@gmail.com",
    NearCity: "Kandy",
    Course: ["Foundation", "HND", "Degree"],
    Guardian: "James Cameron",
    Subjects: ["ETF", "ORDBMS", "OOP", "SE", "HCI", "IP"],
  },
  {
    SID: 1002,
    FirstName: "Emma",
    LastName: "Watson",
    Email: "emma@gmail.com",
    NearCity: "London",
    Course: ["HND"],
    Guardian: "John Watson",
    Subjects: ["ORDBMS", "OOP"],
  },

  {
    SID: 1003,
    FirstName: "Tom",
    LastName: "Holland",
    Email: "tom@gmail.com",
    NearCity: "Los Angeles",
    Course: ["Foundation", "HND"],
    Guardian: "Sarah Holland",
    Subjects: ["SE", "HCI"],
  },

  {
    SID: 1004,
    FirstName: "Lena",
    LastName: "Headey",
    Email: "lena@gmail.com",
    NearCity: "New York",
    Course: ["Degree"],
    Guardian: "David Headey",
    Subjects: ["ORDBMS", "OOP", "SE", "HCI", "IP"],
  },

  {
    SID: 1005,
    FirstName: "Tom",
    LastName: "Hanks",
    Email: "tom@gmail.com",
    NearCity: "Los Angeles",
    Course: ["HND", "Degree"],
    Guardian: "John Hanks",
    Subjects: ["OOP", "SE", "HCI", "IP"],
  },

  {
    SID: 1006,
    FirstName: "Jennifer",
    LastName: "Lawrence",
    Email: "jennifer@gmail.com",
    NearCity: "Los Angeles",
    Course: ["Degree"],
    Guardian: "Karen Lawrence",
    Subjects: ["ORDBMS", "OOP"],
  },

  {
    SID: 1007,
    FirstName: "Chris",
    LastName: "Hemsworth",
    Email: "chris@gmail.com",
    NearCity: "Sydney",
    Course: ["Master's"],
    Guardian: "Craig Hemsworth",
    Subjects: ["Foundation", "HND", "Degree"],
  },
];

let student = {
  SID: "",
  FirstName: " ",
  LastName: "",
  Email: " ",
  NearCity: "",
  Course: [" ", " ", " ", " ", " ", " ", " "],
  Guardian: " ",
  Subjects: [" ", " ", " ", " ", " ", " "],
};

//Show all students function
app.get("/student", (req, res) => {
  res.json(students);
});

//Filtering using SID
app.get("/student/SID=:sid", (req, res) => {
  let sid = parseInt(req.params.sid);
  let tempStu = students.filter((x) => x.SID === sid);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using FirstName of student
app.get("/student/FirstName=:fname", (req, res) => {
  let sfirstname = req.params.fname;
  let tempStu = students.filter((x) => x.FirstName === sfirstname);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using LastName of student
app.get("/student/LastName=:lname", (req, res) => {
  let slastname = req.params.lname;
  let tempStu = students.filter((x) => x.LastName === slastname);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using Email of student
app.get("/student/Email=:email", (req, res) => {
  let semail = req.params.email;
  let tempStu = students.filter((x) => x.Email === semail);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using NearCity of student
app.get("/student/NearCity=:city", (req, res) => {
  let scity = req.params.city;
  let tempStu = students.filter((x) => x.NearCity === scity);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using Course the student is doing
app.get("/student/Course/:course", (req, res) => {
  let scourse = req.params.course;
  let tempStu = students.filter((x) => x.Course.includes(scourse));
  if (tempStu.length > 0) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//FIltering using the Subject the student is following
app.get("/student/Subjects/:subject", (req, res) => {
  let ssub = req.params.subject;
  let tempStu = students.filter((x) => x.Subjects.includes(ssub));
  if (tempStu.length > 0) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Filtering using the Guardian name of the student
app.get("/student/Guardian=:guardian", (req, res) => {
  let sgua = req.params.guardian;
  let tempStu = students.filter((x) => x.Guardian === sgua);
  if (tempStu) {
    res.json(tempStu);
  } else {
    res.sendStatus(404);
  }
});

//Function to add student details to the server
app.post("/student", (req, res) => {
  let student = req.body;
  console.log(req.body);
  students.push(student);
  res.send("Student is added to the list");
});

//Function to update the student details by sid
app.put("/student/:sid", (req, res) => {
  let sid = parseInt(req.params.sid);
  let stu = req.body;
  console.log(stu);
  let tempStu = students.find((x) => x.SID === sid);
  if (tempStu) {
    tempStu.SID = stu.sid;
    tempStu.FirstName = stu.fname;
    tempStu.LastName = stu.lname;
    tempStu.Email = stu.email;
    tempStu.NearCity = stu.city;
    tempStu.Course = stu.course;
    tempStu.Subjects = stu.subject;
    tempStu.Guardian = stu.guardian;
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

//Function to delete record by using SID

app.delete("/student/:sid", (req, res) => {
  let studentId = parseInt(req.params.sid);
  let currentStudent = students.filter((x) => x.SID == studentId)[0];
  if (currentStudent) {
    students = students.filter((x) => x.SID !== studentId);
    res.statusMessage = "Student deleted successfully.";
    res.sendStatus(200);
  } else {
    res.statusMessage = "Student does not exist";
    res.sendStatus(404);
  }
});
