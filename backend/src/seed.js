const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JobRequest = require("./models/JobRequest");

dotenv.config();

const jobs = [
  {
    title: "Leaking bathroom tap in Colombo 07",
    description: "The main bathroom tap is dripping constantly and needs a washer replacement. Water is pooling on the tiled floor.",
    category: "Plumbing",
    location: "Colombo 07",
    contactName: "Nimal Perera",
    contactEmail: "nimal@example.com",
    status: "Open",
  },
  {
    title: "Full house wiring in Kandy",
    description: "New house in Kandy requires a complete electrical wiring to meet safety standards. CEB approval needed.",
    category: "Electrical",
    location: "Kandy",
    contactName: "Sunil Silva",
    contactEmail: "sunil@example.com",
    status: "In Progress",
  },
  {
    title: "Boundary wall painting in Negombo",
    description: "About 50 feet of boundary wall needs two coats of weather-shield paint. Paint provided by owner.",
    category: "Painting",
    location: "Negombo",
    contactName: "Kamal Fernando",
    contactEmail: "kamal@example.com",
    status: "Open",
  },
  {
    title: "Teak pantry cupboard installation in Gampaha",
    description: "Looking for a skilled carpenter to build and install custom teak wood pantry cupboards in the kitchen.",
    category: "Joinery",
    location: "Gampaha",
    contactName: "Priyantha Bandara",
    contactEmail: "priyantha@example.com",
    status: "Closed",
  },
  {
    title: "Broken window repair in Galle Fort",
    description: "A heritage window pane in a colonial house was broken and needs urgent replacement with matching glass.",
    category: "Other",
    location: "Galle Fort",
    contactName: "David De Silva",
    contactEmail: "david@example.com",
    status: "Open",
  },
  {
    title: "Exterior wall painting in Matara",
    description: "The entire exterior of a two-story house needs repainting before the monsoon season starts.",
    category: "Painting",
    location: "Matara",
    contactName: "Anula Kumari",
    contactEmail: "anula@example.com",
    status: "In Progress",
  },
  {
    title: "New water tank installation in Jaffna",
    description: "Need a 1000L water tank installed on the roof. Plumbing and concrete base already prepared.",
    category: "Plumbing",
    location: "Jaffna",
    contactName: "Arul Kumaran",
    contactEmail: "arul@example.com",
    status: "Open",
  },
  {
    title: "Living room furniture repair in Kurunegala",
    description: "Several antique chairs have loose joints and need professional restoration and polishing.",
    category: "Joinery",
    location: "Kurunegala",
    contactName: "Mahesh Ratnayake",
    contactEmail: "mahesh@example.com",
    status: "Open",
  },
  {
    title: "Air conditioner wiring in Battaramulla",
    description: "Need separate wiring and a trip switch for two new 12,000 BTU air conditioning units.",
    category: "Electrical",
    location: "Battaramulla",
    contactName: "Rohan Jayawardena",
    contactEmail: "rohan@example.com",
    status: "Open",
  },
  {
    title: "Mahogany door hanging in Nuwara Eliya",
    description: "2 heavy mahogany entrance doors need hanging with high-quality brass hinges and locks.",
    category: "Joinery",
    location: "Nuwara Eliya",
    contactName: "Samantha Peris",
    contactEmail: "samantha@example.com",
    status: "In Progress",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    await JobRequest.deleteMany({});
    console.log("Cleared existing jobs.");

    await JobRequest.insertMany(jobs);
    console.log(`Database seeded with ${jobs.length} jobs.`);

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
