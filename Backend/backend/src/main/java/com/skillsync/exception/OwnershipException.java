package com.skillsync.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class OwnershipException extends RuntimeException {

    public OwnershipException(String message) {
        super(message);
    }
}
