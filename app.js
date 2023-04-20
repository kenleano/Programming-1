// Import necessary libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create an instance of the Express app
const app = express();

// Set up middleware for parsing JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
// Connect to the MongoDB database using the URI string
const URI = "mongodb+srv://kendb:atlas123@cluster0.1s3m8bf.mongodb.net/BookList?retryWrites=true&w=majority";
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the "book" collection
const bookSchema = new mongoose.Schema({

  title: {type:String, required:true},
  author: {type:String, required:true},
  description: {type:String, required:true},

});

// Define the model for the "book" collection using the schema
const Book = mongoose.model("300357628-Kenneth", bookSchema);

function generateId() {
    return Math.floor(Math.random() * 1000);
    }
// Define the routes and their functions

// Route: "/"
// Method: GET
// Function: Returns all books in JSON
app.get("/", async (req, res) => {
  try {
    const book = await Book.find();
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route: "/add"
// Method: POST
// Function: Add new JSON data as a new document to book
app.post("/", async (req, res) => {
  try {
    const id = generateId();
    const { title, author, description } = req.body;
    const book = new Book({ title, author, description });
    await book.save();
    res.send("book added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route: "/:id"
// Method: GET
// Function: Return the specific book data with the defined id as JSON
app.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send("book not found");
    } else {
      res.json(books);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route: "/delete/:id"
// Method: DELETE
// Function: Delete a specific book with the id in the route from the collection and responds "book deleted"
app.delete("/delete/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).send("book not found");
    } else {
      res.send("book deleted");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Route: "/update/:id"
// Method: POST
// Function: Update a specific book with the id in the route in the collection and responds "book updated"
// Update a specific book by ID
app.post('/update/:id', async (req, res) => {
    try {
      const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBook) {
        return res.status(404).json({ msg: 'Book not found' });
      }
      res.json({ msg: 'Book updated successfully', updatedBook });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

  
  // Start server
  app.listen(5000, () => console.log('Server running on port 5000'));
  
