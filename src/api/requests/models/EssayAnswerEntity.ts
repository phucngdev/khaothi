/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DocumentEntityType } from './DocumentEntityType';

export type EssayAnswerEntity = {
  id: string;
  examUrl: string;
  description: string;
  documents: Array<DocumentEntityType>;
};
