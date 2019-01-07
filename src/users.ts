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

export interface IUserApi {
    me(): Promise<User>;
    get(id: string): Promise<User>;
    emailLookup(email: string): Promise<User>;
}

/**
 * API for working with Users
 */
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
