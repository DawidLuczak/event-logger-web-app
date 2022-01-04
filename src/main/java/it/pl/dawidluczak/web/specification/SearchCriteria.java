package it.pl.dawidluczak.web.specification;

public class SearchCriteria {

    private String property;
    private String operator;
    private Object value;

    public SearchCriteria(String property, String operator, Object value) {
        this.property = property;
        this.operator = operator;
        this.value = value;
    }

    public String getProperty() {
        return property;
    }

    public void setProperty(String property) {
        this.property = property;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public Object getValue() {
        if (value instanceof String) {
            return ((String) value).toLowerCase();
        } else {
            return value;
        }
    }

    public void setValue(Object value) {
        this.value = value;
    }
}
