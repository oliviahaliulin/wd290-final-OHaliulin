const currentDate = document.getElementById('currentDate');

const weatherCity = document.getElementById('weatherCity');
const weatherIcon = document.getElementById('weatherIcon');
const weatherTemp = document.getElementById('weatherTemp');
const weatherCondition = document.getElementById('weatherCondition');
const weatherWind = document.getElementById('weatherWind');
const weatherError = document.getElementById('weatherError');

const rateEUR = document.getElementById('rateEUR');
const rateGBP = document.getElementById('rateGBP');
const rateJPY = document.getElementById('rateJPY');
const rateMXN = document.getElementById('rateMXN');
const rateUAH = document.getElementById('rateUAH');
const currencyError = document.getElementById('currencyError');

const featuredImage = document.getElementById('featuredImage');
const featuredSource = document.getElementById('featuredSource');
const featuredTitle = document.getElementById('featuredTitle');
const featuredText = document.getElementById('featuredText');
const featuredLink = document.getElementById('featuredLink');
const newsError = document.getElementById('newsError');

const article1Source = document.getElementById('article1Source');
const article1Title = document.getElementById('article1Title');
const article1Text = document.getElementById('article1Text');
const article1Link = document.getElementById('article1Link');

const article2Source = document.getElementById('article2Source');
const article2Title = document.getElementById('article2Title');
const article2Text = document.getElementById('article2Text');
const article2Link = document.getElementById('article2Link');

const article3Source = document.getElementById('article3Source');
const article3Title = document.getElementById('article3Title');
const article3Text = document.getElementById('article3Text');
const article3Link = document.getElementById('article3Link');

const article4Source = document.getElementById('article4Source');
const article4Title = document.getElementById('article4Title');
const article4Text = document.getElementById('article4Text');
const article4Link = document.getElementById('article4Link');

// Students should change these values.
const cityName = 'Your City';
const latitude = 36.16;
const longitude = -86.78;

// Students should build their own news URL with their own key and settings.
const newsUrl = 'https://newsdata.io/api/1/latest?apikey=pub_68e5788767d54f6fa5038a169adf3258&language=en&category=science,food,crime&timezone=america/chicago&image=1';

function showDate() {
  const today = new Date();
  currentDate.textContent = today.toLocaleDateString();
}

function getWeatherInfo(code) {
  if (code === 0) {
    return { icon: '☀️', text: 'Clear Sky' };
  }

  if (code === 1 || code === 2) {
    return { icon: '🌤️', text: 'Partly Cloudy' };
  }

  if (code === 3) {
    return { icon: '☁️', text: 'Overcast' };
  }

  if (code === 45 || code === 48) {
    return { icon: '🌫️', text: 'Fog' };
  }

  if (code === 51 || code === 53 || code === 55) {
    return { icon: '🌦️', text: 'Drizzle' };
  }

  if (code === 61 || code === 63 || code === 65) {
    return { icon: '🌧️', text: 'Rain' };
  }

  if (code === 71 || code === 73 || code === 75) {
    return { icon: '❄️', text: 'Snow' };
  }

  if (code === 80 || code === 81 || code === 82) {
    return { icon: '🌧️', text: 'Showers' };
  }

  if (code === 95) {
    return { icon: '⛈️', text: 'Thunderstorm' };
  }

  return { icon: '🌍', text: 'Unknown' };
}

async function loadWeather() {
  weatherCity.textContent = cityName;

  const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&current=temperature_2m,weather_code,wind_speed_10m';

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    const weather = getWeatherInfo(data.current.weather_code);

    weatherIcon.textContent = weather.icon;
    weatherTemp.textContent = data.current.temperature_2m + '°C';
    weatherCondition.textContent = weather.text;
    weatherWind.textContent = data.current.wind_speed_10m + ' km/h';
  } catch (error) {
    weatherError.textContent = 'Could not load weather data.';
    weatherError.classList.remove('d-none');
  }
}

async function loadCurrency() {
  const currencyUrl = 'https://open.er-api.com/v6/latest/USD';

  try {
    const response = await fetch(currencyUrl);
    const data = await response.json();

    rateEUR.textContent = data.rates.EUR.toFixed(4);
    rateGBP.textContent = data.rates.GBP.toFixed(4);
    rateJPY.textContent = data.rates.JPY.toFixed(4);
    rateMXN.textContent = data.rates.MXN.toFixed(4);
    rateUAH.textContent = data.rates.UAH.toFixed(4);
  } catch (error) {
    currencyError.textContent = 'Could not load exchange rates.';
    currencyError.classList.remove('d-none');
  }
}

async function loadNews() {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();

    const article0 = data.results[0];
    const article1 = data.results[1];
    const article2 = data.results[2];
    const article3 = data.results[3];
    const article4 = data.results[4];

    if (!data.results || data.results.length === 0) {
      newsError.textContent = 'Could not load news articles.';
      newsError.classList.remove('d-none');
      return;
    }

    featuredSource.textContent = article0.source_name;
    featuredTitle.textContent = article0.title;
    featuredText.textContent = article0.description || 'No description available.';
    featuredLink.href = article0.link;

    if (article0.image_url) {
      featuredImage.src = article0.image_url;
      featuredImage.classList.remove('d-none');
    }

    if (article1) {
      article1Source.textContent = article1.source_name;
      article1Title.textContent = article1.title;
      article1Text.textContent = article1.description || 'No description available.';
      article1Link.href = article1.link;
    }

    if (article2) {
      article2Source.textContent = article2.source_name;
      article2Title.textContent = article2.title;
      article2Text.textContent = article2.description || 'No description available.';
      article2Link.href = article2.link;
    }

    if (article3) {
      article3Source.textContent = article3.source_name;
      article3Title.textContent = article3.title;
      article3Text.textContent = article3.description || 'No description available.';
      article3Link.href = article3.link;
    }

    if (article4) {
      article4Source.textContent = article4.source_name;
      article4Title.textContent = article4.title;
      article4Text.textContent = article4.description || 'No description available.';
      article4Link.href = article4.link;
    }
  } catch (error) {
    newsError.textContent = 'Could not load news articles.';
    newsError.classList.remove('d-none');
  }
}

showDate();
loadWeather();
loadCurrency();
loadNews();
