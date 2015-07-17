var message;
var peopleNumber;
var timerId;

self.port.on('peopleNumber', function(data) {
  peopleNumber = data.peopleNumber;
  message = `<h2>人數：${peopleNumber}/100</h2>`;
  showPeopleCounter();
  window.addEventListener('hashchange', function() {
    showPeopleCounter();
  });
});

function showPeopleCounter() {
  if (timerId) {
    clearInterval(timerId);
  }
  timerId = setInterval(function() {
    var element = document.querySelector('._OKe ol');
    if (element) {
      var counter = document.createElement('li');
      counter.innerHTML = message;
      element.appendChild(counter);
      clearInterval(timerId);
      timerId = null;
    }
  }, 500);
}
