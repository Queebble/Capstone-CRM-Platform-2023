import mongoose from "mongoose";

// Defining the TeamSchema
const TeamSchema = new mongoose.Schema(
  {
    // Organization ID to which the team belongs (required)
    organisationID: {
      type: String,
      min: 11,
      ma: 11,
      required: true,
    },
    // Name of the team (required)
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
      unique: true,
    },
    // Team leaders of the team (stored as an array of objects)
    teamLeaders: [
      {
        type: String, // Assuming email is a string
        ref: "Members", // Referencing the 'Members' model
      },
    ],
    // Members of the team (stored as an array of objects)
    members: [
      {
        type: String, // Assuming email is a string
        ref: "Members", // Referencing the 'Members' model
      },
    ],
    // City in which the team is located (required)
    city: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Department to which the team belongs (required)
    department: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Size of the team (required, minimum 0)
    size: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps to each team document
);

// Creating the "Teams" model using the TeamSchema
const Teams = mongoose.model("Teams", TeamSchema);

// Exporting the Teams model for use in other parts of the application
export default Teams;
