package br.com.bovinos.api.exceptions;

public class ConflictException extends Exception{
    public ConflictException(String message) {
        super(message);
    }
}
