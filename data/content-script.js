var HOW_MANY_PEOPLE_MESSAGE = '<h2>人數：57/100</h2>';

window.addEventListener('hashchange', function() {
  showPeopleCounter();
});

function showPeopleCounter() {
  var timerId = setInterval(function() {
    var element = document.querySelector('._OKe ol');
    if (element) {
      var counter = document.createElement('li');
      counter.innerHTML = HOW_MANY_PEOPLE_MESSAGE;
      element.appendChild(counter);
      clearInterval(timerId);
    }
  }, 500);
}
