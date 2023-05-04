import jwt from 'jsonwebtoken';
const JWT_SECRET = 'secret';
// Create a token from a payload
// once login is successful, we create a token and send it to the client
const createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};

// Verify the token
// when client sends a request, we verify the token and if it is valid, we send the data
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

// decode the token
const decodeToken = (token) => {
  return jwt.decode(token);
};

export { createToken, verifyToken, decodeToken };
