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
