/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccessToken } from '../models/AccessToken';
import type { Body_login } from '../models/Body_login';
import type { UserCreate } from '../models/UserCreate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login
     * @param formData 
     * @returns AccessToken Successful Response
     * @throws ApiError
     */
    public static login(
{ username, password }: Body_login,
): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            //formData: formData,
            body: `username=${username}&password=${password}`,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                401: `Incorrect username or password`,
                422: `Validation Error`,
            },
        });
    }

    /**
     * Signup
     * @param requestBody 
     * @returns AccessToken Successful Response
     * @throws ApiError
     */
    public static signup(
requestBody: UserCreate,
): CancelablePromise<AccessToken> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `User already exists`,
                422: `Validation Error`,
            },
        });
    }

}