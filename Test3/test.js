const api = "https://api1.binance.com/api/v3/depth?symbol=BTCUSDT";

async function getapi(url) {
  const respone = await fetch(url);
  if (respone.ok) {
    return respone.json();
  } else {
    throw new Error("API has error.");
  }
}

async function calculateOutputAmount(usdtAmount) {
  try {
    // get data from api
    const data = await getapi(api);

    document.getElementById('usdin').innerHTML = usdtAmount;
    let Output = 0;
    // loop
    data.asks.some((element) => {
      let price = parseFloat(element[0]);
      let volume = parseFloat(element[1]);

      let inputVolume = Math.abs(usdtAmount / price);

      if (inputVolume > volume){
        usdtAmount = Math.abs(usdtAmount - volume * price);
        Output += volume;
      } else {
        usdtAmount = Math.abs(usdtAmount - inputVolume * price);
        Output += inputVolume;
      }

      if (usdtAmount <= 0) return true;
    });

    // show results
    document.getElementById('btc').innerHTML = Output;
    document.getElementById('balance').innerHTML = usdtAmount;

    document.getElementById('note').style.display = "none";
    for (let i = 0; i <3; i++){
      document.getElementsByClassName("input")[i].style.display = "";
    }
  } catch (e) {
    console.log(e);
  }
}

function show(){
  for (let i = 0; i <3; i++){
    document.getElementsByClassName("input")[i].style.display = "none";
  }
  document.getElementById('note').style.display = "";

  calculateOutputAmount(document.getElementById('usdt').value);
}