import {JSONRequest} from './types';

export type Email = {
    email: string;
    primary: true;
};

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    image_id: string;
    email: Email[];
}

export interface UserMethods {
    me: () => Promise<User>;
}

export default (request: JSONRequest): UserMethods => {
    const me = () => request('/users/me/') as Promise<User>;

    return {
        me,
    };
};
