package it.pl.dawidluczak.service.mapper;

import it.pl.dawidluczak.domain.Schedule;
import it.pl.dawidluczak.service.dto.ScheduleDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Schedule} and its DTO {@link ScheduleDTO}.
 */
@Mapper(componentModel = "spring", uses = { DepartmentMapper.class, EventMapper.class, EmployeeMapper.class })
public interface ScheduleMapper extends EntityMapper<ScheduleDTO, Schedule> {
    @Named("toScheduleDto")
    @Mapping(target = "department", source = "department", qualifiedByName = "toNameDto")
    @Mapping(target = "events", source = "events", qualifiedByName = "dtoSet")
    @Mapping(target = "employees", source = "employees", qualifiedByName = "toScheduleDto")
    ScheduleDTO toDto(Schedule s);

    @Named("toEmployeeDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "department", source = "department", qualifiedByName = "toNameDto")
    @Mapping(target = "events", source = "events", qualifiedByName = "dtoSet")
    @Mapping(target = "employees", ignore = true)
    ScheduleDTO toEmployeeDto(Schedule s);

    @Named("toEventDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "department", source = "department", qualifiedByName = "toNameDto")
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "employees", source = "employees", qualifiedByName = "name")
    ScheduleDTO toEventDto(Schedule s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ScheduleDTO toDtoId(Schedule schedule);

    @Named("toNameDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "department", source = "department", qualifiedByName = "toNameDto")
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "employees", ignore = true)
    ScheduleDTO toDtoName(Schedule schedule);

    @Named("idSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    Set<ScheduleDTO> toDtoIdSet(Set<Schedule> schedule);

    @Named("dtoSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "department", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "employees", ignore = true)
    Set<ScheduleDTO> toDtoNameSet(Set<Schedule> schedule);
    // @Mapping(target = "id", source = "id")
    // @Mapping(target = "title", source = "title")
    // @Mapping(target = "description", source = "description")
    // @Mapping(target = "pensum", source = "pensum")
    // @Mapping(target = "department", source = "department", qualifiedByName = "toEntityId")
    // Schedule toEntity(ScheduleDTO s);

    // @Named("idToEntity")
    // @Mapping(target = "title", source = "title")
    // @Mapping(target = "description", source = "description")
    // @Mapping(target = "department", source = "department", qualifiedByName = "idToEntity")
    // @Mapping(target = "removeEvents", ignore = true)
    // Schedule toEntity(ScheduleDTO eventDTO);

    // @Named("idToEntitySet")
    // @BeanMapping(ignoreByDefault = true)
    // @Mapping(target = "id", source = "id")
    // @Mapping(target = "title", source = "title")
    // @Mapping(target = "description", source = "description")
    // @Mapping(target = "department", source = "department", qualifiedByName = "id")
    // Set<Schedule> toEntityIdSet(Set<ScheduleDTO> schedule);
}
