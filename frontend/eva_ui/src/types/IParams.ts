export interface IParams {
  params: {
    id: string
  }
}

export type SearchParams = { [key: string]: string | string[] | undefined };
export type Params = { id: string };
export type SlugParams = { slug: string }
export type DetailsParams = { details: string }

