package it.pl.dawidluczak.service;

import it.pl.dawidluczak.service.dto.CommunityDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link it.pl.dawidluczak.domain.Community}.
 */
public interface CommunityService {
    /**
     * Save a community.
     *
     * @param communityDTO the entity to save.
     * @return the persisted entity.
     */
    CommunityDTO save(CommunityDTO communityDTO);

    /**
     * Partially updates a community.
     *
     * @param communityDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommunityDTO> partialUpdate(CommunityDTO communityDTO);

    /**
     * Get all the communities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CommunityDTO> findAll(Pageable pageable);

    /**
     * Get the "id" community.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommunityDTO> findOne(Long id);

    /**
     * Delete the "id" community.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
