export default function RandomGreeting() {
    const hour = new Date().getHours();
    let greeting = "";
  
    if (hour >= 4 && hour < 10) {
      greeting = "Selamat Pagi";
    } else if (hour >= 10 && hour < 15) {
      greeting = "Selamat Siang";
    } else if (hour >= 15 && hour < 18) {
      greeting = "Selamat Sore";
    } else {
      greeting = "Selamat Malam";
    }
  
    return greeting;
  }
  