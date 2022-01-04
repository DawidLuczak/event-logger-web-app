package it.pl.dawidluczak.web.specification;

import java.util.List;

public class SearchQuery {

    private List<SearchCriteria> searchCriteria;
    private List<JoinColumnProps> joinColumnProps;

    public SearchQuery(List<SearchCriteria> searchCriteria, List<JoinColumnProps> joinColumnProps) {
        this.searchCriteria = searchCriteria;
        this.joinColumnProps = joinColumnProps;
    }

    public List<SearchCriteria> getSearchCriteria() {
        return searchCriteria;
    }

    public void setSearchCriteria(List<SearchCriteria> searchCriteria) {
        this.searchCriteria = searchCriteria;
    }

    public List<JoinColumnProps> getJoinColumnProps() {
        return joinColumnProps;
    }

    public void setJoinColumnProps(List<JoinColumnProps> joinColumnProps) {
        this.joinColumnProps = joinColumnProps;
    }
}
