package it.pl.dawidluczak.service.mapper;

import it.pl.dawidluczak.domain.Community;
import it.pl.dawidluczak.service.dto.CommunityDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Community} and its DTO {@link CommunityDTO}.
 */
@Mapper(componentModel = "spring", uses = { EmployeeMapper.class })
public interface CommunityMapper extends EntityMapper<CommunityDTO, Community> {
    @Named("toCommunityDto")
    @Mapping(target = "employees", source = "employees", qualifiedByName = "toCommunityDto")
    CommunityDTO toDto(Community s);

    @Named("toEmployeeDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    CommunityDTO toEmployeeDto(Community community);

    @Named("id")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommunityDTO toDtoId(Community community);

    @Named("toNameDto")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "employees", ignore = true)
    CommunityDTO toDtoName(Community community);
}
