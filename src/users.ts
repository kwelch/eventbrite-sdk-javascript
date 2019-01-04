import {JSONRequest} from './types';

export type Email = {
    email: string;
    primary: boolean;
};

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    imageId: string;
    email: Email[];
}

export interface UserMethods {
    [key: string]: () => Promise<User>;
    me: () => Promise<User>;
    get: (id: string) => Promise<User>;
    emailLookup: (email: string) => Promise<User>;
}

const SNAKE_CASE_MATCH = /_\w/g;
const snakeToCamel = (str: string) =>
    str.replace(SNAKE_CASE_MATCH, (chars: string) => chars[1].toUpperCase());

const transformKeysSnakeToCamel = (obj: { [key: string]: any }): {} =>
    Object.keys(obj).reduce((memo, key) => {
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
    }, {});

export default (request: JSONRequest): UserMethods => {
    const me = () =>
        request('/users/me/').then(transformKeysSnakeToCamel) as Promise<User>;

    const get = (id: string) =>
        request(`/users/${id}/`).then(transformKeysSnakeToCamel) as Promise<
            User
        >;

    const emailLookup = (email: string) =>
        request('/users/lookup/', {
            method: 'POST',
            body: JSON.stringify({email}),
        }).then(transformKeysSnakeToCamel) as Promise<User>;

    return {
        me,
        get,
        emailLookup,
    };
};
