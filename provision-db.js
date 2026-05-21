import { create_database } from './tools';

async function setup() {
  const waitlist = await create_database({
    name: "Curio Waitlist",
    columns: [
      { name: "email", type: "text" },
      { name: "source", type: "text" },
      { name: "timestamp", type: "text" }
    ],
    publicWrites: true
  });
  console.log("Waitlist DB:", waitlist.id);

  const suppliers = await create_database({
    name: "Curio Suppliers",
    columns: [
      { name: "Name", type: "text" },
      { name: "Region", type: "text" },
      { name: "Specialty", type: "text" },
      { name: "MOQ", type: "text" },
      { name: "Unit_Cost", type: "text" }
    ]
  });
  console.log("Suppliers DB:", suppliers.id);

  const influencers = await create_database({
    name: "Curio Influencer Outreach",
    columns: [
      { name: "Handle", type: "text" },
      { name: "Platform", type: "text" },
      { name: "Niche", type: "text" },
      { name: "Follower_Count", type: "text" },
      { name: "Status", type: "text" }
    ]
  });
  console.log("Influencers DB:", influencers.id);
}
