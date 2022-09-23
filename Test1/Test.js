// https://ftx.com/api/markets/BTC/USDT <-- original API
const ftx = "https://cors-anywhere.herokuapp.com/https://ftx.com/api/markets/BTC/USDT";
const binance = "https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT";
show()
function getapi(url){
    const respone = fetch(url).then(async(data)=>{
        return await data.json();
    }).catch((error) => {
        console.log(error)
        return
    });
    return respone
}

async function show(){
    // Get price
    let ftxShow = await getapi(ftx);
    let binanceShow = await getapi(binance);

    let ftxRes = !ftxShow ? 0 : ftxShow.result.price;

    let binanceRes = parseFloat(binanceShow.price);
    document.getElementById("FTX").innerHTML = `${ftxRes} USDT`;
    document.getElementById("Binance").innerHTML = `${binanceRes} USDT`;
    // Diff
    ftxRes > binanceRes ? diffhandle(ftxRes,binanceRes):diffhandle(binanceRes,ftxRes);
}

function diffhandle(first,second){
    let diff = Math.abs(first - second);
    let perdiff = 100 * Math.abs(diff / ((first + second)/2));
    document.getElementById("diff").innerHTML = `${diff} USDT`
    document.getElementById("perdiff").innerHTML = `( ${perdiff} % )`
}

function update(){
    document.getElementById("FTX").innerHTML = "Downloading result..."
    document.getElementById("Binance").innerHTML = "Downloading result..."
    document.getElementById("diff").innerHTML = "Downloading result..."
    document.getElementById("perdiff").innerHTML = ""
    show()
}