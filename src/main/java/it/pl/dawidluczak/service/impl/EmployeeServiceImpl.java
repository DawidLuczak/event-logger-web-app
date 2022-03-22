package it.pl.dawidluczak.service.impl;

import it.pl.dawidluczak.domain.Community;
import it.pl.dawidluczak.domain.Employee;
import it.pl.dawidluczak.repository.CommunityRepository;
import it.pl.dawidluczak.repository.EmployeeRepository;
import it.pl.dawidluczak.service.EmployeeService;
import it.pl.dawidluczak.service.dto.EmployeeDTO;
import it.pl.dawidluczak.service.mapper.EmployeeMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Employee}.
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    private final EmployeeRepository employeeRepository;
    private final EmployeeMapper employeeMapper;

    private final CommunityRepository communityRepository;

    public EmployeeServiceImpl(
        EmployeeRepository employeeRepository,
        EmployeeMapper employeeMapper,
        CommunityRepository communityRepository
    ) {
        this.employeeRepository = employeeRepository;
        this.employeeMapper = employeeMapper;
        this.communityRepository = communityRepository;
    }

    @Override
    public EmployeeDTO save(EmployeeDTO employeeDTO) {
        log.debug("Request to save Employee : {}", employeeDTO);
        Employee employee = employeeMapper.toEntity(employeeDTO);
        if (employeeDTO.getId() != null) {
            EmployeeDTO oldEmployeeDTO = this.findOne(employeeDTO.getId()).get();
            if (oldEmployeeDTO.getCommunity() != null) {
                if (employeeDTO.getCommunity() == null || employeeDTO.getCommunity().getId() != oldEmployeeDTO.getCommunity().getId()) {
                    Community community = communityRepository.findById(oldEmployeeDTO.getCommunity().getId()).get();
                    community.removeEmployees(employee);
                    communityRepository.save(community);
                }
                if (employeeDTO.getCommunity() != null && employeeDTO.getCommunity().getId() != oldEmployeeDTO.getCommunity().getId()) {
                    Community community = communityRepository.findById(employeeDTO.getCommunity().getId()).get();
                    community.addEmployees(employee);
                    communityRepository.save(community);
                }
            } else if (employeeDTO.getCommunity() != null) {
                Community community = communityRepository.findById(employeeDTO.getCommunity().getId()).get();
                community.addEmployees(employee);
                communityRepository.save(community);
            }
            employee = employeeRepository.save(employee);
        } else {
            employee = employeeRepository.save(employee);
            if (employeeDTO.getCommunity() != null) {
                Community community = communityRepository.findById(employeeDTO.getCommunity().getId()).get();
                community.addEmployees(employee);
                communityRepository.save(community);
            }
        }
        return employeeMapper.toDto(employee);
    }

    @Override
    public Optional<EmployeeDTO> partialUpdate(EmployeeDTO employeeDTO) {
        log.debug("Request to partially update Employee : {}", employeeDTO);

        return employeeRepository
            .findById(employeeDTO.getId())
            .map(existingEmployee -> {
                employeeMapper.partialUpdate(existingEmployee, employeeDTO);

                return existingEmployee;
            })
            .map(employeeRepository::save)
            .map(employeeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<EmployeeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Employees");
        return employeeRepository.findAll(pageable).map(employeeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<EmployeeDTO> findOne(Long id) {
        log.debug("Request to get Employee : {}", id);
        return employeeRepository.findById(id).map(employeeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Employee : {}", id);
        Employee employee = employeeRepository.getById(id);
        if (employee != null && employee.getCommunity() != null) {
            Community community = communityRepository.getById(employee.getCommunity().getId());
            community.removeEmployees(employee);
            communityRepository.save(community);
        }
        employeeRepository.deleteById(id);
    }
}
