// ZEN QUOTES API - GETTING RANDOM QUOTE
async function getQuote() {
    const quote_response = await fetch("https://zenquotes.io/api/quotes/")
    const quote_data = await quote_response.json();

    console.log(quote_data);

    // quote_data[0].q - get the first item listed in array (quote)
    document.getElementById("quote_spot").innerHTML = quote_data[0].q;
}

// ANNYANG API - USING VOICE TO CHANGE PAGE, COLOR, AND RECEIVE ALERTS
if (annyang) {
    // defining commands
    const commands = {
    "hello": () => {
        alert('Hello World');
    },
    
    // :page - ":" for one-word arguments in command (info from api docs)
    // toLowerCase - needed since api is transcribing words when listening and
    // can have capitals
    "navigate to :page": (page) => {
        const desired_page = page.toLowerCase();

        if (desired_page === "home") {
            window.location="home.html";
        }
        if (desired_page === "stocks") {
            window.location="stocks.html";
        }
        if (desired_page === "dogs") {
            window.location="dogs.html";
        }
    },

    // :color - ":" for one-word arguments in command (info from api docs)
    "change the color to :color": (color) => {
        document.body.style.backgroundColor = color.toLowerCase();
    }
    
    };

// Add commands to annyang
    annyang.addCommands(commands);

}


function startListening() {
    annyang.start();
}

function stopListening() {
    annyang.abort();
}

// SIMPLE SLIDER API - CREATING RANDOMLY-GENERATED DOG SLIDESHOW
async function displayDogs() {
    // array to store the 10 dog images
    const full_dog_carousel = [];

    // continuing to get dog image URLs from API if there aren't enough images
    for (let img_count = 0; img_count < 10; img_count++) {
        const dog_response = await fetch("https://dog.ceo/api/breeds/image/random")
        const dog_data = await dog_response.json();

        console.log(dog_data);

        // .message - is defined in the api docs as the URL to the dog image
        // adding dog URLs/images to array
        full_dog_carousel.push(dog_data.message);

        const added_img = document.createElement("img")
        added_img.src = full_dog_carousel[img_count]

        // add images to dog_spot (defined in HTML)
        document.getElementById("dog_spot").appendChild(added_img);

    }

    simpleslider.getSlider();

}

// DOG API - CREATING RANDOMLY-GENERATED DOG BUTTONS
async function displayDogButtons() {
    const dog_button_response = await fetch("https://dogapi.dog/api/v2/breeds")
    const dog_button_data = await dog_button_response.json();

    console.log(dog_button_data);
    
    // unfinished

}

function runMultipleFunc() { 
    displayDogs();
    getQuote();
    displayDogButtons();

}

window.onload = runMultipleFunc();