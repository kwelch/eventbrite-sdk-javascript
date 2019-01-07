import {UserApi} from './users';

export interface SdkConfig {
    token?: string;
    baseUrl?: string;
}

export type JSONRequest<T = {}> = (
    apiPath: string,
    options?: RequestInit
) => Promise<T>;

export interface Sdk {
    request: JSONRequest;
    users: UserApi;
}

export interface ArgumentErrors {
    [key: string]: [string];
}
export interface ParsedResponseError {
    error: string;
    description: string;
    argumentErrors: ArgumentErrors;
}
export interface JSONResponseData {
    error?: string;
    error_description?: string;
    error_detail?: {
        ARGUMENTS_ERROR?: ArgumentErrors;
        [propName: string]: any;
    };
}
