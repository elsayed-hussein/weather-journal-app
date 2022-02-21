const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiKey = ",&appid=b82ec09577a8e88ba91138af586bbcf6&units=imperial";

const server = "http://localhost:8080";

const err = document.getElementById("error");
const time = document.getElementById("date");
const zipCity = document.getElementById("city");
const zipTemp = document.getElementById("temp");
const disc = document.getElementById("description");
const cont = document.getElementById("content");

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const generateData = () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getData(zip).then((zipData) => {
    if (zipData) {
      const {
        main: { temp },
        name: city,
        weather: [{ description }],
      } = zipData;

      const data = {
        newDate,
        city,
        temp: Math.round(temp),
        description,
        feelings,
      };
      saverData(server + "/add", data);
      update();
      document.getElementById("entry").style.opacity = 1;
    }
  });
};

document.getElementById("generate").addEventListener("click", generateData);

const getData = async (zip) => {
  try {
    const res = await fetch(baseURL + zip + apiKey);
    const data = await res.json();
    if (data.cod != 200) {
      alert(data.message);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};

const saverData = async (url, dataInfo) => {
  const data = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInfo),
  });
};

const update = async () => {
  const res = await fetch(server + "/all");
  try {
    const sData = await res.json();
    time.innerHTML = sData.newDate;
    zipCity.innerHTML = sData.city;
    zipTemp.innerHTML = sData.temp + "&degF";
    disc.innerHTML = sData.description;
    cont.innerHTML = sData.feelings;
  } catch (err) {
    console.log(err);
  }
};
