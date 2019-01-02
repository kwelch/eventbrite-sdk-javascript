import {RequestHelper} from './types';

export interface UserObject {}

export interface UserCollection {
    [key: string]: () => Promise<UserObject>;
}

export default (request: RequestHelper): UserCollection => {
    const me = (): Promise<UserObject> => request('/users/me/');

    return {
        me,
    };
};
