const request = require('supertest');
const { app } = require('../src/app');
const { MONGODB_URI } = require('../config_test/jest.config');
const { mongoDBconnection, clearCollection } = require('../src/db/mongoDBconnection');

//connection to db
beforeAll(async () => {
  mongoDBconnection(MONGODB_URI);
});

// clear user collection for test with same valid user object
afterEach(async () => {
  clearCollection(MONGODB_URI);
});

const postUser = async (user) => {
  const res = await request(app).post('/public/user/register').send(user);
  return res;
};

describe('User Validation', () => {
  //Null, Undefined , Max length and Min length tests
  it.each([
    ['name', null, 'Name is required'],
    ['name', undefined, 'Name is required'],
    ['name', 'O', 'Name must be minimum 2 and less than 16 character'],

    ['surname', null, 'Surname is required'],
    ['surname', undefined, 'Surname is required'],
    ['surname', 'a', 'Surname must be minimum 2 and less than 16 character'],
    ['surname', 'a'.repeat(17), 'Surname must be minimum 2 and less than 16 character'],

    ['password', null, 'Password is required'],
    ['password', undefined, 'Password is required'],
    ['password', '1234', 'Password must be minimum 6 and less than 24 character'],
    ['password', 'TESTPASS', 'Password must have at least 1 uppercase, 1 lowercase and 1 number'],
    ['password', 'testpass', 'Password must have at least 1 uppercase, 1 lowercase and 1 number'],
    ['password', 'Testpass', 'Password must have at least 1 uppercase, 1 lowercase and 1 number'],

    ['email', null, 'Email is required'],
    ['email', undefined, 'Email is required'],
    ['email', 'test.com', 'Email must be valid'],
    ['email', 'test@.com', 'Email must be valid'],
    ['email', 'test]@hotmail.com', 'Email must be valid'],
  ])('400 => If %s is %s, SEND %s', async (field, value, expectedMessage) => {
    const user = {
      name: 'Test1',
      surname: 'Test1',
      email: 'test1@hotmail.com',
      isAdmin: false,
      password: 'A1test',
    };
    user[field] = value;
    const response = await postUser(user);

    expect(response.body.message[field]).toBe(expectedMessage);

    expect(response.status).toBe(400);
  });
  // UNIQUE EMAIL AND USERNAME TEST
  it.each([['email', 'This email is already exist']])(
    '401 => If %s is exist, SEND %s ',
    async (field, expectedMessage) => {
      const user = {
        name: 'Test1',
        surname: 'Test1',
        email: 'test@hotmail.com',
        isAdmin: false,
        password: 'A1test',
      };
      await postUser(user);
      const res = await postUser(user);
      expect(res.body.message[`${field}`]).toBe(expectedMessage);
      expect(res.status).toBe(401);
    }
  );
});
