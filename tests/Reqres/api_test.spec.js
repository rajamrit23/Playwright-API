import { test, expect } from '@playwright/test';
import { ReqresAPI } from '../../Resources/reqresAPI.js';

let reqresAPI;

test.beforeAll(async ({ browser }) => {
  // Browser setup if needed
});

test.beforeEach(async ({ page }) => {
  reqresAPI = new ReqresAPI(page);
});

test.describe('Reqres API Tests', () => {
  test('Get Single User Data', async () => {
    const userId = 2;
    const response = await reqresAPI.getUserData(userId);
    
    reqresAPI.assertStatus(response.status, 200);
    reqresAPI.assertUserExists(response.body, userId);
    console.log('User Data:', response.body);
  });

  test('Get All Users', async () => {
    const response = await reqresAPI.getAllUsers(1);
    
    reqresAPI.assertStatus(response.status, 200);
    expect(response.body.data).toBeDefined();
    expect(response.body.data.length).toBeGreaterThan(0);
    console.log('All Users:', response.body);
  });

  test('Create New User', async () => {
    const userData = {
      name: 'John Doe',
      job: 'QA Engineer'
    };
    
    const response = await reqresAPI.createUser(userData);
    
    reqresAPI.assertStatus(response.status, 201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe(userData.name);
    console.log('Created User:', response.body);
  });

  test('Update User', async () => {
    const userId = 2;
    const updatedData = {
      name: 'Jane Doe',
      job: 'Senior QA Engineer'
    };
    
    const response = await reqresAPI.updateUser(userId, updatedData);
    
    reqresAPI.assertStatus(response.status, 200);
    expect(response.body.name).toBe(updatedData.name);
    console.log('Updated User:', response.body);
  });

  test('Delete User', async () => {
    const userId = 2;
    const response = await reqresAPI.deleteUser(userId);
    
    reqresAPI.assertStatus(response.status, 204);
    console.log('User deleted successfully');
  });

  test('User Login - Valid Credentials', async () => {
    const credentials = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    };
    
    const response = await reqresAPI.loginUser(credentials);
    
    reqresAPI.assertStatus(response.status, 200);
    expect(response.body.token).toBeDefined();
    console.log('Login Token:', response.body.token);
  });

  test('User Registration', async () => {
    const userData = {
      email: 'sydney@fife',
      password: 'pistol'
    };
    
    const response = await reqresAPI.registerUser(userData);
    
    reqresAPI.assertStatus(response.status, 200);
    expect(response.body.id).toBeDefined();
    expect(response.body.token).toBeDefined();
    console.log('Registered User:', response.body);
  });
});