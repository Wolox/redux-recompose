const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line

const numericalFourDigitsRegex = /^[0-9]{4}$/;

const numericalTenDigitsRegex = /^[0-9]{10}$/;

const numericalDigitsRegex = /^([0-9]*)$/;

exports.required = errorMessage => val => (val ? undefined : errorMessage);

exports.minLength = (minLength, errorMessage) => val =>
  val && val.length >= minLength ? undefined : errorMessage;

exports.maxLength = (maxLength, errorMessage) => val =>
  val && val.length <= maxLength ? undefined : errorMessage;

exports.pattern = (pattern, errorMessage) => val => (pattern.test(val) ? undefined : errorMessage);

exports.email = errorMessage => exports.pattern(emailRegex, errorMessage);

exports.numericalFourDigits = errorMessage => exports.pattern(numericalFourDigitsRegex, errorMessage);

exports.numericalTenDigits = errorMessage => exports.pattern(numericalTenDigitsRegex, errorMessage);

exports.numericalDigits = errorMessage => exports.pattern(numericalDigitsRegex, errorMessage);
