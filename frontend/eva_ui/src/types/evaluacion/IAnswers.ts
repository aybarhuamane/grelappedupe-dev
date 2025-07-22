// export interface IAnswerPost {
//   id?: number;
//   option: string;
//   answer: string;
//   is_correct: boolean;
// }

// export interface IAnswerList {
//   id: number;
//   option: string;
//   answer: string;
//   is_correct: boolean;
//   question: number;
// }

// export interface IAnswerFilter {
//   id?: number;
//   question__id?: number;
//   answer?: string;
//   is_correct?: boolean;
//   orderinganswer__icontains?: string;
//   page?: number;
//   page_size?: number;
//   ordering?: string;
// }

// export interface IAnswer {
//   id?: number;
//   option: string;
//   answer: string;
//   is_correct: boolean;
// }

export interface IAnswerPost {
  id?: number;
  option: string;
  answer: string;
  is_correct: boolean;
}

export interface IAnswerList {
  id: number;
  option: string;
  answer: string;
  is_correct: boolean;
  question: number;
}

export interface IAnswerFilter {
  id?: number;
  question__id?: number;
  answer?: string;
  is_correct?: boolean;
  orderinganswer__icontains?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}
