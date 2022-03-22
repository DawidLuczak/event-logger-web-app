package it.pl.dawidluczak.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

/**
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "hire_date")
    private Instant hireDate;

    @Column(name = "hours")
    private Integer hours;

    @Column(name = "note")
    private String note;

    @OneToMany(mappedBy = "employee", orphanRemoval = true)
    @LazyCollection(LazyCollectionOption.EXTRA)
    @Cascade({ CascadeType.ALL })
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(allowSetters = true)
    private Set<Event> events = new HashSet<>();

    @Cascade({ CascadeType.REPLICATE, CascadeType.DETACH, CascadeType.LOCK, CascadeType.SAVE_UPDATE, CascadeType.REFRESH })
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "employees" }, allowSetters = true)
    private Community community;

    @ManyToMany(mappedBy = "employees")
    @LazyCollection(LazyCollectionOption.EXTRA)
    @Cascade({ CascadeType.REPLICATE, CascadeType.DETACH, CascadeType.LOCK, CascadeType.SAVE_UPDATE, CascadeType.REFRESH })
    @JsonIgnoreProperties(value = { "events" }, allowSetters = true)
    private Set<Schedule> schedules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employee id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Employee firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Employee lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public Employee email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Employee phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Instant getHireDate() {
        return this.hireDate;
    }

    public Employee hireDate(Instant hireDate) {
        this.setHireDate(hireDate);
        return this;
    }

    public void setHireDate(Instant hireDate) {
        this.hireDate = hireDate;
    }

    public Integer getHours() {
        return this.hours;
    }

    public Employee hours(Integer hours) {
        this.setHours(hours);
        return this;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public String getNote() {
        return this.note;
    }

    public Employee note(String note) {
        this.setNote(note);
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Set<Schedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(Set<Schedule> schedules) {
        this.schedules = schedules;
    }

    public Employee schedules(Set<Schedule> schedules) {
        this.setSchedules(schedules);
        return this;
    }

    public Employee addSchedule(Schedule schedule) {
        if (this.schedules != null && !this.schedules.contains(schedule)) {
            this.schedules.add(schedule);
        }
        return this;
    }

    public Employee removeSchedule(Schedule schedule) {
        if (this.schedules != null && this.schedules.contains(schedule)) {
            this.schedules.remove(schedule);
        }
        return this;
    }

    public Set<Event> getEvents() {
        return this.events;
    }

    public void setEvents(Set<Event> events) {
        if (this.events != null) {
            this.events.forEach(i -> i.setEmployee(null));
        }
        if (events != null) {
            events.forEach(i -> i.setEmployee(this));
        }
        this.events = events;
    }

    public Employee events(Set<Event> events) {
        this.setEvents(events);
        return this;
    }

    public Employee addEvent(Event event) {
        this.events.add(event);
        event.setEmployee(this);
        return this;
    }

    public Employee removeEvent(Event event) {
        this.events.remove(event);
        event.setEmployee(null);
        return this;
    }

    public Community getCommunity() {
        return this.community;
    }

    public void setCommunity(Community community) {
        this.community = community;
    }

    public Employee community(Community community) {
        this.setCommunity(community);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", hireDate='" + getHireDate() + "'" +
            ", hours=" + getHours() +
            ", note='" + getNote() + "'" +
            "}";
    }
}
