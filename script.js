//document.addEventListener("DOMContentLoaded", function() {
//     // Use your API key from Geoapify
//     //const API_KEY = 'YOUR_API_KEY';
//     const API_KEY='a3d5c32208ce4699be88e6b0be93cdf4';

//     // Example coordinates
//     const lat =17.4065;
//     const lon = 78.4772
// console.log("i ran");
//     // Fetch timezone information using Reverse Geocoding API
//     fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`)
//    // fetch("https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=a3d5c32208ce4699be88e6b0be93cdf4", requestOptions)
//     .then(resp => resp.json())
//         .then((result) => {
//             console.log(result.results[0]);
//             if (result.timezone) {
        
//                 const { name, offset_STD, offset_STD_seconds, offset_DST, offset_DST_seconds, country, postcode, city, lon: longitude, lat: latitude } = results[0].timezone;
//             console.log(name);
//                 // Set timezone details in the HTML
//                 document.getElementById("tz-name").innerText = name;
//                 document.getElementById("lat").innerText = latitude;
//                 document.getElementById("offset-std").innerText = offset_STD;
//                 document.getElementById("offset-std-seconds").innerText = offset_STD_seconds;
//                 document.getElementById("offset-dst").innerText = offset_DST ? offset_DST : 'N/A';
//                 document.getElementById("offset-dst-seconds").innerText = offset_DST_seconds ? offset_DST_seconds : 'N/A';
//                 document.getElementById("country").innerText = result.country;
//                 document.getElementById("postcode").innerText = result.postcode;
//                 document.getElementById("city").innerText = result.city;
//                 document.getElementById("long").innerText = longitude;

//             } else {
//                 console.log("No timezone information found");
//             }
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         });
// });
const getCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lat = position.coords.latitude;
          long = position.coords.longitude;
          resolve({ lat, long });
        });
      } else {
        reject(new Error("Location  not found "));
      }
    });
  };
  
  const getTimeZoneFromCoords = async () => {
    try {
      const { lat, long } = await getCoordinates();
      let geoInfo = await fetch(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=a3d5c32208ce4699be88e6b0be93cdf4`
      );
      let result = await geoInfo.json();
  
      if (result.results && result.results.length > 0) {
        // dom manipulation
        document.querySelector(
          ".coordinatecontainer .time-zone-name-field .value"
        ).innerText = result.results[0].timezone.name;
        document.querySelector(
          ".coordinatecontainer .lat-field .value"
        ).innerText = result.results[0].lat;
        document.querySelector(
          ".coordinatecontainer .long-field .value"
        ).innerText = result.results[0].lon;
        document.querySelector(
          ".coordinatecontainer .std-field .value"
        ).innerText = result.results[0].timezone.offset_STD;
        document.querySelector(
          ".coordinatecontainer .std-sec-field .value"
        ).innerText = result.results[0].timezone.offset_STD_seconds;
        document.querySelector(
          ".coordinatecontainer .dst-field .value"
        ).innerText = result.results[0].timezone.offset_DST;
        document.querySelector(
          ".coordinatecontainer .dst-sec-field .value"
        ).innerText = result.results[0].timezone.offset_DST_seconds;
        document.querySelector(
          ".coordinatecontainer .country-field .value"
        ).innerText = result.results[0].country;
        document.querySelector(
          ".coordinatecontainer .postcode-field .value"
        ).innerText = result.results[0].postcode;
        document.querySelector(
          ".coordinatecontainer .city-field .value"
        ).innerText = result.results[0].city;
      }
    } catch (err) {
      console.log(err);
    }
  };
  getTimeZoneFromCoords();
  
  const input = document.querySelector(".user-input");
  const button = document.querySelector(".user-button");
  
  const getTimeZoneFromUser = async () => {
    try {
      const address = input.value;
      if (address) {
        let geoInfo = await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
            address
          )}&apiKey=a3d5c32208ce4699be88e6b0be93cdf4`
        );
  
        let result = await geoInfo.json();
        document.querySelector(".address-result").style.display = "block";
        document.querySelector(".warning").style.display = "none";
  
        if (result.features && result.features.length > 0) {
          // dom manipulation code
          document.querySelector(
            ".addresscontainer  .time-zone-name-field .value"
          ).innerText = result.features[0].properties.timezone.name;
          document.querySelector(
            ".addresscontainer .lat-field .value"
          ).innerText = result.features[0].properties.lat;
          document.querySelector(
            ".addresscontainer .long-field .value"
          ).innerText = result.features[0].properties.lon;
          document.querySelector(
            ".addresscontainer .std-field .value"
          ).innerText = result.features[0].properties.timezone.offset_STD;
          document.querySelector(
            ".addresscontainer .std-sec-field .value"
          ).innerText = result.features[0].properties.timezone.offset_STD_seconds;
          document.querySelector(
            ".addresscontainer .dst-field .value"
          ).innerText = result.features[0].properties.timezone.offset_DST;
          document.querySelector(
            ".addresscontainer .dst-sec-field .value"
          ).innerText = result.features[0].properties.timezone.offset_DST_seconds;
          document.querySelector(
            ".addresscontainer .country-field .value"
          ).innerText = result.features[0].properties.country;
          document.querySelector(
            ".addresscontainer .postcode-field .value"
          ).innerText = result.features[0].properties.postcode;
          document.querySelector(
            ".addresscontainer .city-field .value"
          ).innerText = result.features[0].properties.city;
        } else {
          document.querySelector(".address-result").style.display = "none";
          document.querySelector(".warning").innerText =
            "No timezone information found";
          document.querySelector(".warning").style.display = "block";
        }
      } else {
        document.querySelector(".address-result").style.display = "none";
        document.querySelector(".warning").innerText = "Please enter an address";
        document.querySelector(".warning").style.display = "block";
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  button.addEventListener("click", getTimeZoneFromUser);
