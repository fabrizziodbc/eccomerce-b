const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTYzNjMwMjg3N30.cCDDmlN92QRYyWuqf4spJ30HuhYE5VD2TwBG5l_8XM8';

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

const payload = verifyToken(token, secret);
console.log(payload);
