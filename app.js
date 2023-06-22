// Interação

const citySearchInput = document.getElementById('city-search-input') // Seleciona o elemento de entrada de busca da cidade no HTML
const citySearchButton = document.getElementById('city-search-button') // Seleciona o botão de busca da cidade no HTML

// Exibição
const currentDate = document.getElementById("current-date"); // Seleciona o elemento de exibição da data atual no HTML
const cityName = document.getElementById("city-name"); // Seleciona o elemento de exibição do nome da cidade no HTML
const weatherIcon = document.getElementById("weather-icon"); // Seleciona o elemento de exibição do ícone do clima no HTML
const weatherDescription = document.getElementById("weather-description"); // Seleciona o elemento de exibição da descrição do clima no HTML
const currentTemperature = document.getElementById("current-temperature"); // Seleciona o elemento de exibição da temperatura atual no HTML
const windSpeed = document.getElementById("wind-speed"); // Seleciona o elemento de exibição da velocidade do vento no HTML
const feelsLikeTemperature = document.getElementById("feels-like-temperature"); // Seleciona o elemento de exibição da sensação térmica no HTML
const currentHumidity = document.getElementById("current-humidity"); // Seleciona o elemento de exibição da umidade atual no HTML
const sunriseTime = document.getElementById("sunrise-time"); // Seleciona o elemento de exibição do horário do nascer do sol no HTML
const sunsetTime = document.getElementById("sunset-time"); // Seleciona o elemento de exibição do horário do pôr do sol no HTML

const api_key = "543bd49c5736cc8d2f7b1818aacce03b"; // Chave de API OpenWeatherMap

citySearchButton.addEventListener("click", () => {
// Quando o botão de busca da cidade for clicado

let cityName = citySearchInput.value; // Obtém o valor digitado no campo de busca da cidade
getCityWeather(cityName); // Obtém as informações climáticas da cidade digitada
})

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position);
}) /* acesso a  localização, recebe os dados se autorizado*/


function getCityWeather(cityName) {
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
     .then((response) => response.json())
     .then((data) => displayWeather(data))

}/* Esta função faz uma solicitação para a API do OpenWeatherMap para obter informações sobre as condições 
climáticas recebe 'cityName', solicitação GET à API, passando a URL adequada com os parâmetros necessários, 
Em seguida, ela encadeia duas chamadas de retorno a primeira converte a resposta em formato JSON e a segunda chama a 
função 'displayWeather' para exibir as informações climáticas recebidas. */

function displayWeather(data) {
  console.log(data)
    let {
        dt,
        name,
        weather: [{ icon, description }],
        main: { temp, feels_like, humidity },
        wind: { speed },
        sys: { sunrise, sunset },
      } = data
   

     currentDate.textContent = dt
     cityName.textContent = name;
     weatherIcon.src = `assets/${icon}.svg`

     weatherDescription.textContent = description;
     currentTemperature.textContent = `${Math.round(temp)}°C`;
     windSpeed.textContent = `${Math.round(speed * 3.6)}km`;
     feelsLikeTemperature.textContent = feels_like;
     currentHumidity.textContent =`${humidity}%`;
     sunriseTime.textContent = formatTime(sunrise);
     sunsetTime.textContent = formatTime(sunset);


} /*Esta função recebe um objeto 'data' contendo informações sobre 
   as condições climáticas e exibe essas informações no HTML. */

function formatTime(epochTime) {
  let date = new Date(epochTime * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  return `${hours}:${minutes}`
}
/* Esta função recebe um epochTime e retorna uma string formatada com a hora no formato "hh:mm". 
A função obtém a hora e os minutos a partir do objeto Date correspondente ao epochTime fornecido. */

function formatDate(epochTime) {
  let date = new Date(epochTime * 1000)
  let formattedDate = date.toLocaleDateString('pt-BR', {month: "long", day: 'numeric' })
  return `Hoje, ${formattedDate}`
} /* Esta função recebe um epochTime e retorna uma  string formatada com a data atual no formato. A formatação 
é feita para o idioma português do Brasil (pt-BR). */

