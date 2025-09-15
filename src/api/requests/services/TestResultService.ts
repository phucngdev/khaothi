/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTestResultDto } from '../models/CreateTestResultDto';
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpdateTestResultDto } from '../models/UpdateTestResultDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TestResultService {

  /**
   * Create new test result
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerCreateTestResult(
    requestBody: CreateTestResultDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/test-result',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get all test results
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetAllTestResults(
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result',
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test results by user id
   * @param userId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultsByUser(
    userId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/user/{userId}',
      path: {
        'userId': userId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test results by test id
   * @param testId
   * @param limit
   * @param offset
   * @param order Format: fieldName:[asc,desc]
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultsByTest(
    testId: string,
    limit: number = 10,
    offset: number,
    order?: string | null,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/test/{testId}',
      path: {
        'testId': testId,
      },
      query: {
        'limit': limit,
        'offset': offset,
        'order': order,
      },
    });
  }

  /**
   * Get test result by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerGetTestResultById(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
    });
  }

  /**
   * Update test result by id
   * @param id
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerUpdateTestResult(
    id: string,
    requestBody: UpdateTestResultDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Delete test result by id
   * @param id
   * @returns any
   * @throws ApiError
   */
  public static testResultControllerDeleteTestResult(
    id: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/test-result/{id}',
      path: {
        'id': id,
      },
    });
  }

}
