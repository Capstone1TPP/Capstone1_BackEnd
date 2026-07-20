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
    { text: "PERN Stack (Postgres, Express, React, Node)", Poll_id: poll1.id },
    { text: "MERN Stack (MongoDB, Express, React, Node)", Poll_id: poll1.id },
    { text: "Next.js + Supabase", Poll_id: poll1.id },
  ]);

  const poll2 = await PollModel.create({
    title: "Lunch Preferences",
    description: "What should the team order for lunch on Friday?",
  });

  const optionsPoll2 = await OptionModel.bulkCreate([
    { text: "Pizza", Poll_id: poll2.id },
    { text: "Tacos", Poll_id: poll2.id },
    { text: "Sushi", Poll_id: poll2.id },
    { text: "Salad Bowls", Poll_id: poll2.id },
  ]);

  // 2. Cast Votes
  // Votes for Poll 1
  await VoteModel.bulkCreate([
    { Option_id: optionsPoll1[0].id }, // Vote PERN
    { Option_id: optionsPoll1[0].id }, // Vote PERN
    { Option_id: optionsPoll1[0].id }, // Vote PERN
    { Option_id: optionsPoll1[1].id }, // Vote MERN
    { Option_id: optionsPoll1[2].id }, // Vote Next.js
  ]);

  // Votes for Poll 2
  await VoteModel.bulkCreate([
    { Option_id: optionsPoll2[0].id }, // Vote Pizza
    { Option_id: optionsPoll2[1].id }, // Vote Tacos
    { Option_id: optionsPoll2[1].id }, // Vote Tacos
    { Option_id: optionsPoll2[2].id }, // Vote Sushi
  ]);

  console.log("Database seeded successfully!");
};

seedDatabase();
