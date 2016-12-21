/*
Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
jank-free at 60 frames per second.

There are two major issues in this code that lead to sub-60fps performance. Can
you spot and fix both?


Built into the code, you'll find a few instances of the User Timing API
(window.performance), which will be console.log()ing frame rate data into the
browser console. To learn more about User Timing API, check out:
http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

Creator:
Cameron Pittman, Udacity Course Developer
cameron *at* udacity *dot* com
*/

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
  "Pepperoni",
  "Sausage",
  "Fennel Sausage",
  "Spicy Sausage",
  "Chicken",
  "BBQ Chicken",
  "Chorizo",
  "Chicken Andouille",
  "Salami",
  "Tofu",
  "Bacon",
  "Canadian Bacon",
  "Proscuitto",
  "Italian Sausage",
  "Ground Beef",
  "Anchovies",
  "Turkey",
  "Ham",
  "Venison",
  "Lamb",
  "Duck",
  "Soylent Green",
  "Carne Asada",
  "Soppressata Picante",
  "Coppa",
  "Pancetta",
  "Bresola",
  "Lox",
  "Guanciale",
  "Chili",
  "Beef Jerky",
  "Pastrami",
  "Kielbasa",
  "Scallops",
  "Filet Mignon"
];
pizzaIngredients.nonMeats = [
  "White Onions",
  "Red Onions",
  "Sauteed Onions",
  "Green Peppers",
  "Red Peppers",
  "Banana Peppers",
  "Ghost Peppers",
  "Habanero Peppers",
  "Jalapeno Peppers",
  "Stuffed Peppers",
  "Spinach",
  "Tomatoes",
  "Pineapple",
  "Pear Slices",
  "Apple Slices",
  "Mushrooms",
  "Arugula",
  "Basil",
  "Fennel",
  "Rosemary",
  "Cilantro",
  "Avocado",
  "Guacamole",
  "Salsa",
  "Swiss Chard",
  "Kale",
  "Sun Dried Tomatoes",
  "Walnuts",
  "Artichoke",
  "Asparagus",
  "Caramelized Onions",
  "Mango",
  "Garlic",
  "Olives",
  "Cauliflower",
  "Polenta",
  "Fried Egg",
  "Zucchini",
  "Hummus"
];
pizzaIngredients.cheeses = [
  "American Cheese",
  "Swiss Cheese",
  "Goat Cheese",
  "Mozzarella Cheese",
  "Parmesean Cheese",
  "Velveeta Cheese",
  "Gouda Cheese",
  "Muenster Cheese",
  "Applewood Cheese",
  "Asiago Cheese",
  "Bleu Cheese",
  "Boursin Cheese",
  "Brie Cheese",
  "Cheddar Cheese",
  "Chevre Cheese",
  "Havarti Cheese",
  "Jack Cheese",
  "Pepper Jack Cheese",
  "Gruyere Cheese",
  "Limberger Cheese",
  "Manchego Cheese",
  "Marscapone Cheese",
  "Pecorino Cheese",
  "Provolone Cheese",
  "Queso Cheese",
  "Roquefort Cheese",
  "Romano Cheese",
  "Ricotta Cheese",
  "Smoked Gouda"
];
pizzaIngredients.sauces = [
  "Red Sauce",
  "Marinara",
  "BBQ Sauce",
  "No Sauce",
  "Hot Sauce"
];
pizzaIngredients.crusts = [
  "White Crust",
  "Whole Wheat Crust",
  "Flatbread Crust",
  "Stuffed Crust"
];

