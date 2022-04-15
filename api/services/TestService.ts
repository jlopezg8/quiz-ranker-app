/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Test } from '../models/Test';
import type { TestResult } from '../models/TestResult';
import type { TestSubmission } from '../models/TestSubmission';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestService {

    /**
     * Get Test
     * @returns Test Successful Response
     * @throws ApiError
     */
    public static getTest(): CancelablePromise<Test> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/get_test',
        });
    }

    /**
     * Submit Test
     * @param requestBody 
     * @returns TestResult Successful Response
     * @throws ApiError
     */
    public static submitTest(
requestBody: TestSubmission,
): CancelablePromise<TestResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/submit_test',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}