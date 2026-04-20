console.log ("js is connected");
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

// NEW (for 10 articles)
const article5Source = document.getElementById('article5Source');
const article5Title = document.getElementById('article5Title');
const article5Text = document.getElementById('article5Text');
const article5Link = document.getElementById('article5Link');

const article6Source = document.getElementById('article6Source');
const article6Title = document.getElementById('article6Title');
const article6Text = document.getElementById('article6Text');
const article6Link = document.getElementById('article6Link');

const article7Source = document.getElementById('article7Source');
const article7Title = document.getElementById('article7Title');
const article7Text = document.getElementById('article7Text');
const article7Link = document.getElementById('article7Link');

const article8Source = document.getElementById('article8Source');
const article8Title = document.getElementById('article8Title');
const article8Text = document.getElementById('article8Text');
const article8Link = document.getElementById('article8Link');

const article9Source = document.getElementById('article9Source');
const article9Title = document.getElementById('article9Title');
const article9Text = document.getElementById('article9Text');
const article9Link = document.getElementById('article9Link');

const article10Source = document.getElementById('article10Source');
const article10Title = document.getElementById('article10Title');
const article10Text = document.getElementById('article10Text');
const article10Link = document.getElementById('article10Link');

const cityName = 'Nashville';
const latitude = 36.16;
const longitude = -86.78;

const newsUrl = 'https://newsdata.io/api/1/latest?apikey=pub_a7fa61e543004010859e3816efd3f471&language=en&category=science,food,crime&timezone=america/chicago&image=1';

function showDate() {
  const today = new Date();
  currentDate.textContent = today.toLocaleDateString();
}

function getWeatherInfo(code) {
  if (code === 0) return { icon: '☀️', text: 'Clear Sky' };
  if (code === 1 || code === 2) return { icon: '🌤️', text: 'Partly Cloudy' };
  if (code === 3) return { icon: '☁️', text: 'Overcast' };
  if (code === 45 || code === 48) return { icon: '🌫️', text: 'Fog' };
  if (code === 61) return { icon: '🌧️', text: 'Rain' };
  return { icon: '🌍', text: 'Unknown' };
}

async function loadWeather() {
  weatherCity.textContent = cityName;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m`;

  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    const weather = getWeatherInfo(data.current.weather_code);

    console.log(weather);

    const tempF = (data.current.temperature_2m * 9/5 + 32).toFixed(0);

    weatherIcon.textContent = weather.icon;
    weatherTemp.textContent = tempF + '°';
    weatherCondition.textContent = weather.text;

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

    rateEUR.textContent = data.rates.EUR.toFixed(2);
    rateGBP.textContent = data.rates.GBP.toFixed(2);
    rateJPY.textContent = data.rates.JPY.toFixed(2);

  } catch (error) {
    currencyError.textContent = 'Could not load exchange rates.';
    currencyError.classList.remove('d-none');
  }
}

async function loadNews() {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      newsError.textContent = 'Could not load news articles.';
      newsError.classList.remove('d-none');
      return;
    }

    const article0 = data.results[0];

    featuredSource.textContent = article0.source_name;
    featuredTitle.textContent = article0.title;
    featuredText.textContent = article0.description || 'No description available.';
    featuredLink.href = article0.link;

    if (article0.image_url) {
      featuredImage.src = article0.image_url;
      featuredImage.classList.remove('d-none');
    }

    // 1–10 articles
    const articles = data.results;

    const allArticles = [
      article1Source, article1Title, article1Text, article1Link,
      article2Source, article2Title, article2Text, article2Link,
      article3Source, article3Title, article3Text, article3Link,
      article4Source, article4Title, article4Text, article4Link,
      article5Source, article5Title, article5Text, article5Link,
      article6Source, article6Title, article6Text, article6Link,
      article7Source, article7Title, article7Text, article7Link,
      article8Source, article8Title, article8Text, article8Link,
      article9Source, article9Title, article9Text, article9Link,
      article10Source, article10Title, article10Text, article10Link
    ];

    let index = 1;

    for (let i = 0; i < allArticles.length; i += 4) {
      const article = articles[index];
      if (!article) break;

      allArticles[i].textContent = article.source_name;
      allArticles[i + 1].textContent = article.title;
      allArticles[i + 2].textContent = article.description || '';
      allArticles[i + 3].href = article.link;

      index++;
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