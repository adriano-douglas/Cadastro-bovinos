package br.com.bovinos.api.validation;

import br.com.bovinos.api.validation.constraints.ValidateString;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;

public class StringValidator implements ConstraintValidator<ValidateString, String> {
    private List<String> valueList;
    @Override
    public void initialize(ValidateString constraintAnnotation) {
        valueList = new ArrayList<>();
        for(String val : constraintAnnotation.acceptedValues()) {
            valueList.add(val);
        }
    }
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return valueList.contains(value);
    }
}
