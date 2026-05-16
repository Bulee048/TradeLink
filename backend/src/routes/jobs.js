const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const JobRequest = require("../models/JobRequest");

// Mock data for fallback mode
let mockJobs = [
  {
    _id: "mock1",
    title: "Leaking bathroom tap in Colombo 07",
    description: "The main bathroom tap is dripping constantly and needs a washer replacement. Water is pooling on the tiled floor.",
    category: "Plumbing",
    location: "Colombo 07",
    contactName: "Nimal Perera",
    contactEmail: "nimal@example.com",
    status: "Open",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "mock2",
    title: "Full house wiring in Kandy",
    description: "New house in Kandy requires a complete electrical wiring to meet safety standards. CEB approval needed.",
    category: "Electrical",
    location: "Kandy",
    contactName: "Sunil Silva",
    contactEmail: "sunil@example.com",
    status: "In Progress",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "mock3",
    title: "Boundary wall painting in Negombo",
    description: "About 50 feet of boundary wall needs two coats of weather-shield paint. Paint provided by owner.",
    category: "Painting",
    location: "Negombo",
    contactName: "Kamal Fernando",
    contactEmail: "kamal@example.com",
    status: "Open",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    _id: "mock4",
    title: "Teak pantry cupboard installation in Gampaha",
    description: "Looking for a skilled carpenter to build and install custom teak wood pantry cupboards in the kitchen.",
    category: "Joinery",
    location: "Gampaha",
    contactName: "Priyantha Bandara",
    contactEmail: "priyantha@example.com",
    status: "Closed",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    _id: "mock5",
    title: "Broken window repair in Galle Fort",
    description: "A heritage window pane in a colonial house was broken and needs urgent replacement with matching glass.",
    category: "Other",
    location: "Galle Fort",
    contactName: "David De Silva",
    contactEmail: "david@example.com",
    status: "Open",
    createdAt: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    _id: "mock6",
    title: "Exterior wall painting in Matara",
    description: "The entire exterior of a two-story house needs repainting before the monsoon season starts.",
    category: "Painting",
    location: "Matara",
    contactName: "Anula Kumari",
    contactEmail: "anula@example.com",
    status: "In Progress",
    createdAt: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    _id: "mock7",
    title: "New water tank installation in Jaffna",
    description: "Need a 1000L water tank installed on the roof. Plumbing and concrete base already prepared.",
    category: "Plumbing",
    location: "Jaffna",
    contactName: "Arul Kumaran",
    contactEmail: "arul@example.com",
    status: "Open",
    createdAt: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    _id: "mock8",
    title: "Living room furniture repair in Kurunegala",
    description: "Several antique chairs have loose joints and need professional restoration and polishing.",
    category: "Joinery",
    location: "Kurunegala",
    contactName: "Mahesh Ratnayake",
    contactEmail: "mahesh@example.com",
    status: "Open",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    _id: "mock9",
    title: "Air conditioner wiring in Battaramulla",
    description: "Need separate wiring and a trip switch for two new 12,000 BTU air conditioning units.",
    category: "Electrical",
    location: "Battaramulla",
    contactName: "Rohan Jayawardena",
    contactEmail: "rohan@example.com",
    status: "Open",
    createdAt: new Date(Date.now() - 691200000).toISOString(),
  },
  {
    _id: "mock10",
    title: "Mahogany door hanging in Nuwara Eliya",
    description: "2 heavy mahogany entrance doors need hanging with high-quality brass hinges and locks.",
    category: "Joinery",
    location: "Nuwara Eliya",
    contactName: "Samantha Peris",
    contactEmail: "samantha@example.com",
    status: "In Progress",
    createdAt: new Date(Date.now() - 777600000).toISOString(),
  },
];

const isDbConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all jobs
// @route   GET /api/jobs
router.get("/", async (req, res, next) => {
  try {
    const { category, status, search } = req.query;

    if (!isDbConnected()) {
      console.log("⚠️ DB not connected, using Mock Data");
      let data = [...mockJobs];
      if (category && category !== "All") data = data.filter(j => j.category.toLowerCase() === category.toLowerCase());
      if (status) data = data.filter(j => j.status.toLowerCase() === status.toLowerCase());
      if (search) {
        const s = search.toLowerCase();
        data = data.filter(j => j.title.toLowerCase().includes(s) || j.description.toLowerCase().includes(s));
      }
      return res.status(200).json({ success: true, count: data.length, data: data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)), isMock: true });
    }

    let query = {};
    if (category) query.category = { $regex: new RegExp(`^${category}$`, "i") };
    if (status) query.status = { $regex: new RegExp(`^${status}$`, "i") };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const jobs = await JobRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    next(err);
  }
});

// @desc    Get single job
// @route   GET /api/jobs/:id
router.get("/:id", async (req, res, next) => {
  try {
    // 1. Try to find in DB if connected
    if (isDbConnected()) {
      try {
        const job = await JobRequest.findById(req.params.id);
        if (job) return res.status(200).json({ success: true, data: job });
      } catch (err) {
        // If it's a CastError, it might be a mock ID, so we continue to check mocks
        if (err.name !== "CastError") throw err;
      }
    }

    // 2. Fallback to Mock Data (useful for 'mock1', etc. or if DB is down)
    const mockJob = mockJobs.find((j) => j._id === req.params.id);
    if (mockJob) {
      return res.status(200).json({ success: true, data: mockJob });
    }

    // 3. Not found anywhere
    res.status(404).json({ success: false, error: "Job not found" });
  } catch (err) {
    next(err);
  }
});

// @desc    Create new job
// @route   POST /api/jobs
router.post("/", async (req, res, next) => {
  try {
    if (!isDbConnected()) {
      const newJob = { ...req.body, _id: Date.now().toString(), createdAt: new Date().toISOString(), status: "Open" };
      mockJobs.unshift(newJob);
      return res.status(201).json({ success: true, data: newJob });
    }

    const job = await JobRequest.create(req.body);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
});

// @desc    Update job status
// @route   PATCH /api/jobs/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["Open", "In Progress", "Closed"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    // 1. Try to update in DB
    if (isDbConnected()) {
      try {
        const job = await JobRequest.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true });
        if (job) return res.status(200).json({ success: true, data: job });
      } catch (err) {
        if (err.name !== "CastError") throw err;
      }
    }

    // 2. Fallback to Mock Data
    const index = mockJobs.findIndex((j) => j._id === req.params.id);
    if (index !== -1) {
      mockJobs[index].status = status;
      return res.status(200).json({ success: true, data: mockJobs[index] });
    }

    res.status(404).json({ success: false, error: "Job not found" });
  } catch (err) {
    next(err);
  }
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
router.delete("/:id", async (req, res, next) => {
  try {
    // 1. Try to delete from DB
    if (isDbConnected()) {
      try {
        const job = await JobRequest.findByIdAndDelete(req.params.id);
        if (job) return res.status(200).json({ success: true, data: {} });
      } catch (err) {
        if (err.name !== "CastError") throw err;
      }
    }

    // 2. Fallback to Mock Data
    const index = mockJobs.findIndex((j) => j._id === req.params.id);
    if (index !== -1) {
      mockJobs.splice(index, 1);
      return res.status(200).json({ success: true, data: {} });
    }

    res.status(404).json({ success: false, error: "Job not found" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
