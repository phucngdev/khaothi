/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionGroupEntity } from './QuestionGroupEntity';

export type TestDetailWithoutTestEntity = {
  id: string;
  name: string;
  timeLimit: number;
  point: number;
  questionGroups: Array<QuestionGroupEntity>;
};

