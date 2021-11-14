const bcrypt = require('bcrypt');

const verifyPassword = async () => {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$pmcWLN9OCFDqr/T3/ALsEuoWpytRyb5X1KBkctM7Ujc3tv2tCb0o6';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
};

verifyPassword();
