/**
 * Validates the provided password against defined criteria.
 * @param password - The password string to be validated.
 * @returns boolean - Returns true if the password is valid, false otherwise.
 * @throws No exceptions are thrown.
 */
  export function isValidatePhoneNumber(phone : string) {
    const regex = /^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    return regex.test(phone);
  }