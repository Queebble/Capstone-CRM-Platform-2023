import Members from "../models/Members.js";
import Organisations from "../models/Organisations.js";
import Teams from "../models/Teams.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

/* REGISTER ORGANISATION - Controller function for registering a new organization */
export const registerOrg = async (req, res) => {
  try {
    // Receive organization parameters from the request body
    const { ABN, name, email, phoneNumber, address } = req.body;

    // Create a new organization object using provided parameters
    const newOrg = new Organisations({
      ABN: ABN,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
    });

    // Save the new organization to the database
    const savedOrg = await newOrg.save();

    // Return the created organization in the response with status 201 (Created)
    res.status(201).json(savedOrg);
  } catch (error) {
    // Handle any errors that occur during the registration process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* REGISTER USER - Controller function for registering a new user */
export const registerUser = async (req, res) => {
  try {
    // Receive user parameters from the request body
    const {
      organisationID,
      name,
      email,
      password,
      title,
      city,
      position,
      owner,
      role,
      team,
    } = req.body;

    // Generate a bcrypt salt
    const salt = await bcrypt.genSalt();

    // Hash the user's password before saving it to the database
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user object using provided parameters with salted password
    const newUser = new Members({
      organisationID: organisationID,
      name: name,
      email: email,
      password: passwordHash,
      title: title,
      city: city,
      position: position,
      owner: owner,
      role: role,
      team: team,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Check if the user is part of a team and update the team accordingly
    if (newUser.team !== "-") {
      const email = newUser.email;
      const teamUpdate = {
        $push: {
          members: email,
        },
        $inc: { size: 1 }, // Increase team size by 1
      };

      // Update the team with the new member
      await Teams.updateOne({ name: newUser.team }, teamUpdate);
    }

    // Return the created user in the response with status 201 (Created)
    res.status(201).json(savedUser);
  } catch (error) {
    // Handle any errors that occur during the registration process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* LOGGING IN */
// Controller function for handling user login
export const login = async (req, res) => {
  try {
    // Receive login parameters from the request body
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await Members.findOne({ email: email });

    // Return an error status 400 if a user with the provided details cannot be found
    if (!user)
      return res
        .status(400)
        .json({ msg: "A user with that email does not exist." });

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    // Return an error status 400 if the password is incorrect
    if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Remove the unhashed password from the user object before sending the response
    delete user.password;

    // Return the user object and the JWT token in the response with status 200 (OK)
    res.status(200).json({ user, token });
  } catch (error) {
    // Handle any errors that occur during the login process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE USER - Controller function for updating user information */
export const updateUser = async (req, res) => {
  try {
    // Receive updated user parameters from the request body
    const {
      _id, // Assuming you have the user's ID to identify which user to update
      name,
      email,
      title,
      city,
      position,
      team,
      profileImage,
    } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's information with the provided parameters
    user.name = name;
    user.email = email;
    user.title = title;
    user.city = city;
    user.position = position;
    user.team = team;
    user.profileImage = profileImage;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE EMPLOYMENT - Controller function for updating employment history */
export const updateEmployment = async (req, res) => {
  try {
    // Receive user ID and updated employment history from the request body
    const { _id, employmentHistory } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's employment history with the provided data
    user.employmentHistory = employmentHistory;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE QUALIFICATIONS - Controller function for updating qualification history */
export const updateQualification = async (req, res) => {
  try {
    // Receive user ID and updated qualification history from the request body
    const { _id, qualifications } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's qualification history with the provided data
    user.qualifications = qualifications;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE RESPONSIBILITIES - Controller function for updating responsibility history */
export const updateResponsibility = async (req, res) => {
  try {
    // Receive user ID and updated responsibility history from the request body
    const { _id, responsibilities } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update the user's responsibility history with the provided data
    user.responsibilities = responsibilities;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    // Handle any errors that occur during the update process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* DELETE DEVELOPMENT PLAN - Controller function for deleting a development plan */
export const deleteDevelopmentPlan = async (req, res) => {
  try {
    // Receive user ID and development plan index from the request body
    const { _id, index } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the planIndex is within the bounds of the developmentPlans array
    if (index < 0 || index >= user.developmentPlans.length) {
      return res.status(400).json({ message: "Invalid plan index." });
    }

    // Remove the development plan at the specified index
    user.developmentPlans.splice(index, 1);

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ADD DEVELOPMENT PLAN - Controller function for creating a new development plan */
export const addDevelopmentPlan = async (req, res) => {
  try {
    // Receive development plan parameters from the request body
    const {
      _id,
      goal,
      action,
      successMeasure,
      status,
      startDate,
      endDate,
      notes,
    } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Create a new development plan object
    const newDevelopmentPlan = {
      goal: goal,
      action: action,
      successMeasure: successMeasure,
      status: status,
      startDate: startDate,
      endDate: endDate,
      notes: notes,
    };

    // Push the new development plan to the user's developmentPlans array
    user.developmentPlans.push(newDevelopmentPlan);

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 201 (Created)
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* EDIT DEVELOPMENT PLAN - Controller function for editing a development plan */
export const editDevelopmentPlan = async (req, res) => {
  try {
    // Receive development plan parameters from the request body
    const {
      _id, // Assuming you have the user's ID to identify which user to update
      index, // Index of the development plan to edit
      goal,
      action,
      successMeasure,
      status,
      startDate,
      endDate,
      notes,
    } = req.body;

    // Find the user in the database by their ID
    const user = await Members.findById(_id);

    // Return an error status 404 if the user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the index is within the bounds of the developmentPlans array
    if (index < 0 || index >= user.developmentPlans.length) {
      return res.status(400).json({ message: "Invalid plan index." });
    }

    // Get the development plan at the specified index
    const developmentPlanToUpdate = user.developmentPlans[index];

    // Update the development plan with the provided data
    developmentPlanToUpdate.goal = goal;
    developmentPlanToUpdate.action = action;
    developmentPlanToUpdate.successMeasure = successMeasure;
    developmentPlanToUpdate.status = status;
    developmentPlanToUpdate.startDate = startDate;
    developmentPlanToUpdate.endDate = endDate;
    developmentPlanToUpdate.notes = notes;

    // Save the updated user to the database
    const updatedUser = await user.save();

    // Return the updated user in the response with status 200 (OK)
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE TEAM - Controller function for creating a new team */
export const createTeam = async (req, res) => {
  try {
    const { organisationID, name, city, department, members, teamLeaders } =
      req.body;
    const allMembers = [...members, ...teamLeaders];

    // Define a function to save a member with team-related information
    const saveMember = async (email) => {
      const foundMember = await Members.findOne({ email: email });
      if (foundMember) {
        foundMember.team = name;
        if (!teamLeaders.includes(foundMember.email)) {
          foundMember.reportsTo = teamLeaders;
        } else {
          foundMember.leader = "Yes";
        }
        await foundMember.save();
        return foundMember;
      }
    };

    // Map and save members asynchronously
    const saveMembersPromises = allMembers.map(saveMember);
    const savedMembers = await Promise.all(saveMembersPromises);

    // Create a new team object with provided parameters
    const newTeam = new Teams({
      organisationID: organisationID,
      name: name,
      city: city,
      department: department,
      teamLeaders: teamLeaders,
      members: allMembers,
      size: savedMembers.length,
    });

    // Save the new team to the database
    const savedTeam = await newTeam.save();

    // Return the saved team in the response with status 201 (Created)
    res.status(201).json({ savedTeam });
  } catch (error) {
    // Handle any errors that occur during team creation with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* REMOVE TEAMS - Controller function for removing selected teams */
export const removeTeams = async (req, res) => {
  try {
    // Receive team IDs from the request body
    const teamIDs = req.body;

    // Map and process team deletion asynchronously
    const deletedTeams = await Promise.all(
      teamIDs.map(async (teamID) => {
        const _id = new mongoose.Types.ObjectId(teamID);

        // Find the team to delete by its ID
        const team = await Teams.findOne({ _id: _id });

        // Get the members of the team
        const teamMembers = team.members;

        // Update each team member's information
        await Promise.all(
          teamMembers.map(async (email) => {
            const foundMember = await Members.findOne({
              email: email,
            });
            if (foundMember) {
              // Remove the team being deleted from each member in the team
              foundMember.team = "-";
              foundMember.reportsTo = [];
              foundMember.leader = "No";
              await foundMember.save();
              return foundMember;
            }
          })
        );

        // Delete the team from the database
        const result = await Teams.deleteOne({ _id: _id });
        return result;
      })
    );

    // Return the deleted teams in the response with status 200 (OK)
    res.status(200).json(deletedTeams);
  } catch (error) {
    // Handle any errors that occur during team removal with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* REMOVE MEMBERS - Controller function for removing selected members */
export const removeMembers = async (req, res) => {
  try {
    // Receive member IDs from the request body
    const memberIDs = req.body;

    // Map member IDs to ObjectIDs
    const memberObjectIds = memberIDs.map(
      (memberID) => new mongoose.Types.ObjectId(memberID)
    );

    // Find members to delete
    const membersToDelete = await Members.find({
      _id: { $in: memberObjectIds },
    });

    // Define team updates object
    const teamUpdates = {};

    // Map and process members for deletion
    const memberDeletionPromises = membersToDelete.map(async (member) => {
      if (member.leader === "No" && member.owner === "No") {
        // Check if the member's leader field is "No"
        if (member.team !== "-") {
          if (!teamUpdates[member.team]) {
            teamUpdates[member.team] = {
              $pull: { members: member.email },
              $inc: { size: -1 }, // Decrease team size by 1
            };
          } else {
            teamUpdates[member.team].$inc.size -= 1;
          }
        }
        return Members.findByIdAndDelete(member._id);
      } else {
        return null; // Skip deletion if leader field is "Yes"
      }
    });

    // Execute member deletion promises
    const deletedResults = await Promise.all(memberDeletionPromises);

    // Calculate the count of deleted members
    const deletedCount = deletedResults.filter(
      (result) => result !== null
    ).length;

    // Update team sizes
    for (const teamName in teamUpdates) {
      await Teams.updateOne({ name: teamName }, teamUpdates[teamName]);
    }

    // Return response based on the deletion results
    if (deletedCount === membersToDelete.length) {
      res
        .status(204)
        .json({ message: `${deletedCount} members deleted successfully` });
    } else {
      res.status(200).json({
        message: `${deletedCount} members deleted successfully. A team leader cannot be deleted before their team.`,
      });
    }
  } catch (error) {
    // Handle any errors that occur during the removal process with status 500 (Internal Server Error)
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE USER - Controller function for updating user information */
export const addTeamMembers = async (req, res) => {
  try {
    // Receive updated user params from the request body
    const {
      orgID, // Assuming you have the user's ID to identify which user to update
      teamName,
      members,
      teamLeaders,
    } = req.body;

    const allMembers = [...members, ...teamLeaders];

    // Find the user in the database by their ID
    const team = await Teams.findOne({
      organisationID: orgID,
      name: teamName,
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Calculate the updated team size
    const updatedTeamSize = team.size + members.length + teamLeaders.length;

    // Add new members and team leaders to the team
    team.members.push(...members);
    team.members.push(...teamLeaders);
    team.teamLeaders.push(...teamLeaders);
    team.size = updatedTeamSize;

    // Define a function to save a member with team-related information
    const saveMember = async (email) => {
      const foundMember = await Members.findOne({ email: email });
      if (foundMember) {
        foundMember.team = teamName;
        if (!teamLeaders.includes(foundMember.email)) {
          foundMember.reportsTo = team.teamLeaders;
        } else {
          foundMember.leader = "Yes";
        }
        await foundMember.save();
        return foundMember;
      }
    };

    // Map and save members asynchronously
    const saveMembersPromises = allMembers.map(saveMember);
    const savedMembers = await Promise.all(saveMembersPromises);

    // Save the updated user to the database
    const updatedTeam = await team.save();

    // Return the updated user in the response
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* REMOVE TEAM MEMBERS - Controller function for removing members/team leaders from the team */
export const removeTeamMembers = async (req, res) => {
  try {
    // Receive removal parameters from the request body
    const {
      orgID, // Assuming you have the organization's ID to identify which team to update
      teamName,
      memberIDs, // Array of member MongoDB ID strings to remove
    } = req.body;

    // Convert the provided member IDs to ObjectId
    const memberObjectIds = memberIDs.map(
      (memberID) => new mongoose.Types.ObjectId(memberID)
    );

    // Find the members to be removed based on their ObjectId
    const membersToDelete = await Members.find({
      _id: { $in: memberObjectIds },
    });

    // Create an array of all member email addresses to be removed
    const allMembersToRemove = membersToDelete.map((member) => member.email);

    // Find the team in the database by organization ID and team name
    const team = await Teams.findOne({
      organisationID: orgID,
      name: teamName,
    });

    if (!team) {
      return res.status(404).json({ message: "Team not found." });
    }

    // Calculate the updated team size by subtracting the length of membersToRemove from the current team size
    const updatedTeamSize = team.size - allMembersToRemove.length;

    // Remove members from the team's members array
    team.members = team.members.filter(
      (memberEmail) => !allMembersToRemove.includes(memberEmail)
    );

    // Remove team leaders from the team's teamLeaders array
    team.teamLeaders = team.teamLeaders.filter(
      (teamLeaderEmail) => !allMembersToRemove.includes(teamLeaderEmail)
    );

    // Update the team size with the new calculated value
    team.size = updatedTeamSize;

    // Save the updated team to the database
    const updatedTeam = await team.save();

    // Update the members' team and reportsTo properties
    const updateMember = async (memberEmail) => {
      const foundMember = await Members.findOne({ email: memberEmail });
      if (foundMember) {
        foundMember.team = "-";
        foundMember.reportsTo = [];
        foundMember.leader = "No";
        await foundMember.save();
      }
    };

    // Update the properties for all members to be removed
    await Promise.all(allMembersToRemove.map(updateMember));

    // Return the updated team in the response
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
