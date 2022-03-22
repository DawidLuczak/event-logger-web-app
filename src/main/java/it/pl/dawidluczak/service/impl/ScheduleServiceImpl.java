package it.pl.dawidluczak.service.impl;

import it.pl.dawidluczak.domain.Department;
import it.pl.dawidluczak.domain.Schedule;
import it.pl.dawidluczak.repository.DepartmentRepository;
import it.pl.dawidluczak.repository.ScheduleRepository;
import it.pl.dawidluczak.service.ScheduleService;
import it.pl.dawidluczak.service.dto.ScheduleDTO;
import it.pl.dawidluczak.service.mapper.ScheduleMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Schedule}.
 */
@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {

    private final Logger log = LoggerFactory.getLogger(ScheduleServiceImpl.class);

    private final ScheduleRepository scheduleRepository;
    private final ScheduleMapper scheduleMapper;

    private final DepartmentRepository departmentRepository;

    public ScheduleServiceImpl(
        ScheduleRepository scheduleRepository,
        ScheduleMapper scheduleMapper,
        DepartmentRepository departmentRepository
    ) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleMapper = scheduleMapper;
        this.departmentRepository = departmentRepository;
    }

    @Override
    public ScheduleDTO save(ScheduleDTO scheduleDTO) {
        log.debug("Request to save Schedule : {}", scheduleDTO);
        Schedule schedule = scheduleMapper.toEntity(scheduleDTO);
        if (schedule.getId() != null) {
            Schedule oldSchedule = scheduleRepository.findById(schedule.getId()).get();
            ScheduleDTO oldScheduleDTO = scheduleMapper.toDto(oldSchedule);
            if (oldScheduleDTO.getDepartment() != null) {
                if (scheduleDTO.getDepartment() == null || oldScheduleDTO.getDepartment().getId() != scheduleDTO.getDepartment().getId()) {
                    Department department = departmentRepository.findById(oldScheduleDTO.getDepartment().getId()).get();
                    department.removeSchedules(oldSchedule);
                    departmentRepository.save(department);
                }
                if (scheduleDTO.getDepartment() != null && scheduleDTO.getDepartment().getId() != oldScheduleDTO.getDepartment().getId()) {
                    Department department = departmentRepository.findById(scheduleDTO.getDepartment().getId()).get();
                    department.addSchedules(schedule);
                    departmentRepository.save(department);
                }
            } else if (scheduleDTO.getDepartment() != null) {
                Department department = departmentRepository.findById(scheduleDTO.getDepartment().getId()).get();
                department.addSchedules(schedule);
                departmentRepository.save(department);
            }
        } else {
            schedule = scheduleRepository.save(schedule);
            if (scheduleDTO.getDepartment() != null) {
                Department department = departmentRepository.findById(scheduleDTO.getDepartment().getId()).get();
                department.addSchedules(schedule);
                departmentRepository.save(department);
            }
        }
        schedule = scheduleRepository.save(schedule);
        return this.scheduleMapper.toDto(schedule);
    }

    @Override
    public Optional<ScheduleDTO> partialUpdate(ScheduleDTO scheduleDTO) {
        log.debug("Request to partially update Schedule : {}", scheduleDTO);
        return scheduleRepository
            .findById(scheduleDTO.getId())
            .map(existingSchedule -> {
                scheduleMapper.partialUpdate(existingSchedule, scheduleDTO);

                return existingSchedule;
            })
            .map(scheduleRepository::save)
            .map(scheduleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ScheduleDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Schedules");
        return scheduleRepository.findAll(pageable).map(scheduleMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ScheduleDTO> findOne(Long id) {
        log.debug("Request to get Schedule : {}", id);
        return scheduleRepository.findById(id).map(scheduleMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Schedule : {}", id);
        Schedule schedule = scheduleRepository.getById(id);
        if (schedule != null && schedule.getDepartment() != null) {
            Department department = departmentRepository.getById(schedule.getDepartment().getId());
            department.removeSchedules(schedule);
            departmentRepository.save(department);
        }
        if (schedule.getEvents() != null) {}
        scheduleRepository.deleteById(id);
    }
}
