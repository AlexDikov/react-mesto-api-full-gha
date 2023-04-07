const SERVER_ERROR = 500;

const NOT_FOUND = 404;

const BAD_REQUEST = 400;

const UNAUTHORIZED = 401;

const CONFLICT = 409;

const regexLink = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

module.exports = {
  SERVER_ERROR, NOT_FOUND, BAD_REQUEST, UNAUTHORIZED, CONFLICT, regexLink,
};
