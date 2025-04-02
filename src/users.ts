import axios from "axios";

export enum UserRole {
    SALESPERSON = "SALESPERSON",
    COSTUMER = "COSTUMER",
}

export type User = {
    id: string,
    created_at: string,
    updated_at: string,
    login: string,
    role: UserRole,
    properties: {
        [key: string]: string
    },
};

export type CreateUserBody = {
    login: string,
    password: string,
    role: UserRole,
    properties: {
        [key: string]: string
    },
};

export type UpdateUserBody = {
    properties: {
        [key: string]: string
    },
};;

export const usersClient = axios.create({
    baseURL: `${process.env.API_HOST}/v1/users`,
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${process.env.API_TOKEN}`
    },
    validateStatus: () => true,
});
