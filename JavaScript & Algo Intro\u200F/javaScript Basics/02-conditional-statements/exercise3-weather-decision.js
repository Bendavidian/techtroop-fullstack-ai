let temperature = 20;
let weather = "sunny";

let activity;

if (weather === "sunny") {
  if (temperature > 24) {
    activity = "Go to the beach";
  } else if (temperature >= 15) {
    activity = "Go for a walk";
  } else {
    activity = "Stay inside and read";
  }
} else if (weather === "rainy") {
  activity = "Watch a movie indoors";
} else if (weather === "cloudy") {
  if (temperature > 21) {
    activity = "Go hiking";
  } else {
    activity = "Visit a museum";
  }
}

console.log("Temperature:", temperature + "°C");
console.log("Weather:", weather);
console.log("Recommended activity:", activity);
