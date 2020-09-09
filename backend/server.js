const express = require("express");
const all_activities = require("./tj.json");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route for getting the names and ids
app.get("/allusernamesandids", (req, res) => {
  //take out the name and id from each member and send it
  const namesAndIds = all_activities.members.map((m) => ({
    userId: m.id,
    username: m.real_name,
  }));
  res.send({ allUsernamesandids: namesAndIds, status: "ok" });
});

//route for getting the activities of an user by date
app.post("/getactivitiesbydate", (req, res) => {
  let { userId, targetDate } = req.body;
  userId = userId.trim();         //removing any leading or preceding whitespaces
  targetDate = targetDate.trim();

  const targetMember = all_activities.members.filter(
    (member) => member.id === userId
  ); //filter out the target user
  const targetDayActivity = targetMember[0].activity_periods.filter(
    (activity) => {             //filter out the target date from the activity entries
      const dateArray = activity.start_time.split(" ");
      dateArray.pop();
      const stringDate = dateArray.join(" ").trim();
      return stringDate == targetDate;
    }
  );

  res.send({ activities: targetDayActivity, status: "ok" });
});

//code block for providing the "index.html" file to user requests
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000; //giving a default port of using the one that is given by the environment

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
