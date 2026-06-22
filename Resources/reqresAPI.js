import { expect } from '@playwright/test';

export class ReqresAPI {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.REQRES_BASE_URL || 'https://reqres.in/api';
  }

  // GET - Fetch single user
  async getUserData(userId) {
    const response = await this.page.request.get(`${this.baseUrl}/users/${userId}`);
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // GET - Fetch all users with pagination
  async getAllUsers(page = 1) {
    const response = await this.page.request.get(`${this.baseUrl}/users?page=${page}`);
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // POST - Create a new user
  async createUser(userData) {
    const response = await this.page.request.post(`${this.baseUrl}/users`, {
      data: userData
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // PUT - Update user
  async updateUser(userId, userData) {
    const response = await this.page.request.put(`${this.baseUrl}/users/${userId}`, {
      data: userData
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // DELETE - Delete user
  async deleteUser(userId) {
    const response = await this.page.request.delete(`${this.baseUrl}/users/${userId}`);
    return {
      status: response.status()
    };
  }

  // POST - User Login
  async loginUser(credentials) {
    const response = await this.page.request.post(`${this.baseUrl}/login`, {
      data: credentials
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // POST - User Register
  async registerUser(userData) {
    const response = await this.page.request.post(`${this.baseUrl}/register`, {
      data: userData
    });
    return {
      status: response.status(),
      body: await response.json()
    };
  }

  // Assertion helpers
  assertStatus(status, expectedStatus) {
    expect(status).toBe(expectedStatus);
  }

  assertUserExists(responseBody, userId) {
    expect(responseBody.data).toBeDefined();
    expect(responseBody.data.id).toBe(userId);
  }

  assertUserHasRequiredFields(userData) {
    expect(userData.id).toBeDefined();
    expect(userData.email).toBeDefined();
    expect(userData.first_name).toBeDefined();
    expect(userData.last_name).toBeDefined();
  }
}