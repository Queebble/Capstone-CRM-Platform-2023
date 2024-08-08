import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create an API instance with multiple endpoints
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }), // Configure the base URL for all requests
  reducerPath: "adminApi", // Define the slice name for the reducer that will be created
  tagTypes: [
    "Login",
    "Member",
    "Team",
    "Teams",
    "Members",
    "Organisation",
    "Organisations",
    "TeamlessMembers",
    "MemberToken",
    "TeamAssessments",
  ], // Define tag types used for cache invalidation

  // Define endpoints for various API requests
  endpoints: (build) => ({
    // Query to get a member by token
    getMemberByToken: build.query({
      query: ({ token }) => ({
        url: `client/member/token/${token}`, // Specify the URL for retrieving a member by token
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { token },
      }),
      providesTags: ["MemberToken"], // Tag for cache invalidation
    }),

    // Query to get a member by email
    getMember: build.query({
      query: ({ email, token }) => ({
        url: `client/member/${email}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { email },
      }),
      providesTags: ["Member"], // Tag for cache invalidation
    }),

    // Query to get a member by email
    getMembersByEmail: build.query({
      query: ({ teamEmails, token }) => ({
        url: `client/members/emails`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { teamEmails },
      }),
      providesTags: ["TeamMembers"], // Tag for cache invalidation
    }),

    // Query to get a member by email
    getAssessments: build.query({
      query: ({ organisationID, token }) => ({
        url: `client/assessments`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { organisationID },
      }),
      providesTags: ["TeamMembers"], // Tag for cache invalidation
    }),

    // Query to get teams with pagination, sorting, and searching options
    getTeams: build.query({
      query: ({ page, pageSize, sort, search, token, organisationID }) => ({
        url: "client/teams",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, sort, search, organisationID },
      }),
      providesTags: ["Teams"], // Tag for cache invalidation
    }),

    // Query to get members with pagination, sorting, and searching options
    getMembers: build.query({
      query: ({ page, pageSize, sort, search, token, organisationID }) => ({
        url: "client/members",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, sort, search, organisationID },
      }),
      providesTags: ["Members"], // Tag for cache invalidation
    }),

    // Query to get teamless members
    getTeamlessMembers: build.query({
      query: ({ token, organisationID }) => ({
        url: "client/teamlessmembers",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { organisationID },
      }),
      providesTags: ["TeamlessMembers"], // Tag for cache invalidation
    }),

    // Query to get the total number of members
    getTeamSizes: build.query({
      query: ({ token, organisationID }) => ({
        url: "client/teams/size",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { organisationID },
      }),
      providesTags: ["TeamSizes"], // Tag for cache invalidation
    }),

    // Query to get the total number of members
    getTotalMembers: build.query({
      query: ({ token, organisationID }) => ({
        url: "client/members/total",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { organisationID },
      }),
      providesTags: ["TotalMembers"], // Tag for cache invalidation
    }),

    // Query to get the total number of teams
    getTotalTeams: build.query({
      query: ({ token, organisationID }) => ({
        url: "client/teams/total",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { organisationID },
      }),
    }),

    // Query to get all organizations
    getOrganisations: build.query({
      query: () => "client/organisations",
      providesTags: ["Organisations"], // Tag for cache invalidation
    }),

    getTeam: build.query({
      query: ({ abn, teamName, token }) => ({
        url: `client/${abn}/${teamName}`,
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { abn, teamName, token },
      }),
      providesTags: ["Team"], // Tag for cache invalidation
    }),

    // Query to get the assessments of each member in a team
    getTeamMembers: build.query({
      query: ({ page, pageSize, sort, token, teamName, orgID }) => ({
        url: "client/teams/members",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { page, pageSize, sort, teamName, orgID },
      }),
      providesTags: ["TeamMembers"], // Tag for cache invalidation
    }),

    // Query to get the assessments of each member in a team
    getTeamAssessments: build.query({
      query: ({ token, teamName, orgID }) => ({
        url: "client/teams/assessments",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        params: { teamName, orgID },
      }),
      providesTags: ["TeamAssessments"], // Tag for cache invalidation
    }),

    // Query to get the assessments of each member in a team
    getReports: build.query({
      query: ({ passwords, access_code, report, lang }) => ({
        url: "finxs/getReport",
        method: "GET",
        params: { passwords, access_code, report, lang },
      }),
      providesTags: ["Reports"], // Tag for cache invalidation
    }),

    //TODO From here onwards have not been implemented or tested in client-side

    getCheckOrg: build.query({
      query: ({ abn }) => ({
        url: `client/organisation/check/${abn}`,
        method: "GET",
        params: { abn },
      }),
      providesTags: [""], // Tag for cache invalidation
    }),

    getCheckMember: build.query({
      query: ({ email }) => ({
        url: `client/member/check/${email}`,
        method: "GET",
        params: { email },
      }),
      providesTags: [""], // Tag for cache invalidation
    }),

    // Mutation to register an organization
    postRegisterOrg: build.mutation({
      query: ({ ABN, name, email, phoneNumber, address }) => ({
        url: `auth/registerOrganisation`,
        method: "POST",
        body: { ABN, name, email, phoneNumber, address },
      }),
      providesTags: ["Organisation"], // Invalidate the relevant cache tags to reflect the updated data
    }),

    // Mutation to register a user
    postRegisterUser: build.mutation({
      query: ({
        organisationID,
        name,
        email,
        password,
        title,
        city,
        position,
        owner,
        role,
      }) => ({
        url: `auth/registerUser`,
        method: "POST",
        body: {
          organisationID,
          name,
          email,
          password,
          title,
          city,
          position,
          owner,
          role,
        },
      }),
      invalidatesTags: [""], // Invalidate the relevant cache tags
    }),

    // Mutation to log in a user
    postUserLogin: build.mutation({
      query: ({ email, password }) => ({
        url: `auth/login`,
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Login"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users details
    postUpdateUser: build.mutation({
      query: ({
        _id,
        name,
        email,
        title,
        city,
        position,
        team,
        profileImage,
        token,
      }) => ({
        url: `auth/updateUser`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, name, email, title, city, position, team, profileImage },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users employment
    postUpdateEmployment: build.mutation({
      query: ({ _id, employmentHistory, token }) => ({
        url: `auth/updateEmployment`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, employmentHistory },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users qualifications
    postUpdateQualification: build.mutation({
      query: ({ _id, qualifications, token }) => ({
        url: `auth/updateQualification`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, qualifications },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users responsibilities
    postUpdateResponsibility: build.mutation({
      query: ({ _id, responsibilities, token }) => ({
        url: `auth/updateResponsibility`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, responsibilities },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users responsibilities
    postDeleteDevelopmentPlan: build.mutation({
      query: ({ _id, index, token }) => ({
        url: `auth/deleteDevelopmentPlan`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, index },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users responsibilities
    postAddDevelopmentPlan: build.mutation({
      query: ({
        _id,
        goal,
        action,
        successMeasure,
        status,
        startDate,
        endDate,
        notes,
        token,
      }) => ({
        url: `auth/addDevelopmentPlan`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          _id,
          goal,
          action,
          successMeasure,
          status,
          startDate,
          endDate,
          notes,
        },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a users responsibilities
    postEditDevelopmentPlan: build.mutation({
      query: ({
        _id,
        index,
        goal,
        action,
        successMeasure,
        status,
        startDate,
        endDate,
        notes,
        token,
      }) => ({
        url: `auth/editDevelopmentPlan`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: {
          _id,
          index,
          goal,
          action,
          successMeasure,
          status,
          startDate,
          endDate,
          notes,
        },
      }),
      invalidatesTags: ["Member"], // Invalidate the relevant cache tags
    }),

    // Mutation to update a teams details
    postUpdateTeam: build.mutation({
      query: ({ _id, name, department, city, token }) => ({
        url: `auth/updateTeam`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: { _id, name, department, city },
      }),
      invalidatesTags: ["Member", "Team"], // Invalidate the relevant cache tags
    }),

    // Mutation to create a team
    postCreateTeam: build.mutation({
      query: ({
        organisationID,
        name,
        city,
        department,
        members,
        teamLeaders,
      }) => ({
        url: `auth/createTeam`,
        method: "POST",
        body: { organisationID, name, city, department, members, teamLeaders },
      }),
      invalidatesTags: ["Team"], // Invalidate the relevant cache tags
    }),

    // Mutation to remove a team
    postRemoveTeam: build.mutation({
      query: (rows) => ({
        url: `auth/removeTeam`,
        method: "POST",
        body: rows,
      }),
      invalidatesTags: ["Member", "TeamMembers"], // Invalidate the relevant cache tags
    }),

    // Mutation to remove a member
    postRemoveMember: build.mutation({
      query: ({ memberIDs }) => ({
        url: `auth/removeMember`,
        method: "POST",
        body: { memberIDs },
      }),
      invalidatesTags: ["Members"], // Invalidate the relevant cache tags
    }),

    // Mutation for Finxs authentication
    postFinxsAuth: build.mutation({
      query: () => ({
        url: `/finxs/auth`,
        method: "POST",
      }),
      providesTags: [""], // Invalidate the relevant cache tags
    }),

    // Mutation to generate passwords
    postGeneratePasswords: build.mutation({
      query: ({ requestInfo }) => ({
        url: "finxs/passwords",
        method: "POST",
        body: { requestInfo },
      }),
      providesTags: [""], // Invalidate the relevant cache tags
    }),

    // Mutation to check password statuses
    postCheckPasswordStatuses: build.mutation({
      query: ({ requestInfo }) => ({
        url: `finxs/checkPasswords`,
        method: "POST",
        body: { requestInfo },
      }),
      providesTags: [""], // Invalidate the relevant cache tags
    }),

    // Mutation to add assessments
    postAddAssessments: build.mutation({
      query: ({ assessments }) => ({
        url: `finxs/addAssessments`,
        method: "POST",
        body: { assessments },
      }),
      providesTags: [""], // Invalidate the relevant cache tags
    }),

    // Mutation to update assessments
    postUpdateAssessments: build.mutation({
      query: ({ updateInfo }) => ({
        url: `finxs/updateAssessments`,
        method: "POST",
        body: { updateInfo },
      }),
      providesTags: [""], // Invalidate the relevant cache tags
    }),
  }),
});

// Destructure and export the generated hooks for each query
export const {
  useGetMemberByTokenQuery,
  useGetMemberQuery,
  useGetMembersByEmailQuery,
  useGetAssessmentsQuery,
  useGetTeamQuery,
  useGetTeamsQuery,
  useGetMembersQuery,
  useGetTotalTeamsQuery,
  useGetTotalMembersQuery,
  useGetOrganisationsQuery,
  useGetTeamlessMembersQuery,
  useGetTeamAssessmentsQuery,
  useGetTeamMembersQuery,
  useGetTeamSizesQuery,
  useGetReportsQuery,
  //TODO From here onwards most of these not been implemented or tested in client-side
  useGetCheckOrgQuery,
  useGetCheckMemberQuery,
  usePostRegisterOrgMutation,
  usePostRegisterUserMutation,
  usePostUserLoginMutation,
  usePostUpdateUserMutation,
  usePostUpdateQualificationMutation,
  usePostUpdateResponsibilityMutation,
  usePostUpdateEmploymentMutation,
  usePostDeleteDevelopmentPlanMutation,
  usePostAddDevelopmentPlanMutation,
  usePostEditDevelopmentPlanMutation,
  usePostUpdateTeamMutation,
  usePostCreateTeamMutation,
  usePostRemoveTeamMutation,
  usePostRemoveMemberMutation,
  usePostFinxsAuthMutation,
  usePostGeneratePasswordsMutation,
  usePostCheckPasswordStatusesMutation,
  usePostAddAssessmentsMutation,
  usePostUpdateAssessmentsMutation,
} = api;
