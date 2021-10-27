const faker = require('faker');

class UserService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        image: faker.image.people(90, 90),
      });
    }
  }
  create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newProduct);
    return {
      newProduct,
    };
  }
  find() {
    return this.users;
  }
  findOne(id) {
    return this.users.find((item) => item.id === id);
  }
  update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    } else {
      this.users[index] = { ...this.users[index], ...changes };

      return this.users[index];
    }
  }
  delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error('user not found');
    } else {
      this.users.slice(index, 1);
      return { message: 'usuario eliminado con éxito' };
    }
  }
}

module.exports = UserService;
