/**
 * Thin fetch-based wrappers around the Flowstate API.
 *
 * Used by Playwright fixtures to seed and tear down test data without going
 * through the UI. No extra dependencies — only the built-in fetch (Node 18+).
 *
 * Every function throws a descriptive error when the API returns a non-2xx
 * status, so fixture failures surface immediately rather than causing
 * confusing assertion errors later in the test.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

type TaskStatus = "todo" | "in_progress" | "done";

type TaskPriority = "low" | "medium" | "high";

export type UserResponse = {
  id: string;
  email: string;
  is_active: boolean;
};

export type TokenResponse = {
  access_token: string;
  token_type: string;
};

export type TaskCreateRequestBody = {
  title: string;
  description?: string | null;
  status?: TaskStatus | null;
  priority?: TaskPriority | null;
  due_date?: string | null;
}

export type TaskCreateResponseBody = {
    id: string;
    title: string;
    description: string | null;
    status: string | null;
    priority: string | null;
    due_date: string | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
  }

// ── Helpers ───────────────────────────────────────────────────────────────────

async function assertOk(res: Response, context: string): Promise<void> {
  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable body)");
    throw new Error(`[api-client] ${context} → ${res.status} ${res.statusText}\n${body}`);
  }
}

// ── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Registers a new user. Returns the created user object.
 *
 * Mirror of: flowstate-api-tests-ts/src/api/auth.ts → registerUser
 */
export async function registerUser(
  apiBaseUrl: string,
  email: string,
  password: string
): Promise<UserResponse> {
  const res = await fetch(`${apiBaseUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  await assertOk(res, `registerUser(${email})`);
  return res.json() as Promise<UserResponse>;
}

/**
 * Logs an existing user in. Returns the Access Token.
 */
export async function loginUser(
  apiBaseUrl: string,
  email: string,
  password: string
): Promise<TokenResponse> {
  const res = await fetch(`${apiBaseUrl}/auth/login`, {
    method: "POST",
    body: new URLSearchParams({ username: email, password})
  });

  await assertOk(res, `loginUser(${email})`);
  return res.json() as Promise<TokenResponse>;
}

// ── Tasks ──────────────────────────────────────────────────────────────────────
export async function createTask(
  apiBaseUrl: string,
  accessToken: string,
  input: TaskCreateRequestBody
): Promise<TaskCreateResponseBody> {
  const res = await fetch(`${apiBaseUrl}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
    body: JSON.stringify(input)
  })

  await assertOk(res, `createTask(${input.title})`);
  return res.json() as Promise<TaskCreateResponseBody>;
}

export async function deleteTask(
  apiBaseUrl: string,
  accessToken:string,
  taskId: string
): Promise<void> {
  const res = await fetch(`${apiBaseUrl}/tasks/${taskId}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${accessToken}` },
  })

  await assertOk(res, `deleteTask(${taskId})`);
}
