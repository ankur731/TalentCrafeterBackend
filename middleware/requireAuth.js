const jwt = require('jsonwebtoken');
const User = require("../models/User")

// Middleware to check if a user is logged in
const requireAuth = async(req, res, next)=> {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

//   jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
   
//       if (err) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // You can attach the user's information to the request object for subsequent middleware or route handlers
//     req.user = decodedToken;
//     next();
    //   });
    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        
        req.user = await User.findOne({ _id }).select('_id');
        
        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({error:"Request is not authorized"})
    }
}

module.exports = requireAuth;
