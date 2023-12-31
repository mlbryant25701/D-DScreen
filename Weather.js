  
 

 function getSeason(month) {
    const seasons = {
      spring: ["Hammer", "Alturiak", "Ches"],
      summer: ["Tarsakh", "Mirtul", "Kythorn"],
      fall: ["Flamerule", "Eleasis", "Eleint"],
      winter: ["Marpenoth", "Uktar", "Nightal"]
    };
  
    for (const season in seasons) {
      if (seasons[season].includes(month)) {
        return season;
      }
    }
  
    return "Invalid month"; // Return this if the input month is not found in any season
  }
  
  const climateWeatherSpring = {
    tropical: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    arid: ["clear", "cloudy", "partly cloudy"],
    temperate: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain"],
    continental: ["chance of flurries", "clear", "cloudy", "partly cloudy", "flurries", "snow"],
    polar: ["clear", "cloudy", "partly cloudy", "flurries", "chance of snow"]
  };
  
  const climateWeatherSummer = {
    tropical: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    arid: ["clear", "cloudy", "partly cloudy"],
    temperate: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    continental: ["chance of flurries", "clear", "cloudy", "partly cloudy", "flurries", "rain"],
    polar: ["clear", "cloudy", "partly cloudy", "flurries", "chance of snow"]
  };
  
  const climateWeatherFall = {
    tropical: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    arid: ["clear", "cloudy", "partly cloudy"],
    temperate: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    continental: ["chance of flurries", "clear", "cloudy", "partly cloudy", "flurries", "rain"],
    polar: ["clear", "cloudy", "partly cloudy", "flurries", "chance of snow"]
  };
  
  const climateWeatherWinter = {
    tropical: ["chance of rain", "clear", "cloudy", "partly cloudy", "rain", "thunderstorms"],
    arid: ["clear", "cloudy", "partly cloudy"],
    temperate: ["chance of snow", "clear", "cloudy", "partly cloudy", "snow", "chance of flurries"],
    continental: ["chance of snow", "clear", "cloudy", "partly cloudy", "snow", "chance of flurries"],
    polar: ["clear", "cloudy", "partly cloudy", "chance of snow"]
  };
  
  function getRandomWeather(season, climateRegion) {
    let possibleWeather;
    switch (season) {
      case "spring":
        possibleWeather = climateWeatherSpring[climateRegion];
        break;
      case "summer":
        possibleWeather = climateWeatherSummer[climateRegion];
        break;
      case "fall":
        possibleWeather = climateWeatherFall[climateRegion];
        break;
      case "winter":
        possibleWeather = climateWeatherWinter[climateRegion];
        break;
      default:
        possibleWeather = [];
    }
  
    let randomWeather;
    const chanceOfPrecipitation = calculateChanceOfPrecipitation(climateRegion, season); // Function to calculate chance of precipitation based on region and season
  
    if (Math.random() < chanceOfPrecipitation) {
      const precipitationWeather = possibleWeather.filter(weather => isPrecipitation(weather));
      randomWeather = precipitationWeather[Math.floor(Math.random() * precipitationWeather.length)];
    } else {
      const nonPrecipitationWeather = possibleWeather.filter(weather => !isPrecipitation(weather));
      randomWeather = nonPrecipitationWeather[Math.floor(Math.random() * nonPrecipitationWeather.length)];
    }
  
    return randomWeather;
  }

  function calculateChanceOfPrecipitation(climateRegion, season) {
    // Add your logic here to calculate the chance of precipitation based on the region and season
    // For example, you could use a lookup table or an algorithm to determine the chance
    // Return the calculated chance as a decimal (e.g., 0.3 for 30% chance)

        let percipitationChance;
      
        switch (climateRegion) {
          case "tropical":
            switch (season) {
              case "spring":
                percipitationChance = .80;
                break;
              case "summer":
                percipitationChance = .50;
                break;
              case "fall":
                percipitationChance = .30;
                break;
              case "winter":
                percipitationChance = .20;
                break;
            }
            break;
          case "arid":
            switch (season) {
                case "spring":
                  percipitationChance = .1;
                  break;
                case "summer":
                  percipitationChance = .1;
                  break;
                case "fall":
                  percipitationChance = .1;
                  break;
                case "winter":
                  percipitationChance = .05;
                  break;
              }
              break;
            case "temperate":
            switch (season) {
                case "spring":
                    percipitationChance = .40;
                    break;
                case "summer":
                    percipitationChance = .10;
                    break;
                case "fall":
                    percipitationChance = .15;
                    break;
                case "winter":
                    percipitationChance = .25;
                    break;
                }
                break;
            case "continental":
            switch (season) {
                case "spring":
                    percipitationChance = .40;
                    break;
                case "summer":
                    percipitationChance = .10;
                    break;
                case "fall":
                    percipitationChance = .15;
                    break;
                case "winter":
                    percipitationChance = .25;
                    break;
                }
            break;
            case "polar":
            switch (season) {
                case "spring":
                    percipitationChance = .60;
                    break;
                case "summer":
                    percipitationChance = .40;
                    break;
                case "fall":
                    percipitationChance = .30;
                    break;
                case "winter":
                    percipitationChance = .50;
                    break;
                }
            break;
        }

    return percipitationChance; // Placeholder value, replace with your actual calculation
  }
  
  function isPrecipitation(weather) {
    const precipitationTypes = ["chance of rain", "rain", "thunderstorms", "chance of snow", "snow", "flurries", "chance of flurries", "chance of sleet", "sleet", "chance of storms"];
    return precipitationTypes.includes(weather);
  }

  function capitalizeFirstLetterOfEveryWord(str) {
    return str.replace(/\b\w/g, function(char) {
      return char.toUpperCase();
    });
  }

  function changeWeather() {
    
    const selectedClimateRegion = document.getElementById('climateRegion').value;
    
    const thismonth = document.getElementById('month').innerHTML;
    const season = getSeason(thismonth);
    const randomWeather = getRandomWeather(season, selectedClimateRegion);
    document.getElementById('season').textContent = season;
    document.getElementById('weatherImage').src = `weather/${randomWeather}.png`;
    document.getElementById('todaysWeather').innerHTML = ' - ' + capitalizeFirstLetterOfEveryWord(randomWeather);
  }

  