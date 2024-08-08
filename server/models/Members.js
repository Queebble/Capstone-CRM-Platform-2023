import mongoose from "mongoose";

// Defining the MemberSchema
const MemberSchema = new mongoose.Schema(
  {
    // Organization ID to which the member belongs
    organisationID: {
      type: String,
      min: 11,
      max: 11,
      required: true,
    },
    // Name of the member
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    // Email of the member (unique to each member)
    email: {
      type: String,
      required: true,
      max: 100,
      unique: true,
    },
    // Password for the member
    password: {
      type: String,
      required: true,
      min: 4,
    },
    // Title or designation of the member
    title: {
      type: String,
      required: true,
      min: 2,
    },
    // City in which the member is located
    city: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    // Team to which the member belongs (optional, default: "-")
    team: {
      type: String,
      min: 2,
      max: 100,
      default: "-",
    },
    leader: {
      type: String,
      min: 2,
      max: 5,
      default: "No",
    },
    owner: {
      type: String,
      min: 2,
      max: 5,
      default: "No",
    },
    // Position or role of the member
    position: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    // Supervisor or person to whom the member reports (optional, default: "-")
    reportsTo: [
      {
        type: String, // Assuming email is a string
        ref: "Members", // Referencing the 'Members' model
      },
    ],
    // Responsibilities of the member (stored as an array of objects)
    responsibilities: [
      {
        responsibility: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
      },
    ],
    // Qualifications of the member (stored as an array of objects)
    qualifications: [
      {
        type: Object,
        default: {},
        qualification: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
      },
    ],
    // Employment history of the member (stored as an array of objects)
    employmentHistory: [
      {
        type: Object,
        default: {},
        employer: {
          type: String,
          required: true,
          min: 2,
          max: 100,
        },
        position: {
          type: String,
          required: true,
          min: 2,
          max: 100,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
      },
    ],
    developmentPlans: [
      {
        type: Object,
        default: {},
        goal: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
        action: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
        successMeasure: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          required: true,
          min: 2,
          max: 100,
        },
        notes: {
          type: String,
          required: true,
          min: 2,
          max: 500,
        },
      },
    ],
    // Employment history of the member (stored as an array of objects)
    assessments: [
      {
        assessmentName: {
          type: String,
          required: true,
          min: 2,
          max: 50,
        },
        completed: {
          type: Boolean,
          required: true,
          default: false,
        },
        password: {
          type: String,
          required: true,
        },
        link: {
          type: String,
        },
        assignedBy: {
          type: String, // Assuming email is a string
          ref: "Members", // Referencing the 'Members' model
        },
        assignedDate: {
          type: Date,
          required: true,
          default: Date.now,
        },
        completionDate: {
          type: Date,
          default: null,
        },
      },
    ],
    // Role of the member within the organization (enum with default value: "member")
    role: {
      type: String,
      enum: ["member", "teamleader", "orgowner", "superadmin"],
      default: "member",
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps to each member document
);

// Creating the "Members" model using the MemberSchema
const Members = mongoose.model("Members", MemberSchema);

export default Members;
