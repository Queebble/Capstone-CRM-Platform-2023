import jwt from "jsonwebtoken";

// Middleware function to verify the JWT token
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    // Check if the token is present in the request header
    if (!token) {
      return res.status(403).send("Access Denied"); // If no token is found, return 403 Forbidden status
    }

    // Extract the actual token value if it starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the JWT_SECRET from the environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // If the token is valid, store the user data from the token in the 'req.user' property
    req.user = verified;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    res.status(500).json({ message: err.message }); // If an error occurs during token verification, return 500 Internal Server Error status
  }
};
