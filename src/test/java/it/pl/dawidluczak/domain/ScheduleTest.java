package it.pl.dawidluczak.domain;

import static org.assertj.core.api.Assertions.assertThat;

import it.pl.dawidluczak.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ScheduleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Schedule.class);
        Schedule schedule1 = new Schedule();
        schedule1.setId(1L);
        Schedule schedule2 = new Schedule();
        schedule2.setId(schedule1.getId());
        assertThat(schedule1).isEqualTo(schedule2);
        schedule2.setId(2L);
        assertThat(schedule1).isNotEqualTo(schedule2);
        schedule1.setId(null);
        assertThat(schedule1).isNotEqualTo(schedule2);
    }
}
