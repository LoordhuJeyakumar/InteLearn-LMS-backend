const { default: mongoose } = require("mongoose");
const categories = require("./categoriesData");
const Category = require("../models/category");

const seedCatogries = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected succcessfully");
    })
    .then(async () => {
      try {
        const category = categories;
        for (let i = 0; i < category.length; i++) {
          const newCategory = new Category({
            name: category[i].name,
            description: category[i].description,
          });
          await newCategory.save();
        }

        console.log("Categories seeded successfully");

        mongoose.connection.close();
        process.exit(0);
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      console.log(`Error while connecting server with Database`);
      console.log(error);
      process.exit(1);
    });
};

module.exports = seedCatogries;
