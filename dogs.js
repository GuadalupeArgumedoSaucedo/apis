const BASE_URL = "https://dog.ceo/api/"; // Base URL for the Dog CEO API
const CAT_BASE_URL = "https://api.thecatapi.com/v1/";


// Fetch dog breeds and populate the dropdown menu
const fetchBreeds = async () => {
  try {
    const response = await fetch(`${BASE_URL}breeds/list/all`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    populateBreedsDropdown(data.message);
  } catch (error) {
    console.error("Error fetching dog breeds:", error);
  }
};

// Fetch CAT breeds and populate the dropdown menu
const fetchCats = async () => {
  try {
    const catResponse = await fetch(`${CAT_BASE_URL}images/search`);
    if (!catResponse.ok) {
      throw new Error(`Network response was not ok: ${catResponse.statusText}`);
    }
    
    const data = await catResponse.json();
    populateBreedsDropdown(data);
  } catch (error) {
    console.error("Error fetching cat breeds:", error);
  }
}


// Populate the dropdown menu with the list of breeds
const populateBreedsDropdown = (breeds) => {
  const breedsDropdown = document.getElementById("breedsDropdown");
  for (const breed in breeds) {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    breedsDropdown.appendChild(option);
  }
};


// Display a random dog image from the selected breed
const DisplayImage = async () => {
  const breedsDropdown = document.getElementById("breedsDropdown");
  const selectedBreed = breedsDropdown.value;

  //Endpoint (documarntation)
  try {
    const response = await fetch(
      `${BASE_URL}breed/${selectedBreed}/images/random`
    );
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    document.getElementById("myImage").src = data.message;
  } catch (error) {
    console.error("Error fetching dog image:", error);
  }
};

// Display a random CAT image from the selected breed
const displayCat = async () => {
  try {
    const catResponse = await fetch(
      `https://api.thecatapi.com/v1/images/search`
    );
    if (!catResponse.ok) {
      throw new Error(`Network response was not ok: ${catResponse.statusText}`);
    }
    const data = await catResponse.json();
    document.getElementById("myCats").src = data[0].url; // Corrected ID to match the HTML
  } catch (error) {
    console.error("Error fetching cat image:", error); // Corrected error message for cat image
  }
};

// Call the fetchBreeds function to populate the dropdown on page load
fetchBreeds();
fetchCats();
