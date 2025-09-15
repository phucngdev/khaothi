import { QuestionEntity } from '../models/QuestionEntity';

export const cognitiveLevelLabelMap: Record<
  QuestionEntity.CognitiveLevel,
  string
> = {
  [QuestionEntity.CognitiveLevel.RECOGNITION]: 'Nhận biết',
  [QuestionEntity.CognitiveLevel.COMPREHENSION]: 'Thông hiểu',
  [QuestionEntity.CognitiveLevel.APPLICATION]: 'Vận dụng',
};

// Map màu tag
export const cognitiveLevelColorMap: Record<
  QuestionEntity.CognitiveLevel,
  string
> = {
  [QuestionEntity.CognitiveLevel.RECOGNITION]: 'blue',
  [QuestionEntity.CognitiveLevel.COMPREHENSION]: 'orange',
  [QuestionEntity.CognitiveLevel.APPLICATION]: 'green',
};

export const questionTypeLabelMap: Record<
  QuestionEntity['type'],
  { name: string; color: string }
> = {
  MULTIPLE_CHOICE_SINGLE: {
    name: 'Trắc nghiệm 1 đáp án',
    color: 'gold',
  },
  MULTIPLE_CHOICE_MULTIPLE: {
    name: 'Trắc nghiệm nhiều đáp án',
    color: 'blue',
  },
  SORTING_SENTENCE: {
    name: 'Sắp xếp câu/ đoạn văn',
    color: 'purple',
  },
  SORTING_WORD: {
    name: 'Sắp xếp từ',
    color: 'orange',
  },
  DRAGANĐROP: {
    name: 'Kéo thả',
    color: 'red',
  },
  MATCHING: {
    name: 'Ghép đôi',
    color: 'volcano',
  },
  FILL_IN_BLANK: {
    name: 'Điền từ',
    color: 'cyan',
  },
  TABLE_CHOICE: {
    name: 'Lựa chọn dạng bảng',
    color: 'green',
  },
  ESSAY: {
    name: 'Tự luận',
    color: 'magenta',
  },
  CODING: {
    name: 'Coding',
    color: 'geekblue',
  },
};
