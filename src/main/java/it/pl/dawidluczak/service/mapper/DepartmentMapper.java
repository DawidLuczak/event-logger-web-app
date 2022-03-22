package it.pl.dawidluczak.service.mapper;

import it.pl.dawidluczak.domain.Department;
import it.pl.dawidluczak.service.dto.DepartmentDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Department} and its DTO {@link DepartmentDTO}.
 */
@Mapper(componentModel = "spring", uses = { ScheduleMapper.class })
public interface DepartmentMapper extends EntityMapper<DepartmentDTO, Department> {
    @Mapping(target = "schedules", source = "schedules", qualifiedByName = "toScheduleDto")
    DepartmentDTO toDto(Department s);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DepartmentDTO toDtoId(Department department);

    @Named("toNameDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "schedules", ignore = true)
    DepartmentDTO toDtoName(Department department);
    // @Named("idToEntity")
    // @Mapping(target = "id", source = "id")
    // @Mapping(target = "title", source = "title")
    // @Mapping(target = "description", source = "description")
    // @Mapping(target = "schedules", source = "schedules", qualifiedByName = "idToEntitySet")
    // Department toEntity(DepartmentDTO department);

    // @Named("toEntityId")
    // @Mapping(target = "id", source = "id")
    // @Mapping(target = "title", source = "title")
    // @Mapping(target = "description", source = "description")
    // Department toEntity(DepartmentDTO department);
}
