package it.pl.dawidluczak.web.specification;

import it.pl.dawidluczak.domain.Department;
import net.kaczmarzyk.spring.data.jpa.domain.Like;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.jpa.domain.Specification;

@Spec(path = "title", params = "title", spec = Like.class)
public interface DepartmentSpecification extends Specification<Department> {}
