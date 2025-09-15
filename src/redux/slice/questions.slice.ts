import { QuestionEntity } from '#/api/requests';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionState {
  data: any;
}

const initialState: QuestionState = {
  data: {
    items: [
      {
        id: 'q1',
        content: 'Which one is the capital of France?',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        imageUrl: '',
        explain: 'Paris is the capital of France.',
        type: QuestionEntity.type.MULTIPLE_CHOICE_SINGLE,
        cognitiveLevel: QuestionEntity.CognitiveLevel.RECOGNITION,
        tag: 'geography',
        options: [],
        sortingWordAnswers: [],
        sortingSentenceAnswers: [],
        multipleChoiceSingerAnswers: [
          { isCorrect: false, content: 'London' },
          { isCorrect: true, content: 'Paris' },
          { isCorrect: false, content: 'Berlin' },
          { isCorrect: false, content: 'Madrid' },
        ],
        multipleChoiceMultipleAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'qdsf1',
        content: 'Which one is the capital of France?',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        cognitiveLevel: QuestionEntity.CognitiveLevel.COMPREHENSION,
        imageUrl: '',
        explain: 'Paris is the capital of France.',
        type: QuestionEntity.type.MULTIPLE_CHOICE_MULTIPLE,
        tag: 'geography',
        options: [],
        sortingWordAnswers: [],
        sortingSentenceAnswers: [],
        multipleChoiceMultipleAnswers: [
          { isCorrect: false, content: 'London' },
          { isCorrect: true, content: 'Paris' },
          { isCorrect: true, content: 'Berlin' },
          { isCorrect: false, content: 'Madrid' },
        ],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'q2',
        content: 'Sort the following numbers in ascending order.',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        cognitiveLevel: QuestionEntity.CognitiveLevel.APPLICATION,
        imageUrl: '',
        explain: 'The correct order is 1, 2, 3, 4.',
        type: QuestionEntity.type.SORTING_WORD,
        tag: 'math',
        options: [],
        sortingSentenceAnswers: [],
        sortingWordAnswers: [
          { index: 0, content: 'Tokyo' },
          { index: 1, content: 'Washington' },
          { index: 2, content: 'Berlin' },
          { index: 3, content: 'Germany' },
        ],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'q223',
        content: 'Sort the following numbers in ascending order.',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        cognitiveLevel: QuestionEntity.CognitiveLevel.COMPREHENSION,
        imageUrl: '',
        explain: 'The correct order is 1, 2, 3, 4.',
        type: QuestionEntity.type.SORTING_SENTENCE,
        tag: 'math',
        options: [],
        sortingWordAnswers: [],
        sortingSentenceAnswers: [
          {
            index: 0,
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda deserunt atque officia. Dignissimos commodi maiores atque excepturi, est sapiente placeat ex, dolor, unde perspiciatis ducimus. Corrupti ad dolores inventore?',
          },
          {
            index: 1,
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda deserunt atque officia. Dignissimos commodi maiores atque excepturi, est sapiente placeat ex, dolor, unde perspiciatis ducimus. Corrupti ad dolores inventore?',
          },
          {
            index: 2,
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda deserunt atque officia. Dignissimos commodi maiores atque excepturi, est sapiente placeat ex, dolor, unde perspiciatis ducimus. Corrupti ad dolores inventore?',
          },
          {
            index: 3,
            content:
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda deserunt atque officia. Dignissimos commodi maiores atque excepturi, est sapiente placeat ex, dolor, unde perspiciatis ducimus. Corrupti ad dolores inventore?',
          },
        ],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'q3',
        content: 'Match the country with its capital.',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        imageUrl: '',
        explain: '',
        type: QuestionEntity.type.MATCHING,
        cognitiveLevel: QuestionEntity.CognitiveLevel.APPLICATION,
        tag: 'geography',
        options: [],
        sortingSentenceAnswers: [],
        sortingWordAnswers: [],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [
          { left: 'Japan', right: 'Tokyo' },
          { left: 'USA', right: 'Washington D.C.' },
          { left: 'Germany', right: 'Berlin' },
        ],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'q4',
        content:
          "Choose the correct word for the blank: 'I ___ ___ school yesterday.'",
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        imageUrl: '',
        explain: "The correct answer is 'went'.",
        type: QuestionEntity.type.FILL_IN_BLANK,
        cognitiveLevel: QuestionEntity.CognitiveLevel.APPLICATION,
        tag: 'english',
        options: [],
        sortingSentenceAnswers: [],
        sortingWordAnswers: [],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [
          { index: 0, correctAnswer: 'went', explanation: null },
          { index: 1, correctAnswer: 'to', explanation: null },
        ],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'qccccc4',
        content:
          "Choose the correct word for the blank: 'I ___ ___ school yesterday.'",
        audioUrl: '',
        language: 'javascript',
        testCases: [
          {
            input: '2 3',
            output: '5',
          },
          {
            input: '10 20',
            output: '30',
          },
          {
            input: '5 7',
            output: '12',
          },
          {
            input: '100 200',
            output: '300',
          },
        ],
        sampleCode: `function sum(a, b) {
    // TODO: viết logic ở đây
    return a + b;
    }`,
        testCode: `const assert = require('assert');
        assert.strictEqual(sum(2, 3), 5);
        assert.strictEqual(sum(10, 20), 30);
        assert.strictEqual(sum(5, 7), 12);
        assert.strictEqual(sum(100, 200), 300);`,
        imageUrl: '',
        explain: "The correct answer is 'went'.",
        cognitiveLevel: QuestionEntity.CognitiveLevel.RECOGNITION,
        type: QuestionEntity.type.CODING,
        tag: 'english',
        options: [],
        sortingSentenceAnswers: [],
        sortingWordAnswers: [],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [
          { index: 0, correctAnswer: 'went', explanation: null },
          { index: 1, correctAnswer: 'to', explanation: null },
        ],
        chooseAnswerInBlank: [],
        essayAnswers: [],
      },
      {
        id: 'q6',
        content: 'Write an essay about climate change.',
        audioUrl: '',
        language: '',
        testCases: [],
        sampleCode: '',
        testCode: '',
        cognitiveLevel: QuestionEntity.CognitiveLevel.RECOGNITION,
        imageUrl: '',
        explain: '',
        type: QuestionEntity.type.ESSAY,
        tag: 'environment',
        options: [],
        sortingSentenceAnswers: [],
        sortingWordAnswers: [],
        multipleChoiceMultipleAnswers: [],
        multipleChoiceSingerAnswers: [],
        matchingAnswers: [],
        multipleChoiceHorizontal: [],
        fillInBlank: [],
        chooseAnswerInBlank: [],
        essayAnswers: [
          {
            id: 'e1',
            examUrl: 'https://example.com/guideline.pdf',
            description: 'Please include at least 200 words.',
            documents: [
              {
                id: 'd1',
                name: 'Guideline.pdf',
                url: 'https://example.com/guideline.pdf',
              },
              {
                id: 'd2',
                name: 'Guideline.pdf',
                url: 'https://example.com/guideline.pdf',
              },
            ],
          },
        ],
      },
    ],
    meta: {
      limit: 10,
      offset: 0,
      total: 8,
      totalPages: 1,
    },
  },
};

const questionSlice = createSlice({
  initialState,
  name: 'questions',
  reducers: {
    addMatrix: (state, action: PayloadAction<any>) => {
      state.data.items.unshift(action.payload);
      state.data.meta.total = state.data.meta.total + 1;
    },
  },
  extraReducers: builder => {
    builder;
  },
});

export default questionSlice.reducer;
