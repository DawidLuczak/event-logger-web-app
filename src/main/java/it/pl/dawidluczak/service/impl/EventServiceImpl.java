package it.pl.dawidluczak.service.impl;

import it.pl.dawidluczak.domain.Employee;
import it.pl.dawidluczak.domain.Event;
import it.pl.dawidluczak.domain.Schedule;
import it.pl.dawidluczak.repository.EmployeeRepository;
import it.pl.dawidluczak.repository.EventRepository;
import it.pl.dawidluczak.repository.ScheduleRepository;
import it.pl.dawidluczak.service.EventService;
import it.pl.dawidluczak.service.dto.EventDTO;
import it.pl.dawidluczak.service.mapper.EventMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Event}.
 */
@Service
@Transactional
public class EventServiceImpl implements EventService {

    private final Logger log = LoggerFactory.getLogger(EventServiceImpl.class);

    private final EventRepository eventRepository;
    private final EventMapper eventMapper;

    private final ScheduleRepository scheduleRepository;

    private final EmployeeRepository employeeRepository;

    public EventServiceImpl(
        EventRepository eventRepository,
        EventMapper eventMapper,
        ScheduleRepository scheduleRepository,
        EmployeeRepository employeeRepository
    ) {
        this.eventRepository = eventRepository;
        this.eventMapper = eventMapper;
        this.employeeRepository = employeeRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public EventDTO save(EventDTO eventDTO) {
        log.debug("Request to save Event : {}", eventDTO);
        Event event = eventMapper.toEntity(eventDTO);
        if (event.getId() != null) {
            event = eventRepository.save(event);
        } else {
            event = eventRepository.save(event);
            if (eventDTO.getSchedule() != null) {
                Schedule schedule = scheduleRepository.findById(eventDTO.getSchedule().getId()).get();
                schedule.addEvents(event);
                scheduleRepository.save(schedule);
            }
            if (eventDTO.getEmployee() != null) {
                Employee employee = employeeRepository.findById(eventDTO.getEmployee().getId()).get();
                employee.addEvent(event);
                employeeRepository.save(employee);
            }
        }
        return eventMapper.toDto(event);
    }

    @Override
    public Optional<EventDTO> partialUpdate(EventDTO eventDTO) {
        log.debug("Request to partially update Event : {}", eventDTO);

        return eventRepository
            .findById(eventDTO.getId())
            .map(existingEvent -> {
                eventMapper.partialUpdate(existingEvent, eventDTO);

                return existingEvent;
            })
            .map(eventRepository::save)
            .map(eventMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EventDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Events");
        return eventRepository.findAll(pageable).map(eventMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EventDTO> findOne(Long id) {
        log.debug("Request to get Event : {}", id);
        return eventRepository.findById(id).map(eventMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Event : {}", id);
        Event event = eventRepository.getById(id);
        if (event.getEmployee() != null) {
            Employee employee = employeeRepository.getById(event.getEmployee().getId());
            employee.removeEvent(event);
            employeeRepository.save(employee);
        }
        if (event.getSchedule() != null) {
            Schedule schedule = scheduleRepository.getById(event.getSchedule().getId());
            schedule.removeEvents(event);
            scheduleRepository.save(schedule);
        }
        eventRepository.deleteById(id);
    }
}
