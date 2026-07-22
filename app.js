const express = require("express");
const cors = require('cors')
const { PollModel, OptionModel, VoteModel, db } = require("./models");

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors())

app.get("/health", (req, res) => {
  res.json({ status: "It works" });
});

app.get("/polls", async (req, res) => {
  const polls = await PollModel.findAll();
  console.log(polls.poll);

  res.status(200).json(polls);
});

app.get("/polls/:id", async (req, res) => {
  const id = Number(req.params.id);

  const singlePoll = await PollModel.findByPk(id, {
    include: {
      model: OptionModel,
      include: [VoteModel],
    },
  });
  if (!singlePoll) {
    return res.sendStatus(404);
  }
  res.status(200).json(singlePoll);
});

app.post("/polls", async (req, res) => {
  const { title, description, options } = req.body;

  const newPoll = await PollModel.create({ title, description });

  const createdOptions = options.map(async (option) => {
    await OptionModel.create({ text: option, pollId: newPoll.id });
  });

  res.status(200).json(newPoll);
});

app.post("/polls/:id/vote", async (req, res) => {
  const optionId  = Number(req.body.optionId); //frontend id

  const id = Number(req.params.id);
  const poll = await PollModel.findByPk(id);

  if (!poll) {
    res.status(404).json("no poll");
  }
  const vote = await VoteModel.create({ optionId});

  res.status(201).json(vote);
});

async function startApp() {
  await db.sync().then(() => {
    console.log("Connection successful");
    app.listen(PORT, () =>
      console.log(`Server running on port http://localhost:${PORT}`),
    );
  });
}

startApp();
