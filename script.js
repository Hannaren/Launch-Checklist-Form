let formCheck = false;
let cargoReady = false;
let fuelReady = false;

window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      response.json().then( function(json) {
         const i = Math.floor(Math.random() * json.length);
         const div = document.getElementById("missionTarget");
         div.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[i].name}</li>
                  <li>Diameter: ${json[i].diameter}</li>
                  <li>Star: ${json[i].star}</li>
                  <li>Distance from Earth: ${json[i].distance}</li>
                  <li>Number of Moons: ${json[i].moons}</li>
               </ol>
               <img src="${json[i].image}">
         `;
      });
   });

   let form = document.querySelector("div[id=launchForm]");
   form.addEventListener("submit", function(event) {
      let pilotInput = document.querySelector("input[name=pilotName]");
      let copilotInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");

      let launchStatus = document.getElementById("launchStatus");
      let fuelStatus = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");

      let letters = /^[A-Za-z]+$/;

      let elementVis = document.querySelector("#faultyItems");

      if (pilotInput.value.trim() === "" || copilotInput.value.trim() === "" || fuelLevelInput.value.trim() === "" || cargoMassInput.value.trim() === "") {
         alert("All fields are required!");
         formCheck = false;
         event.preventDefault();
      } else if (typeof String(pilotInput.value) !== "string" || !letters.test(pilotInput.value)) {
         alert("Pilot name may only include letters!");
         formCheck = false;
         event.preventDefault();
      } else if (typeof String(copilotInput.value) !== "string" || !letters.test(copilotInput.value)) {
         alert("Co-pilot name may only include letters!");
         formCheck = false;
         event.preventDefault();
      } else if (isNaN(Number(fuelLevelInput.value))) {
         alert("Invalid input: Only numbers can be used as input for fuel level!");
         formCheck = false;
         event.preventDefault();
      } else if (isNaN(Number(cargoMassInput.value))) {
         alert("Invalid input: Only numbers can be used as input for cargo mass!");
         formCheck = false;
         event.preventDefault();
      } else {
         formCheck = true;
         event.preventDefault();
      }
      
      if (Number(fuelLevelInput.value) < 10000 && formCheck) {
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = "red";

         elementVis.style.visibility = "visible";

         fuelStatus.innerHTML = `Not enough fuel for journey!`;

         fuelReady = false;

         event.preventDefault();
      } else {
         fuelReady = true;
         event.preventDefault();
      }

      if (Number(cargoMassInput.value) > 10000 && formCheck) {
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = "red";

         elementVis.style.visibility = "visible";

         cargoStatus.innerHTML = `Cargo too heavy for launch!`;

         cargoReady = false;

         event.preventDefault();
      } else {
         cargoReady = true;
         event.preventDefault();
      }

      if (fuelReady && cargoReady && formCheck) {
         launchStatus.innerHTML = `Shuttle is ready for launch`;
         launchStatus.style.color = "green";
      
         if (elementVis.style.visibility === "visible") {
            elementVis.style.visibility = "hidden";
         }

         event.preventDefault();
      }
   });
   event.preventDefault();
});

// function updateFunction() {
//    document.getElementById("pilotStatus").innerHTML = `Pilot ${document.getElementById("pilotName").value} is ready for launch.`;
//    document.getElementById("copilotStatus").innerHTML = `Co-pilot ${document.getElementById("copilotName").value} is ready for launch.`;
// };