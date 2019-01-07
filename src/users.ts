import {JSONRequest} from './types';

export interface Email {
    email?: string;
    primary?: boolean;
}

export interface User {
    id?: string;
    firstName?: string;
    lastName?: string;
    imageId?: string;
    email?: Email[];
}

const SNAKE_CASE_MATCH = /_\w/g;
const snakeToCamel = (str: string) =>
    str.replace(SNAKE_CASE_MATCH, (chars: string) => chars[1].toUpperCase());

function transformKeysSnakeToCamel<T extends { [key: string]: any } = {}>(
    obj: T
): T {
    return Object.keys(obj).reduce((memo, key) => {
        let newValue = obj[key];
        const camelKey = snakeToCamel(key);

        if (
            newValue &&
            typeof newValue === 'object' &&
            !Array.isArray(newValue)
        ) {
            newValue = transformKeysSnakeToCamel(newValue);
        }

        return {
            ...memo,
            [camelKey]: newValue,
        };
    }, {}) as T;
}

function makeJsonRequest<T>(
    request: JSONRequest<T>,
    transformers: Array<(obj: T) => T>
) {
    return (url: string, options?: RequestInit) => request(url, options).then((response) =>
        transformers.reduce<T>((memo, transformer) => {
            memo = transformer(response);
            return memo;
        }, response)
    );
}

interface IApiClass<T> {
    request: JSONRequest<T>;
}

abstract class BaseApi<T> implements IApiClass<T> {
    request: JSONRequest<T>;

    constructor(req: JSONRequest<T>) {
        this.request = makeJsonRequest(req, [transformKeysSnakeToCamel]);
    }
}

export interface IUserApi {
    me(): Promise<User>;
    get(id: string): Promise<User>;
    emailLookup(email: string): Promise<User>;
}

export class UserApi extends BaseApi<User> implements IUserApi {
    async me() {
        const response = await this.request('/users/me/');

        return response;
    }

    async get(id: string) {
        const response = await this.request(`/users/${id}/`);

        return response;
    }

    async emailLookup(email: string) {
        const response = await this.request('/users/lookup/', {
            method: 'POST',
            body: JSON.stringify({email}),
        });

        return response;
    }
}

// (async function() {
//     const api = new UserApi(request);

//     const user = await api.me();
// })();
