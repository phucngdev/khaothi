/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TestDetailEntity } from './TestDetailEntity';

export type TestEntity = {
  id: string;
  name: string;
  description: string;
  randomAnswer: boolean;
  duration: number;
  numberOfParticipants: number;
  categoryId: string;
  testDetailIds: Array<string>;
  testDetails: Array<TestDetailEntity>;
};

