import {
    mockFetch,
    getMockFetch,
    getMockResponse,
    restoreMockFetch,
} from './utils';
import {MOCK_USERS_ME_RESPONSE_DATA} from './__fixtures__';

import eventbrite from '..';

const sdk = eventbrite();

describe('sdk.users.me()', () => {
    it('calls fetch and calls fetch with appropriate defaults', async() => {
        mockFetch(getMockResponse(MOCK_USERS_ME_RESPONSE_DATA));

        await expect(sdk.users.me()).resolves.toEqual(
            MOCK_USERS_ME_RESPONSE_DATA
        );

        expect(getMockFetch()).toHaveBeenCalledTimes(1);
        expect(getMockFetch()).toHaveBeenCalledWith(
            'https://www.eventbriteapi.com/v3/users/me/',
            expect.objectContaining({})
        );

        restoreMockFetch();
    });
});
