export interface IPageable {
  page?: number;
  size?: number;
  sort?: string;
}

export class Pageable implements IPageable {
  constructor(public page: number, public size: number, public sort: string) {
    this.page = page;
    this.size = size;
    this.sort = sort;
  }
}
