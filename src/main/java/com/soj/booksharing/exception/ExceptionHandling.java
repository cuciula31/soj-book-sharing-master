package com.soj.booksharing.exception;

import com.soj.booksharing.data.StringFormatters;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.HashMap;
import java.util.Map;

public class ExceptionHandling extends RuntimeException{

    public static Map<String,String> handleForValidationErrors(MethodArgumentNotValidException e){
        Map<String,String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(err->{
            String field = ((FieldError)err).getField();
            String errorMessage = err.getDefaultMessage();
            errors.put(field,errorMessage);
        });
        return errors;
    }


}
