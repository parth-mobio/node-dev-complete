const { MongoClient, ObjectId } = require("mongodb");

// const connectionUrl = "mongodb://127.0.0.1:27017";
const connectionUrl = process.env.MONGO_URL;
const databaseName = "task-manager";

MongoClient.connect(connectionUrl, (error, client) => {
  if (error) {
    return console.log(`Unable to Connect to database: 
    ${error}`);
  }

  const db = client?.db(databaseName);
  /*   db?.collection("users").insertOne(
    {
      name: "TestUser3",
      age: 24,
    },
    (error, result) => {
      if (error) {
        return console.log(`Unable to insert data..!: ${error}`);
      }
      console.log(result?.insertedId);
    }
  ); */

  /*  db?.collection("tasks").insertMany(
    [
      {
        description: "this is 3rd task",
        completed: true,
      },
      {
        description: "this is Fourth task",
        completed: false,
      },
    ],
    (error, result) => {
      if (error) {
        return console.log(`Unable to insert documents..!: ${error}`);
      }
      console.log(result);
    }
  ); */

  /*   db?.collection("tasks").findOne(
    { description: "this is 3rd task" },
    (error, task) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(task);
    }
  ); */

  /*   db?.collection("tasks")
    .find({ completed: false })
    .toArray((error, tasks) => {
      if (error) {
        return console.log(`error: ${error}`);
      }
      console.log(tasks);
    }); */

  /*   const updatePromise = db?.collection("users").updateOne(
    {
      _id: new ObjectId("63d0e00e6830468c220c3126"),
    },
    {
      $set: {
        name: "Falcon",
      },
    }
  );

  updatePromise
    ?.then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    }); */

  /*   const updatePromise = db?.collection("tasks").updateMany(
    {
      completed: false,
    },
    {
      $set: {
        completed: true,
      },
    }
  );
  updatePromise
    ?.then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    }); */

  /*   db?.collection("users")
    .deleteMany({
      age: 24,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    }); */

  db?.collection("tasks")
    .deleteOne({
      description: "this is 3rd task",
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
});
