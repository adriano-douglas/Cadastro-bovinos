package br.com.bovinos.api.validation.constraints;

import br.com.bovinos.api.validation.StringValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = StringValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidateString {
    String[] acceptedValues();
    String message() default "Valor inválido";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
