async function resetAndPopulate() {
  console.log("🧼 Clearing database...");
  try {
    const clearRes = await fetch("http://127.0.0.1:5000/api/jobs/admin/clear", { method: "DELETE" });
    const clearData = await clearRes.json();
    console.log("✅", clearData.message);
  } catch (err) {
    console.error("❌ Failed to clear:", err.message);
    return;
  }

  const jobs = [
    {
      title: "Leaking bathroom tap in Colombo 07",
      description: "The main bathroom tap is dripping constantly and needs a washer replacement. Water is pooling on the tiled floor.",
      category: "Plumbing",
      location: "Colombo 07",
      contactName: "Nimal Perera",
      contactEmail: "nimal@example.com",
    },
    {
      title: "Full house wiring in Kandy",
      description: "New house in Kandy requires a complete electrical wiring to meet safety standards. CEB approval needed.",
      category: "Electrical",
      location: "Kandy",
      contactName: "Sunil Silva",
      contactEmail: "sunil@example.com",
    },
    {
      title: "Boundary wall painting in Negombo",
      description: "About 50 feet of boundary wall needs two coats of weather-shield paint. Paint provided by owner.",
      category: "Painting",
      location: "Negombo",
      contactName: "Kamal Fernando",
      contactEmail: "kamal@example.com",
    },
    {
      title: "Teak pantry cupboard installation in Gampaha",
      description: "Looking for a skilled carpenter to build and install custom teak wood pantry cupboards in the kitchen.",
      category: "Joinery",
      location: "Gampaha",
      contactName: "Priyantha Bandara",
      contactEmail: "priyantha@example.com",
    },
    {
      title: "Broken window repair in Galle Fort",
      description: "A heritage window pane in a colonial house was broken and needs urgent replacement with matching glass.",
      category: "Other",
      location: "Galle Fort",
      contactName: "David De Silva",
      contactEmail: "david@example.com",
    },
    {
      title: "Exterior wall painting in Matara",
      description: "The entire exterior of a two-story house needs repainting before the monsoon season starts.",
      category: "Painting",
      location: "Matara",
      contactName: "Anula Kumari",
      contactEmail: "anula@example.com",
    },
    {
      title: "New water tank installation in Jaffna",
      description: "Need a 1000L water tank installed on the roof. Plumbing and concrete base already prepared.",
      category: "Plumbing",
      location: "Jaffna",
      contactName: "Arul Kumaran",
      contactEmail: "arul@example.com",
    },
    {
      title: "Living room furniture repair in Kurunegala",
      description: "Several antique chairs have loose joints and need professional restoration and polishing.",
      category: "Joinery",
      location: "Kurunegala",
      contactName: "Mahesh Ratnayake",
      contactEmail: "mahesh@example.com",
    },
    {
      title: "Air conditioner wiring in Battaramulla",
      description: "Need separate wiring and a trip switch for two new 12,000 BTU air conditioning units.",
      category: "Electrical",
      location: "Battaramulla",
      contactName: "Rohan Jayawardena",
      contactEmail: "rohan@example.com",
    },
    {
      title: "Mahogany door hanging in Nuwara Eliya",
      description: "2 heavy mahogany entrance doors need hanging with high-quality brass hinges and locks.",
      category: "Joinery",
      location: "Nuwara Eliya",
      contactName: "Samantha Peris",
      contactEmail: "samantha@example.com",
    },
  ];

  console.log("🚀 Adding 10 Sri Lankan jobs...");
  for (const job of jobs) {
    const res = await fetch("http://127.0.0.1:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (res.ok) console.log(`✅ Added: ${job.title}`);
  }
  console.log("🏁 Database reset and populated!");
}

resetAndPopulate();
