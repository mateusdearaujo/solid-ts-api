import validator from 'validator'

import { EmailValidatorAdapter } from './email-validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    const isValid = sut.isValid('invalid_email@mail.com')

    expect(isValid).toBeFalsy()
  })

  test('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()

    const isValid = sut.isValid('valid_email@mail.com')

    expect(isValid).toBeTruthy()
  })

  test('should call validator with correct email', () => {
    const sut = new EmailValidatorAdapter()

    const isEmailSpy = jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)

    sut.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})