// Name generator pulled from http://saturdaykid.com/usernames/generator.html
// Capitalizes first letter of each word
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
  switch(x) {
    case "dark":
      var dark = ["dark","morbid", "scary", "spooky", "gothic", "deviant", "creepy", "sadistic", "black", "dangerous", "dejected", "haunted",
      "morose", "tragic", "shattered", "broken", "sad", "melancholy", "somber", "dark", "gloomy", "homicidal", "murderous", "shady", "misty",
      "dusky", "ghostly", "shadowy", "demented", "cursed", "insane", "possessed", "grotesque", "obsessed"];
      return dark;
    case "color":
      var colors = ["blue", "green", "purple", "grey", "scarlet", "NeonGreen", "NeonBlue", "NeonPink", "HotPink", "pink", "black", "red",
      "maroon", "silver", "golden", "yellow", "orange", "mustard", "plum", "violet", "cerulean", "brown", "lavender", "violet", "magenta",
      "chestnut", "rosy", "copper", "crimson", "teal", "indigo", "navy", "azure", "periwinkle", "brassy", "verdigris", "veridian", "tan",
      "raspberry", "beige", "sandy", "ElectricBlue", "white", "champagne", "coral", "cyan"];
      return colors;
    case "whimsical":
      var whimsy = ["whimsical", "silly", "drunken", "goofy", "funny", "weird", "strange", "odd", "playful", "clever", "boastful", "breakdancing",
      "hilarious", "conceited", "happy", "comical", "curious", "peculiar", "quaint", "quirky", "fancy", "wayward", "fickle", "yawning", "sleepy",
      "cockeyed", "dizzy", "dancing", "absurd", "laughing", "hairy", "smiling", "perplexed", "baffled", "cockamamie", "vulgar", "hoodwinked",
      "brainwashed"];
      return whimsy;
    case "shiny":
      var shiny = ["sapphire", "opal", "silver", "gold", "platinum", "ruby", "emerald", "topaz", "diamond", "amethyst", "turquoise",
      "starlit", "moonlit", "bronze", "metal", "jade", "amber", "garnet", "obsidian", "onyx", "pearl", "copper", "sunlit", "brass", "brassy",
      "metallic"];
      return shiny;
    case "noisy":
      var noisy = ["untuned", "loud", "soft", "shrieking", "melodious", "musical", "operatic", "symphonic", "dancing", "lyrical", "harmonic",
      "orchestral", "noisy", "dissonant", "rhythmic", "hissing", "singing", "crooning", "shouting", "screaming", "wailing", "crying", "howling",
      "yelling", "hollering", "caterwauling", "bawling", "bellowing", "roaring", "squealing", "beeping", "knocking", "tapping", "rapping",
      "humming", "scatting", "whispered", "whispering", "rasping", "buzzing", "whirring", "whistling", "whistled"];
      return noisy;
    case "apocalyptic":
      var apocalyptic = ["nuclear", "apocalyptic", "desolate", "atomic", "zombie", "collapsed", "grim", "fallen", "collapsed", "cannibalistic",
      "radioactive", "toxic", "poisonous", "venomous", "disastrous", "grimy", "dirty", "undead", "bloodshot", "rusty", "glowing", "decaying",
      "rotten", "deadly", "plagued", "decimated", "rotting", "putrid", "decayed", "deserted", "acidic"];
      return apocalyptic;
    case "insulting":
      var insulting = ["stupid", "idiotic", "fat", "ugly", "hideous", "grotesque", "dull", "dumb", "lazy", "sluggish", "brainless", "slow",
      "gullible", "obtuse", "dense", "dim", "dazed", "ridiculous", "witless", "daft", "crazy", "vapid", "inane", "mundane", "hollow", "vacuous",
      "boring", "insipid", "tedious", "monotonous", "weird", "bizarre", "backward", "moronic", "ignorant", "scatterbrained", "forgetful", "careless",
      "lethargic", "insolent", "indolent", "loitering", "gross", "disgusting", "bland", "horrid", "unseemly", "revolting", "homely", "deformed",
      "disfigured", "offensive", "cowardly", "weak", "villainous", "fearful", "monstrous", "unattractive", "unpleasant", "nasty", "beastly", "snide",
      "horrible", "syncophantic", "unhelpful", "bootlicking"];
      return insulting;
    case "praise":
      var praise = ["beautiful", "intelligent", "smart", "genius", "ingenious", "gorgeous", "pretty", "witty", "angelic", "handsome", "graceful",
      "talented", "exquisite", "enchanting", "fascinating", "interesting", "divine", "alluring", "ravishing", "wonderful", "magnificient", "marvelous",
      "dazzling", "cute", "charming", "attractive", "nifty", "delightful", "superior", "amiable", "gentle", "heroic", "courageous", "valiant", "brave",
      "noble", "daring", "fearless", "gallant", "adventurous", "cool", "enthusiastic", "fierce", "awesome", "radical", "tubular", "fearsome",
      "majestic", "grand", "stunning"];
      return praise;
    case "scientific":
      var scientific = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"];
      return scientific;
    default:
      var scientific_default = ["scientific", "technical", "digital", "programming", "calculating", "formulating", "cyberpunk", "mechanical", "technological",
      "innovative", "brainy", "chemical", "quantum", "astro", "space", "theoretical", "atomic", "electronic", "gaseous", "investigative", "solar",
      "extinct", "galactic"];
      return scientific_default;
  }
}

