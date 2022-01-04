package it.pl.dawidluczak.service.mapper;

import it.pl.dawidluczak.domain.Event;
import it.pl.dawidluczak.service.dto.EventDTO;
import java.util.Set;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Event} and its DTO {@link EventDTO}.
 */
@Mapper(componentModel = "spring", uses = { ScheduleMapper.class, EmployeeMapper.class })
public interface EventMapper extends EntityMapper<EventDTO, Event> {
    @Mapping(target = "schedule", source = "schedule", qualifiedByName = "toEventDto")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "toEventDto")
    EventDTO toDto(Event s);

    @Named("toEmployeeDto")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "startDate", source = "startDate")
    @Mapping(target = "endDate", source = "endDate")
    @Mapping(target = "type", source = "type")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "schedule", source = "schedule", qualifiedByName = "toEventDto")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "toEventDto")
    EventDTO toEmployeeDto(Event s);

    @Named("toScheduleDto")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "startDate", source = "startDate")
    @Mapping(target = "endDate", source = "endDate")
    @Mapping(target = "type", source = "type")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "schedule", source = "schedule", qualifiedByName = "toEventDto")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "toEventDto")
    EventDTO toScheduleDto(Event s);

    @Named("toNameDto")
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "startDate", source = "startDate")
    @Mapping(target = "endDate", source = "endDate")
    @Mapping(target = "type", source = "type")
    @Mapping(target = "pensum", source = "pensum")
    @Mapping(target = "schedule", source = "schedule", qualifiedByName = "toNameDto")
    @Mapping(target = "employee", source = "employee", qualifiedByName = "name")
    EventDTO toNameDto(Event s);

    @Named("idSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    Set<EventDTO> toDtoIdSet(Set<Event> employee);

    @Named("dtoSet")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "startDate", source = "startDate")
    @Mapping(target = "endDate", source = "endDate")
    @Mapping(target = "type", source = "type")
    @Mapping(target = "pensum", source = "pensum")
    Set<EventDTO> toDtofullSet(Set<Event> employee);
}
