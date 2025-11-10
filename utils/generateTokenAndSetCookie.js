import jwt from "jsonwebtoken";

//Function to generate a token and set it to cookie
export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn : '15d'
    });
    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000, //Maximum validity of cookie in milli-seconds
        httpOnly: true, // To protect from XSS (Cross-site-scriptiong) attacks
        sameSite: "strict", // To protect from CSRF(Cross-Site-Request-Forgery) attacks
        // secure: process.env.NODE_ENV !== "development" //Secure only in production environment
    })
};