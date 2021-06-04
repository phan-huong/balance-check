"use strict";

const httpStatus = require("http-status-codes");

module.exports = {
  pageNotFoundError: (error, req, res, next) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    //console.log(`Error occured: ${errorCode} | ${error.stack}`)
    res.render("error")
  },
  internalServerError: (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    console.log(`Error occured: ${errorCode} | ${error.stack}`)
    res.render("error")
  }
};
