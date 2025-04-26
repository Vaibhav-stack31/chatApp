import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true,
        secure: true,               // Required for HTTPS (Render uses HTTPS)
        sameSite: "None"            // Required for cross-origin cookies
    });

    return token;
};
