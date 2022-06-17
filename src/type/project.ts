export interface Tag {
  id: string,
  name: string,
  color: string
}

export interface Project {
  id: string,
  title: string,
  keywords: string[],
  startDate: string,
  endDate: string,
  coverImg: string
}
