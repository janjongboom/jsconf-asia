function getUuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}
var deviceId = getUuid();

if ('requestWakeLock' in navigator) {
  var lock = navigator.requestWakeLock('screen');
  window.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      lock.unlock();
    }
    else {
      lock = navigator.requestWakeLock('screen');
    }
  });
}

var wsOpen = false;
var ws;
function connect() {
  ws = new WebSocket('ws://10.10.0.247:8322');
  ws.onopen = () => {
    wsOpen = true;
  };
  ws.onclose = () => {
    wsOpen = false;
    connect();
  };
}
connect();

function getNetworks() {
  var el = document.querySelector('h1');
  var req = navigator.mozWifiManager.getNetworks();
  req.onsuccess = function() {
    var network = req.result.find(wifi => wifi.ssid === 'androidjan');
    if (!network) {
      el.textContent = 'Out of range';
    }
    else {
      el.textContent = network.relSignalStrength + ' %';
    }

    if (wsOpen) {
      ws.send(JSON.stringify({
        type: 'wifi-range',
        deviceId: deviceId,
        hasNetwork: !!network,
        relSignalStrength: network.relSignalStrength
      }));
    }

    setTimeout(getNetworks, 1000);
  };
  req.onerror = function() {
    el.textContent = 'getNetworks err';
    console.error(req.error);
    setTimeout(getNetworks, 2000);
  };
}
getNetworks();
