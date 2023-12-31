let time = {
    month: 1,
    week: 1,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0
  };

  // Load saved time from cookie
  const savedTime = JSON.parse(localStorage.getItem('savedTime'));
  if (savedTime) {
    time = savedTime;
    updateDisplay();
  }

  function updateDisplay() {
    document.getElementById('month').textContent = `${getMonthName(time.month)}`;
    document.getElementById('week').textContent = `${time.week}`;
    document.getElementById('day').textContent = `${time.day}`;
    document.getElementById('hour').textContent = `${time.hour}`;
    document.getElementById('minute').textContent = `${time.minute}`;
    document.getElementById('second').textContent = `${time.second}`;
  }

  function getMonthName(month) {
    const months = [
      'Hammer', 'Alturiak', 'Ches', 'Tarsakh', 'Mirtul', 'Kythorn',
      'Flamerule', 'Eleasis', 'Eleint', 'Marpenoth', 'Uktar', 'Nightal'
    ];
    return months[month - 1];
  }

  function increment(unit) {
    time[unit]++;
    if (unit === 'month' && time[unit] > 12){
      time[unit] = 1;
      
    }
    else if (unit === 'week' && time[unit] > 3) {
      time[unit] = 1; 
      time.month++;
      changeWeather();
    }
    else if (unit === 'day' && time[unit] > 10) {
      time[unit] = 1;
      time.week++;
      changeWeather();
      
      if (time.week > 3) {
        time.week = 1;
        time.month++;
        changeWeather();
        
        if (time.month > 12) {
          time.month = 1;
          changeWeather();
          
        }
      }

    } else if (unit === 'hour' && time[unit] > 23) {
      time[unit] = 0;
      time.day++;
      changeWeather();
      
      

      if (time.day > 10) {
        time.day = 1;
        time.week++;
        changeWeather();
        
        if (time.week > 3) {
          time.week = 1;
          time.month++;
          changeWeather();
          
          if (time.month > 12) {
            time.month = 1;
            changeWeather();
            
          }
        }
      }
    } else if (time[unit] > 59) {
      time[unit] = 0;
      if (unit === 'minute') {
        time.hour++;
        if (time.hour > 23) {
          time.hour = 0;
          time.day++;
          changeWeather();
          
          if (time.day > 10) {
            time.day = 1;
            time.week++;
            changeWeather();
            
            if (time.week > 3) {
              time.week = 1;
              time.month++;
              changeWeather();
              
              if (time.month > 12) {
                time.month = 1;
                changeWeather();
                
              }
            }
          }
        }
      }
    }
    updateDisplay();
    saveTime();
  }

  function decrement(unit) {
    
    
    time[unit]--;
    if (time[unit] < 1) {
      if (unit === 'month') time[unit] = 12;
      else if (unit === 'week') time[unit] = 3;
      else if (unit === 'day') {
        time[unit] = 10;
        time.week--;
        changeWeather();
        
        if (time.week < 1) {
          time.week = 3;
          time.month--;
          changeWeather();
          
          if (time.month < 1) {
            time.month = 12;
            changeWeather();
            
          }
        }
      } else if (unit === 'hour') {
        time[unit] = 23;
        time.day--;
        changeWeather();
        
        if (time.day < 1) {
          time.day = 10;
          time.week--;
          changeWeather();
          
          if (time.week < 1) {
            time.week = 3;
            time.month--;
            changeWeather();
            
            if (time.month < 1) {
              time.month = 12;
              changeWeather();
              
            }
          }
        }
      } else {
        time[unit] = 59;
        if (unit === 'minute') {
          time.hour--;
          if (time.hour < 0) {
            time.hour = 23;
            time.day--;
            changeWeather();
            
            if (time.day < 1) {
              time.day = 10;
              time.week--;
              changeWeather();
              
              if (time.week < 1) {
                time.week = 3;
                time.month--;
                changeWeather();
                
                if (time.month < 1) {
                  time.month = 12;
                  changeWeather();
                  
                }
              }
            }
          }
        }
      }
    }
    updateDisplay();
    saveTime();
  }

  let intervalId;
  let isPaused = false;

  function pauseUnpause() {
    if (isPaused) {
      intervalId = setInterval(updateTime, 1000);
      isPaused = false;
    } else {
      clearInterval(intervalId);
      isPaused = true;
    }
  }

  function updateTime() {
    time.second++;
    if (time.second === 60) {
      time.second = 0;
      time.minute++;
      if (time.minute === 60) {
        time.minute = 0;
        time.hour++;
        if (time.hour === 24) {
          time.hour = 0;
          time.day++;
          changeWeather();
          if (time.day === 11) {
            time.day = 1;
            time.week++;
            changeWeather();
            if (time.week === 4) {
              time.week = 1;
              time.month++;
              changeWeather();
              if (time.month === 13) {
                time.month = 1;
                changeWeather();
              }
            }
          }
        }
      }
    }
    updateDisplay();
    saveTime();
  }

  function startNewDay() {
    time.hour = 0;
    time.minute = 0;
    time.second = 0;
    time.day++;
    if (time.day === 11) {
      time.day = 1;
      time.week++;
      if (time.week === 4) {
        time.week = 1;
        time.month++;
        if (time.month === 13) {
          time.month = 1;
        }
      }
    }
    updateDisplay();
    
    saveTime();
  }

  function longRest() {
    time.hour += 8;
    if (time.hour >= 24) {
      time.hour -= 24;
      time.day++;
      if (time.day === 11) {
        time.day = 1;
        time.week++;
        if (time.week === 4) {
          time.week = 1;
          time.month++;
          if (time.month === 13) {
            time.month = 1;
          }
        }
      }
    }
    updateDisplay();
    saveTime();
  }

  function saveTime() {
    localStorage.setItem('savedTime', JSON.stringify(time));
  }

  intervalId = setInterval(updateTime, 1000);