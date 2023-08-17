import { ObjectId } from "mongodb";
import { connectDB, getDB } from "../src/db/database";

const categories = [];
const products = [];

// Seeding 15 categories and 2 products for each category
for (let i = 1; i <= 15; i++) {
  const categoryId = new ObjectId().toHexString();

  const category = {
    _id: categoryId,
    title: `Category ${i}`,
    desc: `Description for Category ${i}`,
    imageUrl: `https://via.placeholder.com/300x300`,
  };

  categories.push(category);

  for (let j = 1; j <= 5; j++) {
    const product = {
      _id: new ObjectId().toHexString(),
      title: `Product ${j} for Category ${i}`,
      description: `Description for Product ${j} of Category ${i}`,
      price: i * 10 + j,
      sellingPrice: i * 10 + j - 2,
      categoryId: categoryId,
    };

    products.push(product);
  }
}

export const seedData = {
  categories,
  products,
};

(async () => {
  await connectDB();
  const _db = getDB();

  await _db.collection(collections.category).insertMany(seedData.categories);
  await _db.collection(collections.product).insertMany(seedData.products);

  console.log("[SEED] Data seeding 🌱 completed");
})();
