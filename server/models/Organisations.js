import mongoose from "mongoose";

// Defining the OrganisationSchema
const OrganisationSchema = new mongoose.Schema(
  {
    // Australian Business Number (ABN) of the organization (unique and required)
    ABN: {
      type: String,
      min: 11,
      max: 11,
      required: true,
      unique: true,
    },
    // Name of the organization (required)
    name: {
      type: String,
      required: true,
      min: 2,
      max: 200,
    },
    // Email address of the organization (required and unique)
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    // Phone number of the organization (required)
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    // Address of the organization (stored as an array of objects)
    address: [
      {
        street: {
          type: String,
          required: true,
        },
        suburb: {
          type: String,
          required: true,
        },
        postcode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps to each organization document
);

// Creating the "Organisations" model using the OrganisationSchema
const Organisations = mongoose.model("Organisations", OrganisationSchema);

export default Organisations;
