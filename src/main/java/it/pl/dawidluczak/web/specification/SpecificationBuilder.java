package it.pl.dawidluczak.web.specification;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

public class SpecificationBuilder {

    public static <T> Specification<T> bySearchQuery(SearchQuery searchQuery, Class<T> clazz) {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            List<JoinColumnProps> joinColumnProps = searchQuery.getJoinColumnProps();

            if (joinColumnProps != null && !joinColumnProps.isEmpty()) {
                for (JoinColumnProps joinColumnProp : joinColumnProps) {
                    addJoinColumnProps(predicates, joinColumnProp, criteriaBuilder, root);
                }
            }
            List<SearchCriteria> criterias = searchQuery.getSearchCriteria();

            if (criterias != null && !criterias.isEmpty()) {
                for (final SearchCriteria criteria : criterias) {
                    addPredicates(predicates, criteria, criteriaBuilder, root);
                }
            }
            if (predicates.isEmpty()) {
                return criteriaBuilder.conjunction();
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static <T> void addJoinColumnProps(
        List<Predicate> predicates,
        JoinColumnProps joinColumnProp,
        CriteriaBuilder criteriaBuilder,
        Root<T> root
    ) {
        SearchCriteria criteria = joinColumnProp.getSearchCriteria();
        Join<Object, Object> joinParent = root.join(joinColumnProp.getJoinColumnName());
        Path expression = joinParent.get(criteria.getProperty());
        addPredicate(predicates, criteria, criteriaBuilder, expression);
    }

    private static <T> void addPredicates(
        List<Predicate> predicates,
        SearchCriteria criteria,
        CriteriaBuilder criteriaBuilder,
        Root<T> root
    ) {
        String property = criteria.getProperty();
        Expression<?> expression = root.get(property);
        if (expression.getJavaType() == String.class) {
            expression = criteriaBuilder.lower((Expression<String>) expression);
        }
        addPredicate(predicates, criteria, criteriaBuilder, expression);
    }

    private static void addPredicate(
        List<Predicate> predicates,
        SearchCriteria criteria,
        CriteriaBuilder criteriaBuilder,
        Expression expression
    ) {
        switch (criteria.getOperator()) {
            case "=":
                predicates.add(criteriaBuilder.equal(expression, criteria.getValue()));
            case ">":
                predicates.add(criteriaBuilder.greaterThan(expression, (Comparable) criteria.getValue()));
            case "<":
                predicates.add(criteriaBuilder.lessThan(expression, (Comparable) criteria.getValue()));
            case "LIKE":
                predicates.add(criteriaBuilder.like(expression, "%" + criteria.getValue() + "%"));
            case "IN":
                predicates.add(criteriaBuilder.in(expression).value((Comparable) criteria.getValue()));
        }
    }
}
