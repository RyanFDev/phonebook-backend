const mongoose = require('mongoose');

// CLI arguments
const args = process.argv;
const password = args[2];
const name = args[3];
const number = args[4];

// Check for valid arguments
if (args.length < 3) {
  console.error(
    'Please provide the password as an argument: node mongo.js <password> [<name> <number>]'
  );
  process.exit(1);
} else if (args.length === 6) {
  console.error(
    'If providing a full name make sure to use quotes around it: node mongo.js <password> "<name>" <number>'
  );
  process.exit(1);
} else if (args.length > 6) {
  console.error('Too many arguments provided');
  process.exit(1);
}

// Connect to MongoDB Atlas
const MONGO_USERNAME = 'phonebook';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${password}@cluster0.hysosut.mongodb.net/phonebookDB?retryWrites=true&w=majority&appName=Cluster0`;

console.log('Connecting to MongoDB Atlas...');

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL).then(() => {
  console.log('Connected to MongoDB Atlas');
});

// Define the schema for a listing
const listingSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// Create a model for the listing
const Listing = mongoose.model('Listing', listingSchema);

// If only password is provided, retrieve all listings
if (password && !name && !number) {
  Listing.find({}).then((entries) => {
    console.log('All phonebook entries:');
    entries.forEach((listing) => {
      console.log(listing.name, listing.number);
    });
    console.log('---');
    console.log('Total entries:', entries.length);
    mongoose.connection.close();
  });
}

// If name and number are provided, add a new listing
else if (password && name && number) {
  const newListing = new Listing({
    name,
    number,
  });

  newListing.save().then(() => {
    console.log('Added new listing: ', name, number);
    mongoose.connection.close();
  });
}

// Invalid arguments provided (fall back case)
else {
  console.error('Invalid arguments');
  mongoose.connection.close();
}
