import {Sdk, SdkConfig, RequestHelper} from './types';
import request from './request';
import userMethods from './users';

export * from './constants';

const DEFAULT_API_URL = 'https://www.eventbriteapi.com/v3';

const eventbrite = ({
    baseUrl = DEFAULT_API_URL,
    token,
}: SdkConfig = {}): Sdk => {
    const requestHelper: RequestHelper = (endpoint, options = {}) => {
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

    return {
        request: requestHelper,
        users: userMethods(requestHelper),
    };
};

export default eventbrite;
