import {RequestHelper} from './types';

export interface UserObject {
    id: string;
    first_name: string;
    last_name: string;
    image_id: string;
    email: [
        {
            email: string;
            primary: true;
        }
    ];
}

export interface UserMethods {
    me: () => Promise<UserObject>;
}

export default (request: RequestHelper): UserMethods => {
    const me = () => request('/users/me/') as Promise<UserObject>;

    return {
        me,
    };
};
