/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { IBaseResponse } from '../models/IBaseResponse';
import type { UpsertExamResultAdminDto } from '../models/UpsertExamResultAdminDto';
import type { UpsertExamResultStudentDto } from '../models/UpsertExamResultStudentDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ExamResultService {

  /**
   * Upsert exam result for student by admin
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examResultControllerUpsertExamResult(
    requestBody: UpsertExamResultAdminDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/exam-results',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get exam result of course in class by student
   * @param classId
   * @param courseId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultInCourse(
    classId: string,
    courseId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results',
      query: {
        'classId': classId,
        'courseId': courseId,
      },
    });
  }

  /**
   * Create or update exam result
   * @param requestBody
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerCreateExamResult(
    requestBody: UpsertExamResultStudentDto,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/student/exam-results',
      body: requestBody,
      mediaType: 'application/json',
    });
  }

  /**
   * Get exam result by student
   * @param examId
   * @returns any
   * @throws ApiError
   */
  public static examResultStudentControllerGetExamResultByStudent(
    examId: string,
  ): CancelablePromise<IBaseResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/student/exam-results/{examId}',
      path: {
        'examId': examId,
      },
    });
  }

}
