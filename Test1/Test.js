// https://ftx.com/api/markets/BTC/USDT <-- original API
// Use https://cors-drill.herokuapp.com to Fix CORS block. Check this api on Folder "CORSdrill"
const ftx ="https://cors-drill.herokuapp.com/";
const binance = "https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT";
var headers = {}
show();

async function getapi(url) {
  const respone = await fetch(url);
  if (respone.ok) {
    return respone.json();
  } else {
    throw new Error("API has error.");
  }
}

async function show() {
  try {
    // Get price
    let ftxShow = await getapi(ftx);
    let binanceShow = await getapi(binance);

    let ftxRes = !ftxShow ? 0 : ftxShow.result.price;

    let binanceRes = parseFloat(binanceShow.price);
    document.getElementById("FTX").innerHTML = `${ftxRes} USDT`;
    document.getElementById("Binance").innerHTML = `${binanceRes} USDT`;
    // Diff
    ftxRes > binanceRes
      ? diffhandle(ftxRes, binanceRes)
      : diffhandle(binanceRes, ftxRes);
  } catch (e) {
    console.log(e);
  }
}

function diffhandle(first, second) {
  let diff = Math.abs(first - second);
  let perdiff = 100 * Math.abs(diff / ((first + second) / 2));
  document.getElementById("diff").innerHTML = `${diff} USDT`;
  document.getElementById("perdiff").innerHTML = `( ${perdiff} % )`;
}

function update() {
  document.getElementById("FTX").innerHTML = "Downloading result...";
  document.getElementById("Binance").innerHTML = "Downloading result...";
  document.getElementById("diff").innerHTML = "Downloading result...";
  document.getElementById("perdiff").innerHTML = "";
  show();
}

(function() {
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  var slice = [].slice;
  var origin = window.location.protocol + '//' + window.location.host;
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
      var args = slice.call(arguments);
      var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
      if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          args[1] = cors_api_url + args[1];
      }
      return open.apply(this, args);
  };
})();