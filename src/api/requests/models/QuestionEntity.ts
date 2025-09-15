/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EssayAnswerEntity } from './EssayAnswerEntity';
import type { InBlankAnswerDto } from './InBlankAnswerDto';
import type { MatchingAnswerDto } from './MatchingAnswerDto';
import type { MultipleChoiceAnswerDto } from './MultipleChoiceAnswerDto';
import type { MultipleChoiceHorizontalDto } from './MultipleChoiceHorizontalDto';
import type { SortingAnswerDto } from './SortingAnswerDto';

export type QuestionEntity = {
  id: string;
  content: string;
  audioUrl: string;
  imageUrl: string;
  explain: string;
  type: QuestionEntity.type;
  tag: string;
  options: Array<string>;
  cognitiveLevel: QuestionEntity.CognitiveLevel;
  sortingWordAnswers: Array<SortingAnswerDto>;
  sortingSentenceAnswers: Array<SortingAnswerDto>;
  multipleChoiceSingerAnswers: Array<MultipleChoiceAnswerDto>;
  multipleChoiceMultipleAnswers: Array<MultipleChoiceAnswerDto>;
  matchingAnswers: Array<MatchingAnswerDto>;
  multipleChoiceHorizontal: Array<MultipleChoiceHorizontalDto>;
  fillInBlank: Array<InBlankAnswerDto>;
  chooseAnswerInBlank: Array<InBlankAnswerDto>;
  essayAnswers: Array<EssayAnswerEntity>;
  draganđropAnswers: Array<{
    index: number;
    content: string;
  }>;
  language: string;
  testCases: Array<{
    input: string;
    output: string;
  }>;
  sampleCode: string;
  testCode: string;
};

export namespace QuestionEntity {
  export enum type {
    MULTIPLE_CHOICE_SINGLE = 'MULTIPLE_CHOICE_SINGLE',
    MULTIPLE_CHOICE_MULTIPLE = 'MULTIPLE_CHOICE_MULTIPLE',
    SORTING_WORD = 'SORTING_WORD',
    SORTING_SENTENCE = 'SORTING_SENTENCE',
    DRAGANĐROP = 'DRAGANĐROP',
    MATCHING = 'MATCHING',
    FILL_IN_BLANK = 'FILL_IN_BLANK',
    ESSAY = 'ESSAY',
    TABLE_CHOICE = 'TABLE_CHOICE',
    CODING = 'CODING',
  }

  export enum CognitiveLevel {
    RECOGNITION = 'RECOGNITION',
    COMPREHENSION = 'COMPREHENSION',
    APPLICATION = 'APPLICATION',
  }
}
