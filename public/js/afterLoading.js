const url = new URL(document.URL);
const urlParams = url.searchParams;
const targetHref = urlParams.get('target');

setTimeout(function () {
  window.location.href = targetHref + '.html';
}, 3000);
