(function(){
  var httpServer = new HTTPServer(8080);
  var peopleNumberData = 0;

  httpServer.addEventListener('request', function(evt) {
    var request  = evt.request;
    var response = evt.response;
    switch(request.params.data) {
      case 'peopleNumber':
        // TODO: Get the people number from the BLE people counter.
        break;
    }
    var json;
    if (request.params.callback) {
      json = `${request.params.callback}({ "${request.params.data}": ${peopleNumberData} });`;
      response.headers['Content-Type'] = 'text/javascript';
    } else {
      json = `{ "${request.params.data}": ${peopleNumberData} }`;
      response.headers['Content-Type'] = 'application/json';
    }
    response.send(json);
  });

  window.addEventListener('load', function() {
    var peopleNumber = document.querySelector('#peopleNumber');
    var status = document.querySelector('#status');
    var ip = document.querySelector('#ip');
    var port = document.querySelector('#port');
    var add = document.querySelector('#add');
    var subtract = document.querySelector('#subtract');
    var start = document.querySelector('#start');
    var stop = document.querySelector('#stop');

    IPUtils.getAddresses(function(ipAddress) {
      ip.textContent = ip.textContent || ipAddress;
    });

    port.textContent = httpServer.port;

    add.addEventListener('click', function() {
      peopleNumberData++;
      peopleNumber.innerHTML = peopleNumberData;
    });

    subtract.addEventListener('click', function() {
      peopleNumberData && peopleNumberData--;
      peopleNumber.innerHTML = peopleNumberData;
    });

    start.addEventListener('click', function() {
      httpServer.start();
      status.textContent = 'Running';
      add.disabled = false;
      subtract.disabled = false;
    });

    stop.addEventListener('click', function() {
      httpServer.stop();
      status.textContent = 'Stopped';
      add.disabled = true;
      subtract.disabled = true;
    });
  });

  window.addEventListener('beforeunload', function() {
    httpServer.stop();
  });
}());
