import {JSONRequest} from './types';

const SNAKE_CASE_MATCH = /_\w/g;
const snakeToCamel = (str: string) =>
    str.replace(SNAKE_CASE_MATCH, (chars: string) => chars[1].toUpperCase());

function transformKeysSnakeToCamel<T extends { [key: string]: any } = {}>(
    obj: T
): T {
    return Object.keys(obj).reduce((memo, key) => {
        let newValue = obj[key];
        const camelKey = snakeToCamel(key);

        if (
            newValue &&
            typeof newValue === 'object' &&
            !Array.isArray(newValue)
        ) {
            newValue = transformKeysSnakeToCamel(newValue);
        }

        return {
            ...memo,
            [camelKey]: newValue,
        };
    }, {}) as T;
}

/**
 * Returns a function that sends a request, and transforms its results
 */
function makeJsonRequest<T>(
    request: JSONRequest<T>,
    transformers: Array<(obj: T) => T>
) {
    return (url: string, options?: RequestInit) =>
        request(url, options).then((response) =>
            transformers.reduce<T>((memo, transformer) => {
                memo = transformer(response);
                return memo;
            }, response)
        );
}

interface IApiClass<T> {
    request: JSONRequest<T>;
}

/**
 * Base API class for creating new API Classes.
 * Also encapsulates default transformers such as snake to camel.
 */
export abstract class BaseApi<T> implements IApiClass<T> {
    request: JSONRequest<T>;

    constructor(req: JSONRequest<T>) {
        this.request = makeJsonRequest(req, [transformKeysSnakeToCamel]);
    }
}
