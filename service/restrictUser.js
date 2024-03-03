const jwt = require('jsonwebtoken')

const restrictToLoggedInUserOnly = async (req,res,next) =>{
    try{
        const token = req.headers.token
        if (token === null) {
            return res.status(401).json({ msg: 'Unauthorized - Missing token' });
        }
        
        jwt.verify(token, 'TVSM', (err, decoded) => {
            const expirationDate = new Date(decoded.exp * 1000);
            const localExpirationDate = expirationDate.toLocaleString();
            console.log('Token expires at (local time):', localExpirationDate);
            console.log('Decoded Token:', decoded);
            next();

            if (err) {
                return res.status(401).json({ msg: 'Unauthorized - Invalid token' });
            }
        });
    }catch(err){
        return res.status(500).json({msg : "Internal Server Error", error : err});
    }
}
  
module.exports = {
    restrictToLoggedInUserOnly
}