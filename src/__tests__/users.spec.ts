import {
    mockFetch,
    getMockFetch,
    getMockResponse,
    restoreMockFetch,
} from './utils';
import {MOCK_USERS_ME_RESPONSE_DATA} from './__fixtures__';

import request from '../request';
import usersCollection from '../users';

const users = usersCollection(request);

describe('users.me()', () => {
    it('calls fetch and calls fetch with appropriate defaults', async() => {
        mockFetch(getMockResponse(MOCK_USERS_ME_RESPONSE_DATA));

        await expect(users.me()).resolves.toEqual(MOCK_USERS_ME_RESPONSE_DATA);

        expect(getMockFetch()).toHaveBeenCalledTimes(1);
        expect(getMockFetch()).toHaveBeenCalledWith(
            '/users/me/',
            expect.objectContaining({})
        );

        restoreMockFetch();
    });
});
