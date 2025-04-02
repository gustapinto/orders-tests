import {describe, it} from "vitest";
import { UserRole, usersClient, type CreateUserBody, type UpdateUserBody, type User } from "../src/users";

describe('users api integration tests', () => {
  it("should create user", async ({expect}) => {
    const body: CreateUserBody = {
      login: `mocked_salesperson_${new Date().valueOf()}`,
      password: `mocked_salesperson_${new Date().valueOf()}_password`,
      role: UserRole.SALESPERSON,
      properties: {
        first_name: "Mocked",
        last_name: "Salesperon",
        birthday: "2000-01-01",
      }
    }

    const res = await usersClient.post<User>("", body);

    expect(res.status).toBe(201);

    const user = res.data;

    expect(user.id).not.toBeNull();
    expect(user.created_at).not.toBeNull();
    expect(user.updated_at).not.toBeNull();
    expect(user.login).toBe(body.login);
    expect(user.role).toBe(body.role);
    expect(user.properties).not.toBeNull();
  });

  it("should get all users", async ({expect}) => {
    const res = await usersClient.get<User[]>("");

    expect(res.status).toBe(200);

    const users = res.data;

    expect(users).not.toBeNull();
    expect(users).not.toBe([]);
  });

  it("should get a user by their id", async ({expect}) => {
    const usersRes = await usersClient.get<User[]>("");

    expect(usersRes.data).not.toBeNull();
    expect(usersRes.data).not.toBe([]);

    const id = usersRes.data[0]?.id;
    const res = await usersClient.get<User>(`/${id}`);

    expect(res.status).toBe(200);

    const user = res.data;

    expect(user).not.toBeNull();
    expect(user).not.toBe([]);
  });

  it("should update a user by their id", async ({expect}) => {
    const usersRes = await usersClient.get<User[]>("");

    expect(usersRes.data).not.toBeNull();
    expect(usersRes.data).not.toBe([]);

    const originalUser = usersRes.data[0];

    const body: UpdateUserBody = {
      properties: {
        first_name: "Mocked",
        last_name: "Salesperon",
        birthday: "2000-01-01",
        email: "mocked@mock.ed",
      },
    };

    const res = await usersClient.put<User>(`/${originalUser?.id}`, body);

    expect(res.status).toBe(200);

    const user = res.data;

    expect(user).not.toBeNull();
    expect(user.id).toBe(originalUser?.id);
    expect(user.created_at).not.toBeNull();
    expect(user.updated_at).not.toBeNull();
    expect(user.login).toBe(originalUser?.login);
    expect(user.role).toBe(originalUser?.role);
    expect(user.properties).not.toBeNull();
  });

  it("should delete a user by their id", async ({expect}) => {
    const usersRes = await usersClient.get<User[]>("");

    expect(usersRes.data).not.toBeNull();
    expect(usersRes.data).not.toBe([]);

    const originalUser = usersRes.data[0];
    const res = await usersClient.delete<any>(`/${originalUser?.id}`);

    expect(res.status).toBe(204);
  });
});