// Pulls noun out of array using random number sent from generator
function getNoun(y) {
  switch(y) {
    case "animals":
      var animals = ["flamingo", "hedgehog", "owl", "elephant", "pussycat", "alligator", "dachsund", "poodle", "beagle", "crocodile", "kangaroo",
      "wallaby", "woodpecker", "eagle", "falcon", "canary", "parrot", "parakeet", "hamster", "gerbil", "squirrel", "rat", "dove", "toucan",
      "raccoon", "vulture", "peacock", "goldfish", "rook", "koala", "skunk", "goat", "rooster", "fox", "porcupine", "llama", "grasshopper",
      "gorilla", "monkey", "seahorse", "wombat", "wolf", "giraffe", "badger", "lion", "mouse", "beetle", "cricket", "nightingale",
      "hawk", "trout", "squid", "octopus", "sloth", "snail", "locust", "baboon", "lemur", "meerkat", "oyster", "frog", "toad", "jellyfish",
      "butterfly", "caterpillar", "tiger", "hyena", "zebra", "snail", "pig", "weasel", "donkey", "penguin", "crane", "buzzard", "vulture",
      "rhino", "hippopotamus", "dolphin", "sparrow", "beaver", "moose", "minnow", "otter", "bat", "mongoose", "swan", "firefly", "platypus"];
      return animals;
    case "profession":
      var professions = ["doctor", "lawyer", "ninja", "writer", "samurai", "surgeon", "clerk", "artist", "actor", "engineer", "mechanic",
      "comedian", "fireman", "nurse", "RockStar", "musician", "carpenter", "plumber", "cashier", "electrician", "waiter", "president", "governor",
      "senator", "scientist", "programmer", "singer", "dancer", "director", "mayor", "merchant", "detective", "investigator", "navigator", "pilot",
      "priest", "cowboy", "stagehand", "soldier", "ambassador", "pirate", "miner", "police"];
      return professions;
    case "fantasy":
      var fantasy = ["centaur", "wizard", "gnome", "orc", "troll", "sword", "fairy", "pegasus", "halfling", "elf", "changeling", "ghost",
      "knight", "squire", "magician", "witch", "warlock", "unicorn", "dragon", "wyvern", "princess", "prince", "king", "queen", "jester",
      "tower", "castle", "kraken", "seamonster", "mermaid", "psychic", "seer", "oracle"];
      return fantasy;
    case "music":
      var music = ["violin", "flute", "bagpipe", "guitar", "symphony", "orchestra", "piano", "trombone", "tuba", "opera", "drums",
      "harpsichord", "harp", "harmonica", "accordion", "tenor", "soprano", "baritone", "cello", "viola", "piccolo", "ukelele", "woodwind", "saxophone",
      "bugle", "trumpet", "sousaphone", "cornet", "stradivarius", "marimbas", "bells", "timpani", "bongos", "clarinet", "recorder", "oboe", "conductor",
      "singer"];
      return music;
    case "horror":
      var horror = ["murderer", "chainsaw", "knife", "sword", "murder", "devil", "killer", "psycho", "ghost", "monster", "godzilla", "werewolf",
      "vampire", "demon", "graveyard", "zombie", "mummy", "curse", "death", "grave", "tomb", "beast", "nightmare", "frankenstein", "specter",
      "poltergeist", "wraith", "corpse", "scream", "massacre", "cannibal", "skull", "bones", "undertaker", "zombie", "creature", "mask", "psychopath",
      "fiend", "satanist", "moon", "fullMoon"];
      return horror;
    case "gross":
      var gross = ["slime", "bug", "roach", "fluid", "pus", "booger", "spit", "boil", "blister", "orifice", "secretion", "mucus", "phlegm",
      "centipede", "beetle", "fart", "snot", "crevice", "flatulence", "juice", "mold", "mildew", "germs", "discharge", "toilet", "udder", "odor", "substance",
      "fluid", "moisture", "garbage", "trash", "bug"];
      return gross;
    case "everyday":
      var everyday = ["mirror", "knife", "fork", "spork", "spoon", "tupperware", "minivan", "suburb", "lamp", "desk", "stereo", "television", "TV",
      "book", "car", "truck", "soda", "door", "video", "game", "computer", "calender", "tree", "plant", "flower", "chimney", "attic", "kitchen",
      "garden", "school", "wallet", "bottle"];
      return everyday;
    case "jewelry":
      var jewelry = ["earrings", "ring", "necklace", "pendant", "choker", "brooch", "bracelet", "cameo", "charm", "bauble", "trinket", "jewelry",
      "anklet", "bangle", "locket", "finery", "crown", "tiara", "blingBling", "chain", "rosary", "jewel", "gemstone", "beads", "armband", "pin",
      "costume", "ornament", "treasure"];
      return jewelry;
    case "places":
      var places = ["swamp", "graveyard", "cemetery", "park", "building", "house", "river", "ocean", "sea", "field", "forest", "woods", "neighborhood",
      "city", "town", "suburb", "country", "meadow", "cliffs", "lake", "stream", "creek", "school", "college", "university", "library", "bakery",
      "shop", "store", "theater", "garden", "canyon", "highway", "restaurant", "cafe", "diner", "street", "road", "freeway", "alley"];
      return places;
    case "scifi":
      var scifi = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi;
    default:
      var scifi_default = ["robot", "alien", "raygun", "spaceship", "UFO", "rocket", "phaser", "astronaut", "spaceman", "planet", "star", "galaxy",
      "computer", "future", "timeMachine", "wormHole", "timeTraveler", "scientist", "invention", "martian", "pluto", "jupiter", "saturn", "mars",
      "quasar", "blackHole", "warpDrive", "laser", "orbit", "gears", "molecule", "electron", "neutrino", "proton", "experiment", "photon", "apparatus",
      "universe", "gravity", "darkMatter", "constellation", "circuit", "asteroid"];
      return scifi_default;
  }
}

