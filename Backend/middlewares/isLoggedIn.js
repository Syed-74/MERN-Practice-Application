const jwt = require("jsonwebtoken");
const User = require("../models/Users/User");


const isLoggedIn =  (req, res, next) => {
  console.log("Is LoggedIn Executed!");
  //Fetch the token from Request Header
  const token = req.headers.authorization?.split(" ")[1];
  //Verify the token
  jwt.verify(token, process.env.JWT_SECRET,async (err, decoded) => {
    // if unsuccessful, return unauthorized error
    if (err) {
      return res
        .status(401)
        .json({ status: "fail", message: "Unauthorized: Invalid token" });
    } else {
         // if successful, proceed to next middleware or route handler
         const userId = decoded?.user?.id;
         const user = await User.findById(userId).select("username email role _id");
         console.log(user); 
          req.userAuth = user; // Attach user info to request object
      next();
    }

  });

 

  
};

export default isLoggedIn;

// import jwt from "jsonwebtoken";
// import User  from "../models/Users/User";

// /**
//  * Authentication middleware
//  * Requires header: Authorization: Bearer <token>
//  */
// const isLoggedIn = (req, res, next) => {
//   try {
//     // 1️⃣ Read Authorization header (case-insensitive safe)
//     const authHeader =
//       req.headers.authorization || req.headers.Authorization;

//     if (!authHeader) {
//       return res
//         .status(401)
//         .json({ message: "Not authorized, no Authorization header" });
//     }

//     // 2️⃣ Validate Bearer format
//     const parts = authHeader.split(" ");
//     if (parts.length !== 2 || parts[0] !== "Bearer") {
//       return res
//         .status(401)
//         .json({ message: "Not authorized, invalid Authorization format" });
//     }

//     const token = parts[1].trim();
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Not authorized, token missing" });
//     }

//     // 3️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 4️⃣ Attach decoded payload to request
//     req.user = decoded; // { id, email, role, ... }

//     // 5️⃣ Continue
//     next();
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ message: "Not authorized, token invalid or expired" });
//   }
// };

// export default isLoggedIn;
