package it.pl.dawidluczak;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("it.pl.dawidluczak");

        noClasses()
            .that()
            .resideInAnyPackage("it.pl.dawidluczak.service..")
            .or()
            .resideInAnyPackage("it.pl.dawidluczak.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..it.pl.dawidluczak.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
