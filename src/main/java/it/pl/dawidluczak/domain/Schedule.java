package it.pl.dawidluczak.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 * A Schedule.
 */
@Entity
@Table(name = "schedule")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Schedule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "pensum")
    private Integer pensum;

    @ManyToOne(fetch = FetchType.LAZY)
    @Cascade({ CascadeType.REPLICATE, CascadeType.DETACH, CascadeType.LOCK, CascadeType.SAVE_UPDATE, CascadeType.REFRESH })
    @JsonIgnoreProperties(allowSetters = true)
    private Department department;

    @OneToMany(mappedBy = "schedule", orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.EXTRA)
    @Cascade({ CascadeType.ALL })
    @OrderColumn(name = "startDate")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(allowSetters = true)
    private Set<Event> events = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "schedule_employees",
        joinColumns = @javax.persistence.JoinColumn(name = "schedules_id"),
        inverseJoinColumns = @javax.persistence.JoinColumn(name = "employees_id")
    )
    @LazyCollection(LazyCollectionOption.EXTRA)
    @Cascade({ CascadeType.REPLICATE, CascadeType.DETACH, CascadeType.LOCK, CascadeType.SAVE_UPDATE, CascadeType.REFRESH })
    @JsonIgnoreProperties(value = "events", allowSetters = true)
    private Set<Employee> employees = new HashSet<>();

    public Long getId() {
        return this.id;
    }

    public Schedule id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Schedule title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public Schedule description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPensum() {
        if (this.pensum == null) {
            return 0;
        }
        return this.pensum;
    }

    public void setPensum(int pensum) {
        this.pensum = pensum;
    }

    public Schedule pensum(int pensum) {
        this.setPensum(pensum);
        return this;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        if (this.employees != null) {
            this.employees.forEach(i -> i.removeSchedule(this));
        }
        if (employees != null) {
            employees.forEach(i -> i.addSchedule(this));
        }
        this.employees = employees;
    }

    public Schedule employees(Set<Employee> employees) {
        this.setEmployees(employees);
        return this;
    }

    public Schedule addEmployee(Employee employee) {
        if (!this.employees.contains(employee)) {
            employee.addSchedule(this);
            this.employees.add(employee);
        }
        return this;
    }

    public Schedule removeEmployee(Employee employee) {
        if (this.employees.contains(employee)) {
            employee.removeSchedule(this);
            this.employees.remove(employee);
        }
        return this;
    }

    public Department getDepartment() {
        return this.department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Schedule department(Department department) {
        this.setDepartment(department);
        return this;
    }

    public Set<Event> getEvents() {
        return this.events;
    }

    public void setEvents(Set<Event> events) {
        if (this.events != null) {
            this.events.forEach(i -> i.setSchedule(null));
        }
        if (events != null) {
            events.forEach(i -> i.setSchedule(this));
        }
        this.events = events;
    }

    public Schedule events(Set<Event> events) {
        this.setEvents(events);
        return this;
    }

    public Schedule addEvents(Event event) {
        this.events.add(event);
        event.setSchedule(this);
        return this;
    }

    public Schedule removeEvents(Event event) {
        this.events.remove(event);
        event.setSchedule(null);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Schedule)) {
            return false;
        }
        return id != null && id.equals(((Schedule) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Schedule{" + "id=" + getId() + ", title='" + getTitle() + "'" + ", description='" + getDescription() + "'" + "}";
    }
}
