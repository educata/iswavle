document.body.addEventListener('click', (event) => {
  event.preventDefault();

  window.location.hash = event.target.hasAttribute('id')
    ? `#${event.target.getAttribute('id')}`
    : '';
});
