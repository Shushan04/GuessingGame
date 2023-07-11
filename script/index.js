const API_URL = 'https://api.openweathermap.org/data'; // URL of the OpenWeatherMap API
const API_KEY = 'fd48bdf8a8b87b3c140f17625f4e2d57'; // API key for accessing the OpenWeatherMap API

// Function to generate a random number between a given range
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Array of city objects with their names and temperature (to be filled later)
const cities = [
  { name: 'London', temperature: null },
  { name: 'New York', temperature: null },
  { name: 'Tokyo', temperature: null },
  { name: 'Sydney', temperature: null },
  { name: 'Dubai', temperature: null },
  { name: 'Erevan', temperature: null },
  { name: 'Paris', temperature: null },
];

// Function to fetch the temperature of a city from the OpenWeatherMap API
const getTemperature = async (city) => {
  try {
    const response = await fetch(`${API_URL}/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data.main.temp;// Return the temperature from the API response
  } catch (error) {
    console.error('Error', error);// Log any errors that occur during the API call
    return null;
  }
};

// Function to update the UI with the guesses and temperature results
const updateGuessesUI = (guesses, cities) => {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';// Clear the existing results

  // Iterate over each guess and corresponding city
  guesses.forEach((guess, i) => {
    const { name, temperature } = cities[i];

    const listItem = document.createElement('p');
    // Set the color of the guess based on its proximity to the actual temperature
    listItem.style.color = Math.abs(temperature - guess) <= 5 ? 'green' : 'red';
    // Display the city name, guess, and actual temperature
    listItem.textContent = `City: ${name}, ${guess} Was ${temperature}`;
     // Add the result to the UI
    resultDiv.appendChild(listItem);
  });
};

// Function to start the game
const startGame = async () => {
  const cityNameElement = document.getElementById('cityName');
  const input = document.getElementById('input');

  const guesses = [];
  // Iterate over each city in the cities array
  for (const city of cities) {
    // Display the current city name in the UI
    cityNameElement.textContent = city.name;

    await new Promise((resolve) => {
      // Add a click event listener to the "check" button
      document.getElementById('check').addEventListener('click', () => {
        // Add the user's guess to the guesses array
        guesses.push(parseInt(input.value, 10));
        // Clear the input field
        input.value = '';
        // Resolve the promise to continue the loop
        resolve();
      });
    });

    // Fetch the temperature for the current city and assign it to the city object
    city.temperature = await getTemperature(city.name);
  }
   // Update the UI with the guesses and temperature results
  updateGuessesUI(guesses, cities);
};


const resetResults = () => {
  // Clear the results from the UI
  document.getElementById('result').innerHTML = '';
};

// Add a click event listener to the "reset" button
document.getElementById('reset').addEventListener('click', resetResults);

// Add a click event listener to the "start" button
document.getElementById('start').addEventListener('click', startGame);



