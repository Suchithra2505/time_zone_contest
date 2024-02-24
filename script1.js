document.addEventListener("DOMContentLoaded", function() {
    // Use your API key from Geoapify
    const API_KEY = 'YOUR_API_KEY';
  
    // Example coordinates
    const lat = 46.73917926727481;
    const lon = 2.3276588684885837;
  
    // Target the div for timezone details
    const timezoneDetailsDiv = document.getElementById("timezone-details");
  
    // Fetch timezone information using Reverse Geocoding API
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`)
      .then(resp => resp.json())
      .then((result) => {
        if (result.timezone) {
          const { name, offset_STD, offset_STD_seconds, offset_DST, offset_DST_seconds, country, postcode, city, lon: longitude, lat: latitude } = result;
  
          // Set timezone details in the HTML
          document.getElementById("tz-name").innerText = name;
          document.getElementById("lat").innerText = latitude;
          document.getElementById("offset-std").innerText = offset_STD;
          document.getElementById("offset-std-seconds").innerText = offset_STD_seconds;
          document.getElementById("offset-dst").innerText = offset_DST ? offset_DST : 'N/A';
          document.getElementById("offset-dst-seconds").innerText = offset_DST_seconds ? offset_DST_seconds : 'N/A';
          document.getElementById("country").innerText = country;
          document.getElementById("postcode").innerText = postcode;
          document.getElementById("city").innerText = city;
          document.getElementById("long").innerText = longitude;
  
        } else {
          console.log("No timezone information found");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
  