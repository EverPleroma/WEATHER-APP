const form = document.getElementById("form")
const cityInput = document.getElementById("city")
const wrapper = document.getElementById("wrapper")
const background = document.getElementById("main")
const weatherDetails = document.getElementById("weatherInfo")



form.addEventListener("submit", weatherDisplay)
function weatherDisplay(event){
    event.preventDefault()


    let city = cityInput.value

    weatherAcess(city)

    form.reset()
}

function getCountryName(countryCode) {
    return countryNames[countryCode] || countryCode;
 
}
    


function weatherAcess(city){
    let weatherRequest = new XMLHttpRequest()
    let APIKey = "92d239cf9f46ef82bf25cb75e15b6e1f"
    weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`)

    weatherRequest.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            let weatherInfo = JSON.parse(this.responseText)
            
            weatherInfo.sys.country = getCountryName(weatherInfo.sys.country)

            printDataOnUI(weatherInfo)
        }
    }

    weatherRequest.send()
}

weatherAcess()


// Print to UI

function printDataOnUI(weatherInfo){
    wrapper.innerHTML = ""
    weatherDetails.innerHTML = ""

    console.log(weatherInfo);
    let temperature = weatherInfo.main.temp
    let convTemp = temperature - 273.15
    convTemp = (temperature - 273.15).toFixed()


    let cityName = `${weatherInfo.name}, ${weatherInfo.sys.country}`
    let dateTimeInfo = formatDateTime(weatherInfo)
    let dateInfo = formatDateTime(weatherInfo).dateDisplay
    let timeInfo = formatDateTime(weatherInfo).timeDisplay
    let weatherDescription = weatherInfo.weather[0].description
    // weatherDescription = weatherDescription.toUpperCase()

    console.log(weatherDescription);
    

    let humidity = weatherInfo.main.humidity
    humidity = humidity.toFixed()
    let feelsLike = weatherInfo.main.feels_like
    let wind_Speed = weatherInfo.wind.speed
    

    console.log(cityName);
    


    let dateTime_container = document.createElement("div")
    dateTime_container.classList.add("dateTime_container")

    let timeText = document.createElement("h3")
    timeText.textContent = timeInfo

    let dateText = document.createElement("p")
    dateText.textContent = dateInfo

    let tempCity_container = document.createElement("div")
    tempCity_container.classList.add("tempCity_container")

    let tempText = document.createElement("h1")
    tempText.textContent = `${convTemp}°C`

    let cityText = document.createElement("p")
    cityText.textContent = cityName

    let weatherDef = document.createElement("div")
    weatherDef.classList.add("weatherDef")

    let weatherCondition = document.createElement("div")
    weatherCondition.classList.add("weatherCondition")

    let weatherConditionText = document.createElement("h1")
    weatherConditionText.textContent = weatherDescription

    let weatherIcon = document.createElement("div")
    weatherIcon.classList.add("weatherCondition")

    let weatherIconDisplay = document.createElement("i")
    weatherIconDisplay.classList.add("fa-solid", "fa-cloud-moon-rain")

    let extraWeatherInfo = document.createElement("div")
    extraWeatherInfo.classList.add("extraWeatherInfo")

    // Humidity
    let weatherHumidity = document.createElement("div")
    weatherHumidity.classList.add("weatherHumidity")

    let weatherHumidityP = document.createElement("p")
    weatherHumidityP.textContent = "Humidity:"

    let weatherHumidityH1 = document.createElement("h1")
    weatherHumidityH1.textContent = `${humidity}%`

    // Feelslike
    let weatherFeel = document.createElement("div")
    weatherFeel.classList.add("weatherHumidity")

    let weatherFeelP = document.createElement("p")
    weatherFeelP.textContent = "FeelsLike:"

    let weatherFeelH1 = document.createElement("h1")
    weatherFeelH1.textContent = `${feelsLike}%`

    // Wind
    let windSpeed = document.createElement("div")
    windSpeed.classList.add("weatherHumidity")

    let windSpeedP = document.createElement("p")
    windSpeedP.textContent = "Wind Speed:"

    let windSpeedH1 = document.createElement("h1")
    windSpeedH1.textContent = `N${wind_Speed}Km/h`



    // Appending
    tempCity_container.append(tempText, cityText)
    dateTime_container.append(timeText, dateText)
    wrapper.append(dateTime_container, tempCity_container)

    windSpeed.append(windSpeedP,windSpeedH1)
    weatherFeel.append(weatherFeelP, weatherFeelH1)
    weatherHumidity.append(weatherHumidityP,weatherHumidityH1)
    extraWeatherInfo.append(weatherFeel,weatherHumidity,windSpeed)

    weatherCondition.append(weatherConditionText)

    weatherDef.append(weatherCondition,weatherIconDisplay)

    weatherDetails.append(weatherDef,extraWeatherInfo)

    

    weatherFunction(weatherInfo)
    weatherIcons(weatherInfo, weatherIconDisplay, weatherDescription)
}

// Format date and time
function formatDateTime(data){
   let timezone = data.timezone
   let currentDate = new Date()
   let utcTimeConv =  currentDate.getTime() + currentDate.getTimezoneOffset() * 60000;
   let newDate = new Date(utcTimeConv + timezone * 1000)

    const optionsDate = {
        weekday : 'long',
        month: 'short',
        day: 'numeric'
    };
    
    let formatedDate = newDate.toLocaleDateString('en-US', optionsDate);

    const optionsTime = {
        hour : '2-digit',
        minute : '2-digit',
        hour12 : true
    }

   let formatedTime = newDate.toLocaleTimeString('en-US', optionsTime)


    return{
        dateDisplay : formatedDate,
        timeDisplay : formatedTime
    }
    
}


// Background change
function weatherFunction(weatherInfo){
    background.classList.remove("main-container","background-rainy", "background-clear", "background-cloudy")

    let weatherBackground = weatherInfo.weather[0].main
    
    if(weatherBackground.includes("Clouds")){
        background.classList.add("background-cloudy")
    }else if(weatherBackground.includes("Rain")){
        background.classList.add("background-rainy")
    }else if(weatherBackground.includes("Clear")){
        background.classList.add("background-clear")
    } else {
        background.classList.add("main-container")
    }

    console.log(weatherBackground);
    
}

// Weather Icons
function weatherIcons(weatherInfo, weatherIconDisplay, weatherDescription){
    let lightRain = document.createElement("i")
    lightRain.classList.add("fa-solid", "fa-cloud-moon-rain")

    let heavyRain = document.createElement("i")
    heavyRain.classList.add("fa-solid", "fa-cloud-showers-heavy")

    let normalRain = document.createElement("i")
    normalRain.classList.add("fa-solid", "fa-cloud-rain")

    let cloudy = document.createElement("i")
    cloudy.classList.add("fa-solid", "fa-cloud")

    let clearSky = document.createElement("i")
    clearSky.classList.add("fa-solid", "fa-cloud-sun")


    weatherIconDisplay.classList.remove("fa-cloud-moon-rain","fa-cloud-showers-heavy", "fa-cloud-rain", "fa-cloud", "fa-cloud-sun")

    weatherDescription = weatherInfo.weather[0].description
    // weatherDescription = weatherDescription.toUpperCase()

    if(weatherDescription.includes("overcast clouds" || "broken clouds")){
        weatherIconDisplay.classList.add("fa-cloud")
    }else if(weatherDescription.includes("light rain")){
        weatherIconDisplay.classList.add( "fa-cloud-moon-rain")
    }else if(weatherDescription.includes("heavy rain")){
        weatherIconDisplay.classList.add("fa-cloud-showers-heavy")
    }else if(weatherDescription.includes("moderate rain")){
        weatherIconDisplay.classList.add("fa-cloud-rain")
    }else if(weatherDescription.includes("clear sky")){
        weatherIconDisplay.classList.add("fa-cloud-sun")
    }

    
}




// Country codes and full name
const countryNames = {
    'AF': 'Afghanistan',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua and Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BQ': 'Bonaire, Sint Eustatius and Saba',
    'BA': 'Bosnia and Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'CV': 'Cabo Verde',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo (Democratic Republic of the)',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CW': 'Curaçao',
    'CY': 'Cyprus',
    'CZ': 'Czechia',
    'CI': 'Côte d\'Ivoire',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'SZ': 'Eswatini',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island and McDonald Islands',
    'VA': 'Holy See',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KP': 'Korea (Democratic People\'s Republic of)',
    'KR': 'Korea (Republic of)',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia (Federated States of)',
    'MD': 'Moldova (Republic of)',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestine, State of',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'MK': 'Republic of North Macedonia',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'RE': 'Réunion',
    'BL': 'Saint Barthélemy',
    'SH': 'Saint Helena, Ascension and Tristan da Cunha',
    'KN': 'Saint Kitts and Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin (French part)',
    'PM': 'Saint Pierre and Miquelon',
    'VC': 'Saint Vincent and the Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome and Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SX': 'Sint Maarten (Dutch part)',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia and the South Sandwich Islands',
    'SS': 'South Sudan',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard and Jan Mayen',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan, Province of China',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania, United Republic of',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad and Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks and Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Minor Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela (Bolivarian Republic of)',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands (British)',
    'VI': 'Virgin Islands (U.S.)',
    'WF': 'Wallis and Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe',
    'AX': 'Åland Islands'
  };
  