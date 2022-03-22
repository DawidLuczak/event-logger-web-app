package it.pl.dawidluczak.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ScheduleMapperTest {

    private ScheduleMapper scheduleMapper;

    @BeforeEach
    public void setUp() {
        scheduleMapper = new ScheduleMapperImpl();
    }
}
