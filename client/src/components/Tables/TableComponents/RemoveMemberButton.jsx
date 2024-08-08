import React, { useState } from "react";
import { Button, Typography, useTheme, Box, Container } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import { toast } from "react-toastify";

// Asynchronous function to remove a team member.
const removeMember = async (rows) => {
  // Make a POST request to remove the member.
  const savedUserResponse = await fetch(
    `${process.env.REACT_APP_BASE_URL}/auth/removeMember`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(rows),
    }
  );

  // Display success/error messages based on response status.
  if (savedUserResponse) {
    savedUserResponse.status === 204
      ? toast.success("Members successfully deleted!")
      : toast.warning(
          "Some members could not be deleted as they are a team leader or the organisation owner."
        );
  } else {
    toast.error("Error occured: members could not be deleted");
  }
};

// Define the RemoveMemberButton component which takes in rows and handleRerender as props.
const RemoveMemberButton = ({ rows, handleRerender }) => {
  // Hooks for theme and visibility state of the form.
  const theme = useTheme();
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handle the click event of the delete member button.
  const handleButtonClick = () => {
    rows.length !== 0 ? setIsFormVisible(true) : setIsFormVisible(false);
  };

  // Handle the actual removal of members.
  const handleRemoveMembers = () => {
    removeMember(rows);
    setIsFormVisible(false);
    handleRerender();
  };

  // Render the button and modal-like form when clicked.
  return (
    <Box
      sx={{
        margin: "0px 20px 0px auto",
      }}
    >
      <Button
        onClick={handleButtonClick}
        startIcon={
          <PersonRemoveAlt1RoundedIcon
            sx={{ color: theme.palette.textoffblack.default }}
          />
        }
        sx={{
          textTransform: "none",
          borderRadius: "15px",
          borderColor: theme.palette.textoffblack.default,
        }}
      >
        <Typography variant="h5" color={theme.palette.textoffblack.default}>
          Delete Member
        </Typography>
      </Button>

      {/* Modal-like form to confirm deletion of member */}
      {isFormVisible && (
        <Box
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Container
            component="main"
            maxWidth="sm"
            style={{
              backgroundColor: "#fff",
              padding: "0px 20px 20px 20px",
              borderRadius: "0.55rem",
            }}
          >
            <Box
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Content of the confirmation form */}
              <Box
                sx={{
                  marginTop: 6,
                }}
              >
                <Typography variant="h4">
                  Are you sure you want to delete these members?
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pt: "10px",
                  }}
                >
                  <Button
                    onClick={() => setIsFormVisible(false)}
                    sx={{ marginTop: "12px" }}
                  >
                    No
                  </Button>

                  <Button
                    variant="contained"
                    onClick={handleRemoveMembers}
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    Yes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default RemoveMemberButton;
