const request = require('supertest');
const { app } = require('../src/app');
const User = require('../src/models/userModel');
const { MONGODB_URI } = require('../config_test/jest.config');
const { mongoDBconnection, clearCollection } = require('../src/db/mongoDBConnection');

//connection to db
beforeAll(async () => {
  mongoDBconnection(MONGODB_URI);
});

// clear user collection for test with same valid user object
afterEach(async () => {
  clearCollection(MONGODB_URI);
});

// for registeration test
const validUser = {
  name: 'Test1',
  surname: 'Test1',
  email: 'test1@hotmail.com',
  isAdmin: false,
  password: 'A1test',
};

// @  /api/register is triggered with default => validUser argument
const postUser = async (user) => {
  const res = await request(app).post('/public/user/register').send(user);
  return res;
};

// VALID USER REGISTERATION PROCESS
describe('User Registeration', () => {
  it('201 => If it is VALID USER, send success MESSAGE', async () => {
    const res = await postUser(validUser);

    expect(res.status).toBe(201);

    expect(res.body.message).toBe('Signed up successfully');
  });

  it('201 => If It is VALID USER save it to DATABASE', async () => {
    await postUser(validUser);
    const email = validUser.email;
    const existingUser = await User.findOne({ email });
    expect(existingUser.email).toBe('test1@hotmail.com');
  });

  it('201 => If it is VALID USER, user password must not be saved by directly to DATABASE(hash)', async () => {
    await postUser(validUser);
    const { email } = validUser;
    const existingUser = await User.findOne({ email });

    expect(existingUser.password).not.toBe('123456');
  });

  it('201 => If It is VALID USER, except password, all properties must be same ', async () => {
    const res = await postUser(validUser);
    const userInDb = await User.findOne(res.body.user);
    expect(userInDb.name).toBe(validUser.name);
    expect(userInDb.surname).toBe(validUser.surname);
    expect(userInDb.email).toBe(validUser.email);
    const isMatched = await userInDb.matchPassword(validUser.password);
    expect(isMatched).toBe(true);
  });
});