var adjectives = ["dark", "color", "whimsical", "shiny", "noisy", "apocalyptic", "insulting", "praise", "scientific"];  // types of adjectives for pizza titles
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];                        // types of nouns for pizza titles

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
}

// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};

var selectRandomNonMeat = function() {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
};

var selectRandomCheese = function() {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
};

var selectRandomSauce = function() {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
};

var selectRandomCrust = function() {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
};

var ingredientItemizer = function(string) {
  return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
  var pizza = "";

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function(i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
      pizzaImageContainer,        // contains the pizza image
      pizzaImage,                 // the pizza image itself
      pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
      pizzaName,                  // the pizza name itself
      ul;                         // the list of ingredients

  pizzaContainer = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.classList.add("randomPizzaContainer");
  pizzaContainer.style.width = "33.33%";
  pizzaContainer.style.height = "325px";
  pizzaContainer.id = "pizza" + i;                // gives each pizza element a unique id
  pizzaImageContainer.style.width="35%";

   pizzaImage.src = "img/pizza.png";
// base64 code
/*
  pizzaImage.src = "data:image/png;base64,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";
*/

  pizzaImage.classList.add("img-fluid");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);


  pizzaDescriptionContainer.style.width="65%";

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  // Changes the value for the size of the pizza above the slider
  function changeSliderLabel(size) {
    switch(size) {
      case "1":
        document.querySelector("#pizzaSize").innerHTML = "Small";
        return;
      case "2":
        document.querySelector("#pizzaSize").innerHTML = "Medium";
        return;
      case "3":
        document.querySelector("#pizzaSize").innerHTML = "Large";
        return;
      default:
        console.log("bug in changeSliderLabel");
    }
  }

  changeSliderLabel(size);

   // Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
  function _determineDx (elem, size) {
    var oldWidth = elem.offsetWidth;
    var windowWidth = document.querySelector("#randomPizzas").offsetWidth;
    var oldSize = oldWidth / windowWidth;

    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
      switch(size) {
        case "1":
          return 0.25;
        case "2":
          return 0.3333;
        case "3":
          return 0.5;
        default:
          console.log("bug in sizeSwitcher");
      }
    }

    var newSize = sizeSwitcher(size);
    var dx = (newSize - oldSize) * windowWidth;

    return dx;
  }

  /*
  *  This is simplified version of determineDX function by directly
  *  width percentage
   */
    // Changes the slider value to a percent width
    function sizeSwitcher (size) {
        switch(size) {
            case "1":
                return "20";
            case "2":
                return "30";
            case "3":
                return "40";
            default:
                console.log("bug in sizeSwitcher");
        }
    }



    // Iterates through pizza elements on the page and changes their widths
    // changed to use percentages with sizeSwitcher function
  function changePizzaSizes(size) {
    // for (var i = 0; i < document.querySelectorAll(".randomPizzaContainer").length; i++) {
      var dynamicPizza = document.getElementById("pizzaSizer");
      // var dx = determineDx(dynamicPizza, size);
      // var newwidth = (dynamicPizza.offsetWidth + dx) + 'px';
      dynamicPizza.style.width = (sizeSwitcher(size)) + '%';
    // }

      // change pie size text
      var sizeDescriptor = document.getElementById("sizeDescriptor");
      sizeDescriptor.innerHTML = '';
      if (size === "1") {
        sizeDescriptor.innerHTML = "Feeds one lonely person.";
      } else if (size === "2") {
        sizeDescriptor.innerHTML = "Feeds two romantic people";
      } else
        sizeDescriptor.innerHTML = "Feeds 3-4 normal people or one drunk college student";
  };

  changePizzaSizes(size);

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[timeToResize.length-1].duration + "ms");
}

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
for (var i = 2; i < 100; i++) {
  var pizzasDiv = document.getElementById("randomPizzas");
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average scripting time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// runs updatePositions on scroll
 window.addEventListener('scroll', updatePositions);

// Generates the sliding pizzas when the page loads.


document.addEventListener('DOMContentLoaded', function() {
  var cols = 8;
  var s = 256;
  for (var i = 0; i < 200; i++) {
    var elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "img/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.basicLeft = (i % cols) * s;
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    document.querySelector("#movingPizzas1").appendChild(elem);
  }
  updatePositions();
});
