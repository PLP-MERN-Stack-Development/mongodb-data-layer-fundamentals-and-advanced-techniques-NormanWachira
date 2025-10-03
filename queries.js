// queries.js
// MongoDB queries for Week 1 Assignment

// 1. Find all books in a specific genre (example: Fiction)
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year (example: 2015)
db.books.find({ published_year: { $gt: 2015 } });

// 3. Find books by a specific author (example: "George Orwell")
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (example: update "1984" price to 15.99)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 15.99 } }
);

// 5. Delete a book by its title (example: "The Catcher in the Rye")
db.books.deleteOne({ title: "The Catcher in the Rye" });

// ADVANCED QUERIES

// 6. Find books that are in stock AND published after 2010
db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

// 7. Use projection to return only title, author, and price
db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

// 8. Sort books by price (ascending)
db.books.find().sort({ price: 1 });

// 9. Sort books by price (descending)
db.books.find().sort({ price: -1 });

// 10. Pagination: show 5 books per page (example: page 2)
db.books.find().skip(5).limit(5);

// AGGREGATION PIPELINES

// 11. Calculate average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
]);

// 12. Find the author with the most books
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
]);

// 13. Group books by publication decade and count them
db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$published_year", 10] } },
      totalBooks: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $multiply: ["$_id", 10] },
      totalBooks: 1,
      _id: 0
    }
  },
  { $sort: { decade: 1 } }
]);

// INDEXING

// 14. Create an index on the title field
db.books.createIndex({ title: 1 });

// 15. Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: -1 });

// 16. Use explain() to show performance improvement (example: query by title)
db.books.find({ title: "1984" }).explain("executionStats");
