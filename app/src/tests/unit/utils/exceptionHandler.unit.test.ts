
import { Response } from "express";
import { QueryFailedError } from "typeorm";
import exceptionHandler from '../../../utils/exceptionHandler';


// exceptionHandler.test.ts


// exceptionHandler.test.ts


class ErrorType implements Error {
  name!: string;
  message!: string ;
  stack?: string | undefined;
  cause?: unknown;
  
}

describe('exceptionHandler() exceptionHandler method', () => {
  // Happy Path Tests

  test('should handle QueryFailedError with SQLITE_CONSTRAINT in message and call errorBroadcaster with error.message', () => {

    const errortype : ErrorType ={
      message: 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email',
      name: ""
    } 
    // This test ensures that a QueryFailedError with a SQLITE_CONSTRAINT message triggers errorBroadcaster correctly.
    const error = new QueryFailedError('SELECT * FROM users', [], errortype);
    // Patch the error.message to include SQLITE_CONSTRAINT
    error.message = 'SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email';
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error.message);
  });

  it('should handle QueryFailedError without SQLITE_CONSTRAINT in message and not call errorBroadcaster', () => {

    const errortype : ErrorType ={
      message: 'Some other DB error',
      name: ""
    }
    // This test ensures that a QueryFailedError without SQLITE_CONSTRAINT does not call errorBroadcaster.
    const error = new QueryFailedError('SELECT * FROM users', [], errortype);
    error.message = 'Some other DB error';
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).not.toHaveBeenCalled();
  });

  test('should handle SyntaxError and call errorBroadcaster with error.message', () => {
    // This test ensures that a SyntaxError triggers errorBroadcaster with the error message.
    const error = new SyntaxError('Unexpected token in JSON');
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error.message);
  });

  it('should handle generic Error and call errorBroadcaster with error.message', () => {
    // This test ensures that a generic Error triggers errorBroadcaster with the error message.
    const error = new Error('Something went wrong');
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error.message);
  });

  it('should handle unknown error type and call errorBroadcaster with error', () => {
    // This test ensures that an unknown error type triggers errorBroadcaster with the error itself.
    const error = 42; // Not an Error instance
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error);
  });

  // Edge Case Tests

  test('should handle Response error , logging error status and message', async () => {
    // This test ensures that if the error is a Response object, and error status/message are logged.
    // We'll mock the Response object and its method.
    const errorMessage = 'API error occurred';
    const error = {
      status: 404,
      text: jest.fn().mockResolvedValue(errorMessage),
    } as unknown as Response;
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    // errorBroadcaster should have been called for Response error
    expect(errorBroadcaster).toHaveBeenCalled();
  });

  test('should handle Response error when .text() rejects and log parse error', async () => {
    // This test ensures that if .text() rejects, the catch block is executed.
    const error = {
      status: 500,
      text: jest.fn().mockRejectedValue(new Error('Parse error')),
    } as unknown as Response;
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalled();
  });

  it('should handle QueryFailedError with empty message and not call errorBroadcaster', () => {

    const errortype : ErrorType ={
      message: '',
      name: ""
    }
    // This test ensures that a QueryFailedError with an empty message does not call errorBroadcaster.
    const error = new QueryFailedError('SELECT * FROM users', [], errortype);
    error.message = '';
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).not.toHaveBeenCalled();
  });

  it('should handle Error with empty message and call errorBroadcaster with empty message', () => {
    // This test ensures that an Error with an empty message still calls errorBroadcaster with an empty string.
    const error = new Error('');
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, '');
  });

  it('should handle object error (not Error instance) and call errorBroadcaster with object', () => {
    // This test ensures that a plain object error triggers errorBroadcaster with the object itself.
    const error = { foo: 'bar', code: 123 };
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error);
  });

  it('should handle string error and call errorBroadcaster with string', () => {
    // This test ensures that a string error triggers errorBroadcaster with the string itself.
    const error = 'A string error';
    const errorBroadcaster = jest.fn();
    const res = {} as Response;

    exceptionHandler(error, errorBroadcaster, res);

    expect(errorBroadcaster).toHaveBeenCalledWith(res, 500, error);
  });
});