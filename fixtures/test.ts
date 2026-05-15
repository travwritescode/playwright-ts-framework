import { test as base } from '@playwright/test';
import { createTask, deleteTask, loginUser, registerUser, TaskCreateRequestBody, TaskCreateResponseBody } from './api-client.js';

const baseUrl = process.env.API_BASE_URL ?? 'http://127.0.0.1:8000';

type MyFixtures = {
    apiUser: { email: string; password: string; accessToken: string; }
    seededTasks: (n: number) => Promise<TaskCreateResponseBody[]>;
}

export const test = base.extend<MyFixtures>({
    apiUser: async ({}, use) => {
        const email = `travshootsphotos+${Date.now()}@gmail.com`
        const password = 'Test1234?'

        await registerUser(baseUrl, email, password)
        const accessToken = await loginUser(baseUrl, email, password).then((response) => {
            return response.access_token;
        })

        await use({ email, password, accessToken });
    },

    seededTasks: async ({ apiUser }, use) => {
        const accessToken = apiUser.accessToken;
        const created: TaskCreateResponseBody[] = [];

        await use(async (n: number) => {
            for (let i = 1; i <= n; i++) {
                const requestBody: TaskCreateRequestBody = {
                    title: `Auto Test ${i}`,
                    description: 'This is a task created by test automation',
                    status: 'todo',
                    priority: 'medium'
                }

                created.push(await createTask(baseUrl, accessToken, requestBody));            
            }

            return created;
        });

        for (const task of created) {
            await deleteTask(baseUrl, accessToken, task.id);
        };
    }
});

export { expect } from '@playwright/test'