import{test,expect,request} from '@playwright/test';
require('dotenv').config();
let apiContext;



test.describe.serial('GitHub API Tests', () => {
    test.beforeAll(async () => {
        apiContext = await request.newContext({
            baseURL: 'https://api.github.com',
            extraHTTPHeaders: {
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': process.env.Git_token
        },
        });
    });

    test.afterAll(async () => {
    await apiContext.dispose();
  });

    test('Get User Data', async () => {
        const response = await apiContext.get(`repos/${process.env.gitOwner}/${process.env.getRepo}`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect.soft(data.owner.login).toBe(process.env.gitOwner);
    });
    test('Create Repository', async () => {
        const repoData={
            name: process.env.postRepo,
            description: 'This is a test repository created via API',
            private: false
        }
        const response = await apiContext.post('user/repos', {
            data: repoData
        });
        expect(response.status()).toBe(201);
        const data = await response.json();
        expect.soft(data.name).toBe(repoData.name);
    });

    test('Upate Repository Description', async () => {
        const updatedData={
            description: 'Updated description via API'
        }
        const response = await apiContext.patch(`repos/${process.env.gitOwner}/${process.env.getRepo}`, {
            data: updatedData
        });
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect.soft(data.description).toBe(updatedData.description);
    });
    test('Delete Repository', async () => {
        const response = await apiContext.delete(`repos/${process.env.gitOwner}/${process.env.postRepo}`);
        expect(response.status()).toBe(204);
    });
});