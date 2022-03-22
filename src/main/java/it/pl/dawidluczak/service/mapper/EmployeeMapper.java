package it.pl.dawidluczak.service.mapper;

import it.pl.dawidluczak.domain.Employee;
import it.pl.dawidluczak.service.dto.EmployeeDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Employee} and its DTO {@link EmployeeDTO}.
 */
@Mapper(componentModel = "spring", uses = { CommunityMapper.class, EventMapper.class, ScheduleMapper.class })
public interface EmployeeMapper extends EntityMapper<EmployeeDTO, Employee> {
    @Named("toEmployeeDto")
    @Mapping(target = "schedules", source = "schedules", qualifiedByName = "toEmployeeDto")
    @Mapping(target = "community", source = "community", qualifiedByName = "toNameDto")
    @Mapping(target = "events", source = "events", qualifiedByName = "toEmployeeDto")
    EmployeeDTO toDto(Employee s);

    @Named("toCommunityDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "note", source = "note")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "hireDate", source = "hireDate")
    @Mapping(target = "schedules", source = "schedules", qualifiedByName = "toEmployeeDto")
    @Mapping(target = "community", source = "community", qualifiedByName = "toNameDto")
    @Mapping(target = "events", source = "events", qualifiedByName = "toNameDto")
    EmployeeDTO toCommunityDto(Employee s);

    @Named("toEventDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "hireDate", source = "hireDate")
    @Mapping(target = "note", source = "note")
    @Mapping(target = "community", source = "community", qualifiedByName = "toNameDto")
    @Mapping(target = "schedules", source = "schedules", qualifiedByName = "toNameDto")
    @Mapping(target = "events", ignore = true)
    EmployeeDTO toEventDto(Employee s);

    @Named("toScheduleDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phoneNumber", source = "phoneNumber")
    @Mapping(target = "hireDate", source = "hireDate")
    @Mapping(target = "note", source = "note")
    @Mapping(target = "community", source = "community", qualifiedByName = "toNameDto")
    @Mapping(target = "schedules", source = "schedules", qualifiedByName = "toNameDto")
    @Mapping(target = "events", ignore = true)
    EmployeeDTO toScheduleDto(Employee s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    EmployeeDTO toDtoId(Employee employee);

    @Named("name")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    EmployeeDTO toDtoName(Employee employee);

    @Named("idSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "schedules", ignore = true)
    @Mapping(target = "community", ignore = true)
    @Mapping(target = "events", ignore = true)
    Set<EmployeeDTO> toDtoIdSet(Set<Employee> employee);

    @Named("dtoSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "firstName", source = "firstName")
    @Mapping(target = "lastName", source = "lastName")
    @Mapping(target = "schedules", ignore = true)
    @Mapping(target = "community", ignore = true)
    @Mapping(target = "events", ignore = true)
    Set<EmployeeDTO> toDtoName(Set<Employee> employee);
}
