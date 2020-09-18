function setJWTCookieOption() {
  return process.env.NODE_ENV === 'production'
    ? { maxAge: 2592000000, httpOnly: 'true' }
    : { maxAge: 3600000, httpOnly: 'true' };
}

module.exports = { setJWTCookieOption };
