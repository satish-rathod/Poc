import setupProjectSelector from "./src/utils/setupProjectSelector.js";

window.onload = async function () {
  var product = "rtc"
  setupProjectSelector(product);

  // Store the select element in a variable
  const selectProductElement = document.getElementById('selectProduct');

  // Function to update and pass the config
  function updateAndPassConfig(selectedValue) {
    // Select a product based on the selected value
    product = (selectedValue === "ILS") ? "live" : "rtc";

    // Pass the updated config to setupProjectSelector or any other function as needed
    setupProjectSelector(product);

    // Do something with the selected value
    console.log('Selected Product:', selectedValue);
  }

  // Add an event listener for the 'change' event
  selectProductElement.addEventListener('change', function() {
    // Get the selected value
    const selectedValue = selectProductElement.value;

    // Call the function to update and pass the config
    updateAndPassConfig(selectedValue);
  });
};
