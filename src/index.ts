import {Sdk, SdkConfig, JSONRequest} from './types';
import request from './request';
import {UserApi} from './users';

export * from './constants';

const DEFAULT_API_URL = 'https://www.eventbriteapi.com/v3';

type MakeRequestFunction = <T>(
    baseUrl: string,
    token: string
) => JSONRequest<T>;

const makeRequest: MakeRequestFunction = (baseUrl: string, token: string) => (
    endpoint,
    options = {}
) => {
    const url = `${baseUrl}${endpoint}`;
    let requestOptions = options;

    if (token) {
        requestOptions = {
            ...requestOptions,
            headers: {
                ...(requestOptions.headers || {}),
                Authorization: `Bearer ${token}`,
            },
        };
    }

    return request(url, requestOptions);
};

const eventbrite = ({
    baseUrl = DEFAULT_API_URL,
    token,
}: SdkConfig = {}): Sdk => ({
    request: makeRequest(baseUrl, token),
    users: new UserApi(makeRequest(baseUrl, token)),
});

export default eventbrite;
