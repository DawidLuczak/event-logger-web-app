package it.pl.dawidluczak.service.dto;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link it.pl.dawidluczak.domain.Community} entity.
 */
public class CommunityDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    private String description;

    private Set<EmployeeDTO> employees;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<EmployeeDTO> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<EmployeeDTO> employees) {
        this.employees = employees;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommunityDTO)) {
            return false;
        }

        CommunityDTO communityDTO = (CommunityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
