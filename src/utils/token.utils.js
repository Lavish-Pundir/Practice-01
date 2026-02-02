import jwt from "jsonwebtoken";

export const generateToken = (payload, secret, expiresIn = "2h") => {
    return jwt.sign(payload, secret, { expiresIn })
};

export const veryfyToken = (token, secret) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
};


// optional: you can add more utility functions related to token management here
export const decodeToken = (token) => {
    return jwt.decode(token);
};

