import {BaseApi} from './baseApi';

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

/**
 * API for working with Users
 */
export class UserApi extends BaseApi<User> {
    me = () => this.request('/users/me/');
    get = (id: string) => this.request(`/users/${id}/`);
}
