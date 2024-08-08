import React from "react";
import {
  Typography,
  Box,
  TextField,
  IconButton,
  useTheme,
  Avatar,
} from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import { toast } from "react-toastify";

// Define the DropZone component that will render an area where users can drag and drop or select an image.
const DropZone = ({ className, onImageUpload }) => {
  // useState hook to store the selected or dropped image.
  const [image, setImage] = useState(null);

  // Access the current theme properties using Material-UI's useTheme hook.
  const theme = useTheme();

  // Define the function that will handle the dropped or selected image.
  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
          setImage(reader.result);
          // Call the callback function to pass the uploaded image back to the parent component.
          onImageUpload(reader.result);
        };

        reader.readAsDataURL(file);
      } else if (rejectedFiles.length) {
        // Notify the user if the uploaded image exceeds the size limit.
        toast.error("Image is too large. Max size is 1MB.");
      }
    },
    [onImageUpload]
  );

  // Initialize the dropzone hook with the specified configurations.
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000, // 1MB size limit
  });

  // Function to remove the selected or dropped image.
  const removeImage = () => {
    setImage(null);
  };

  // Render the DropZone component.
  return (
    <Box paddingTop="10px">
      <Box {...getRootProps({ className: className })}>
        <TextField {...getInputProps()} />
        {isDragActive ? (
          // Displayed when the user is dragging over the dropzone.
          <Typography>Drop the files here...</Typography>
        ) : (
          // Default content of the dropzone.
          <Box>
            <Typography variant="h5">
              Drag and drop, or click to select your profile picture.
            </Typography>
            <Typography variant="h6">
              (Max 1 file, Max size 1mb - optional)
            </Typography>
          </Box>
        )}
      </Box>
      {/* Display the preview of the image once it's uploaded. */}
      {image && (
        <Box
          paddingTop="10px"
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5" paddingBottom="5px">
            Profile Image Preview:
          </Typography>
          <Avatar
            src={image}
            alt="Preview"
            sx={{ height: "150px", width: "150px" }}
          />
          {/* Button to remove the uploaded image. */}
          <IconButton
            color={theme.palette.textoffblack.default}
            onClick={removeImage}
            sx={{ marginTop: "-150px", marginLeft: "150px" }}
          >
            <RemoveCircleOutlineRoundedIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

// Export the DropZone component for use in other parts of the application.
export default DropZone;
