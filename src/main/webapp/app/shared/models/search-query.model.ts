export class SearchQuery {
  constructor(public searchCriterias?: SearchCriteria[], public joinColumnProps?: JoinColumnProps[]) {}
}

export class SearchCriteria {
  constructor(public property: string, public operator: string, public value: any) {}
}

export class JoinColumnProps {
  constructor(public joinColumnName: string, public searchCriteria: SearchCriteria) {}
}
