"use strict";


// Pagination

const pagination = document.getElementsByClassName("pagination");
Array.from(pagination).forEach(function(element) {
  element.addEventListener('submit', function(event) {
    event.preventDefault();
    const perPage = this.getAttribute("data-per-page");
    const baseUrl = this.getAttribute("data-base-url");
    const page = (this.getElementsByClassName("pagination__page")[0].value);
    window.location = baseUrl + '&start=' + ((page - 1) * perPage);
  });
});


// Memberlist

const addressbook = document.getElementsByClassName("addressbook");
Array.from(addressbook).forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();
    window.open(this.href.replace(/&amp;/g, '&'));
    return false;
  });
});


// Return back

const back = document.getElementsByClassName("back-js");
Array.from(back).forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.preventDefault();
    history.go(-1);
    return false;
  });
});
