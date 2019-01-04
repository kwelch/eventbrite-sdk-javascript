import {
    mockFetch,
    getMockFetch,
    getMockResponse,
    restoreMockFetch,
} from './utils';
import {
    MOCK_USERS_ME_RESPONSE_DATA,
    MOCK_TRANSFORMED_USERS_ME_RESPONSE_DATA,
} from './__fixtures__';

import request from '../request';
import usersMethods from '../users';

const users = usersMethods(request);

describe('users.me()', () => {
    it('calls fetch and calls fetch with appropriate defaults', async() => {
        mockFetch(getMockResponse(MOCK_USERS_ME_RESPONSE_DATA));

        await expect(users.me()).resolves.toEqual(
            MOCK_TRANSFORMED_USERS_ME_RESPONSE_DATA
        );

        expect(getMockFetch()).toHaveBeenCalledTimes(1);
        expect(getMockFetch()).toHaveBeenCalledWith(
            '/users/me/',
            expect.objectContaining({})
        );

        restoreMockFetch();
    });

    it('handle token missing requests', async() => {
        mockFetch(
            getMockResponse(
                {
                    status_code: 401,
                    error_description:
                        'An OAuth token is required for all requests',
                    error: 'NO_AUTH',
                },
                {status: 401}
            )
        );

        await expect(users.me()).rejects.toMatchObject({
            response: expect.objectContaining({
                status: 401,
                statusText: 'Unauthorized',
                ok: false,
            }),
            parsedError: {
                description: 'An OAuth token is required for all requests',
                error: 'NO_AUTH',
            },
        });

        restoreMockFetch();
    });
});
