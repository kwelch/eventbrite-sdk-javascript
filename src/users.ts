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
    me: () => Promise<User>;
}

const SNAKE_CASE_MATCH = /_\w/g;
const snakeToCamel = (str: string) =>
    str.replace(SNAKE_CASE_MATCH, (chars: string) => chars[1].toUpperCase());

const transformKeysSnakeToCamel = (obj: {}): {} =>
    Object.entries(obj).reduce((memo, [key, value]) => {
        const camelKey = snakeToCamel(key);
        let newValue = value;

        if (typeof newValue === 'object' && !Array.isArray(newValue)) {
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

    return {
        me,
    };
};
