package it.pl.dawidluczak.web.specification;

public class JoinColumnProps {

    private String joinColumnName;
    private SearchCriteria searchCriteria;

    public JoinColumnProps(String joinColumnName, SearchCriteria searchCriteria) {
        this.joinColumnName = joinColumnName;
        this.searchCriteria = searchCriteria;
    }

    public String getJoinColumnName() {
        return joinColumnName;
    }

    public void setJoinColumnName(String joinColumnName) {
        this.joinColumnName = joinColumnName;
    }

    public SearchCriteria getSearchCriteria() {
        return searchCriteria;
    }

    public void setSearchCriteria(SearchCriteria searchCriteria) {
        this.searchCriteria = searchCriteria;
    }
}
