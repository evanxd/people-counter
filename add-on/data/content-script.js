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
    var before = document.querySelectorAll('._OKe ol li')[5];
    if (element) {
      var counter = document.createElement('li');
      counter.classList.add('mod');
      counter.innerHTML = message;
      element.insertBefore(counter, before);
      clearInterval(timerId);
      timerId = null;
    }
  }, 500);
}
