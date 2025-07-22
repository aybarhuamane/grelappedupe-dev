import { capacity, educationalLevel } from '@/types'
import { IAnswerList, IAnswerPost } from './IAnswers'

interface IQuesitonBase {
  id: number
  code: string
  question: string
  is_active: boolean
}

export interface IQuestionList extends IQuesitonBase {
  capacity: capacity.ICapacity
}

export interface IQuestionListAction extends IQuesitonBase {
  capacity: capacity.ICapacity
  level: educationalLevel.IEducationalLevel
  degree_number: string
}

export interface IQuestionDetail extends IQuesitonBase {
  capacity: number
  degree_number: string
  level: number
  answers?: IAnswerList[]
}

export interface IQuestion extends IQuesitonBase {
  capacity: number
}

export interface IQuestionPost {
  code: string
  question: string
  is_active: boolean
  degree_number: string
  capacity: number
  level: number
}

export interface IQuestionAnswersPost {
  id?: number
  code: string
  question: string
  is_active: boolean
  degree_number: string
  capacity: number
  level: number
  answers: IAnswerPost[];
}

export interface IQuestionFilter {
  id?: number
  code?: string
  code__icontains?: string
  question?: string
  question__icontains?: string
  is_active?: boolean
  capacity__id?: number
  capacity__competence__id?: number
  capacity__competence__course__id?: number
  page?: number
  ordering?: string
  level__id?: number
  degree_number?: number,
  search?: string
  page_size?: number
}
