const api = "https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT";
getData();

async function getapi(url) {
  const respone = await fetch(url);
  if (respone.ok) {
    return respone.json();
  } else {
    throw new Error("API has error.");
  }
}

async function getData() {
  try {
    // get data from api
    const data = await getapi(api);

    // create empty Object
    const stash = {};

    // Convert array data to object
    data.forEach((array) => {
      let key = setDate(array[0]);
      let res = {
        [key]: {
          open: array[1],
          high: array[2],
          low: array[3],
          close: array[4]
        }
      };
    //   add object to stash
      Object.assign(stash, res);
    });
    // results
    console.log(stash);
    // front
    document.getElementById("length").innerHTML = `Convert data ${Object.keys(stash).length} array  to Object Successful!`;
    document.getElementById("note").innerHTML = 'Check results on console (Press F11 or Inspect)'
  } catch (e) {
    console.log(e);
  }
}

function setDate(d) {
  const date = new Date(d);
  return (
    date.getFullYear() +
    "-" +
    ((date.getMonth() + 1) < 10 ? "0" : "") +
    (date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" : "") +
    date.getDate() +
    " " +
    (date.getHours() < 10 ? "0" : "") +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" : "") +
    date.getMinutes()
  );
}

function reload(){
    document.getElementById("length").innerHTML = 'Downloading results...';
    document.getElementById("note").innerHTML = '...';
    getData();
}