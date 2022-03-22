package it.pl.dawidluczak.web.rest;

import it.pl.dawidluczak.repository.ScheduleRepository;
import it.pl.dawidluczak.service.ScheduleService;
import it.pl.dawidluczak.service.dto.ScheduleDTO;
import it.pl.dawidluczak.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link it.pl.dawidluczak.domain.Schedule}.
 */
@RestController
@RequestMapping("/api")
public class ScheduleResource {

    private final Logger log = LoggerFactory.getLogger(ScheduleResource.class);

    private static final String ENTITY_NAME = "schedule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ScheduleService scheduleService;

    private final ScheduleRepository scheduleRepository;

    public ScheduleResource(ScheduleService scheduleService, ScheduleRepository scheduleRepository) {
        this.scheduleService = scheduleService;
        this.scheduleRepository = scheduleRepository;
    }

    /**
     * {@code POST  /schedules} : Create a new schedule.
     *
     * @param scheduleDTO the scheduleDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new scheduleDTO, or with status {@code 400 (Bad Request)} if the schedule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/schedules")
    public ResponseEntity<ScheduleDTO> createSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) throws URISyntaxException {
        log.debug("REST request to save Schedule : {}", scheduleDTO);
        if (scheduleDTO.getId() != null) {
            throw new BadRequestAlertException("A new schedule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ScheduleDTO result = scheduleService.save(scheduleDTO);
        return ResponseEntity
            .created(new URI("/api/schedules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /schedules/:id} : Updates an existing schedule.
     *
     * @param id the id of the scheduleDTO to save.
     * @param scheduleDTO the scheduleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scheduleDTO,
     * or with status {@code 400 (Bad Request)} if the scheduleDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the scheduleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */

    @PutMapping("/schedules/{id}")
    public ResponseEntity<ScheduleDTO> updateSchedule(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ScheduleDTO scheduleDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Schedule : {}, {}", id, scheduleDTO);
        if (scheduleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, scheduleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!scheduleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }
        ScheduleDTO result = scheduleService.save(scheduleDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scheduleDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /schedules/:id} : Partial updates given fields of an existing schedule, field will ignore if it is null
     *
     * @param id the id of the scheduleDTO to save.
     * @param scheduleDTO the scheduleDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated scheduleDTO,
     * or with status {@code 400 (Bad Request)} if the scheduleDTO is not valid,
     * or with status {@code 404 (Not Found)} if the scheduleDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the scheduleDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/schedules/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ScheduleDTO> partialUpdateSchedule(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ScheduleDTO scheduleDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Schedule partially : {}, {}", id, scheduleDTO);
        if (scheduleDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, scheduleDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!scheduleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ScheduleDTO> result = scheduleService.partialUpdate(scheduleDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, scheduleDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /schedules} : get all the schedules.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of schedules in body.
     */
    @GetMapping("/schedules")
    public ResponseEntity<List<ScheduleDTO>> getAllSchedules(Pageable pageable) {
        log.debug("REST request to get a page of Schedules");
        Page<ScheduleDTO> page = scheduleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /schedules/:id} : get the "id" schedule.
     *
     * @param id the id of the scheduleDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the scheduleDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/schedules/{id}")
    public ResponseEntity<ScheduleDTO> getSchedule(@PathVariable Long id) {
        log.debug("REST request to get Schedule : {}", id);
        Optional<ScheduleDTO> scheduleDTO = scheduleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(scheduleDTO);
    }

    /**
     * {@code DELETE  /schedules/:id} : delete the "id" schedule.
     *
     * @param id the id of the scheduleDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        log.debug("REST request to delete Schedule : {}", id);
        scheduleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
