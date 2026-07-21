const db = require("./db");
const { PollModel, OptionModel, VoteModel } = require('./models/index');



const seedDatabase = async () => {

  await db.sync({force: true});


  // 1. Create Polls & Options
  const poll1 = await PollModel.create({
    title: "Favorite Tech Stack",
    description: "Which stack do you prefer for full-stack web development?",
  });

  const optionsPoll1 = await OptionModel.bulkCreate([
    { text: "PERN Stack (Postgres, Express, React, Node)", pollId: poll1.id },
    { text: "MERN Stack (MongoDB, Express, React, Node)", pollId: poll1.id },
    { text: "Next.js + Supabase", pollId: poll1.id },
  ]);

  const poll2 = await PollModel.create({
    title: "Lunch Preferences",
    description: "What should the team order for lunch on Friday?",
  });

  const optionsPoll2 = await OptionModel.bulkCreate([
    { text: "Pizza", pollId: poll2.id },
    { text: "Tacos", pollId: poll2.id },
    { text: "Sushi", pollId: poll2.id },
    { text: "Salad Bowls", pollId: poll2.id },
  ]);

  // 2. Cast Votes
  // Votes for Poll 1
  await VoteModel.bulkCreate([
    { optionId: optionsPoll1[0].id }, // Vote PERN
    { optionId: optionsPoll1[0].id }, // Vote PERN
    { optionId: optionsPoll1[0].id }, // Vote PERN
    { optionId: optionsPoll1[1].id }, // Vote MERN
    { optionId: optionsPoll1[2].id }, // Vote Next.js
  ]);

  // Votes for Poll 2
  await VoteModel.bulkCreate([
    { optionId: optionsPoll2[0].id }, // Vote Pizza
    { optionId: optionsPoll2[1].id }, // Vote Tacos
    { optionId: optionsPoll2[1].id }, // Vote Tacos
    { optionId: optionsPoll2[2].id }, // Vote Sushi
  ]);

  console.log("Database seeded successfully!");
};

seedDatabase();
