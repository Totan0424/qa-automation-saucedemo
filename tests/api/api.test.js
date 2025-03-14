import { test, expect } from '@playwright/test'; // Import Playwright's test and expect functions
import request from 'supertest'; // Import Supertest for making API requests

const baseUrl = 'https://reqres.in/api'; // Define the base URL for the API

// Test case: Validate error response for invalid login credentials
test('should return an error for invalid login (Reqres API)', async () => {
    const response = await request(baseUrl)
        .post('/login') // Make a POST request to the login endpoint
        .send({
            email: 'invalid_user@example.com', // Invalid email
            password: 'invalid_pass' // Invalid password
        });

    expect(response.status).toBe(400); // Expect HTTP status 400 (Bad Request)
    expect(response.body).toHaveProperty('error'); // Expect response to contain an error message
});

// Test case: Validate successful login with correct credentials
test('should successfully log in with valid credentials (Reqres API)', async () => {
    const response = await request(baseUrl)
        .post('/login') // Make a POST request to the login endpoint
        .send({
            email: 'eve.holt@reqres.in', // Valid email
            password: 'cityslicka' // Valid password
        });

    expect(response.status).toBe(200); // Expect HTTP status 200 (OK)
    expect(response.body).toHaveProperty('token'); // Expect response to contain a token
});

// Test case: Fetch a list of users
test('should fetch user list (Reqres API)', async () => {
    const response = await request(baseUrl).get('/users?page=2'); // Make a GET request to fetch user list
    expect(response.status).toBe(200); // Expect HTTP status 200 (OK)
    expect(Array.isArray(response.body.data)).toBe(true); // Ensure the response contains an array of users
});

// Test case: Fetch details of a specific user
test('should return user details (Reqres API)', async () => {
    const userId = 2; // Define the user ID to fetch
    const response = await request(baseUrl).get(`/users/${userId}`); // Make a GET request for user details

    expect(response.status).toBe(200); // Expect HTTP status 200 (OK)
    expect(response.body.data).toHaveProperty('id', userId); // Verify the returned user ID matches the expected value
});
