function generateUser() {
  const randomNumber = Math.random().toString().slice(2);
  const userFirstName = `name${randomNumber}`;
  const userLastName = `last${randomNumber}`;
  const email = `${userFirstName}@mail.com`;

  return { userFirstName, userLastName, email };
}

module.exports= {generateUser};