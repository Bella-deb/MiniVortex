const sentences = [
  "The population of Earth is over 8 billion!",
  "The blue whale is the largest animal on Earth.",
  "There are more stars in the universe than grains of sand on all beaches.",
  "Coffee is the world's most popular drink.",
  "The human brain uses about 20% of the body's oxygen.",
  "A group of flamingos is called a flamboyance.",
  "The population of the Earth is about 7.9 billion.",
  "The world's hottest desert is the Sahara.",
  "There are more trees on Earth than stars in our galaxy.",
  "The Dead Sea is so salty you can float in it!",
  "The world's tallest building is the Burj Khalifa.",
  "A bolt of lightning can reach 27,000 degrees Celsius!",
  "The population of the Earth is constantly changing.",
  "The Great Wall of China is the longest man-made structure.",
  "Honey never spoils!",
  "The world's first computer mouse was made of wood!",
  "The gestation period for an elephant is 22 months!",
  "There are more muscles in your eye than anywhere else in your body!",
  "The Earth spins at over 1,000 miles per hour!",
  "Chocolate was once used as currency!",
  "The world's quietest room is anechoic!", // Science
  "There are more species of insects than any other animal!", // Animals
  "The world's smallest country is Vatican City!", // Geography
  "The average person blinks about 15-20 times per minute!", // Science
  "The peak of Mount Everest is above the clouds!", // Geography
  "The first website ever went online in 1991!", // Technology
  "Your nose can detect over a trillion different smells!", // Science
  "The population of the Earth adds about 230 people per minute!", // Population
  "The Great Barrier Reef is the world's largest living structure!", // Nature
  "Cats can jump up to six times their own length!", // Animals
  "The human brain generates enough electricity to power a small light bulb!", // Science
  "There are more stars in the Milky Way than grains of sand on Earth!", // Universe
  "The world's saltiest lake is the Dead Sea!", // Geography
  "The world's hottest pepper is the Carolina Reaper!", // Food
  "The population of the Earth is mostly made up of water!", // Science
  "The world's first traffic light was installed in London in 1868!", // History
  "The world's deepest ocean trench is the Mariana Trench!", // Geography
  "Some jellyfish are immortal!", // Animals
  "The world's driest desert is the Atacama Desert!", // Geography
  "The population of the Earth is constantly growing!", // Population
];

const sentence = sentences[Math.floor(Math.random() * sentences.length)];

module.exports = {
  Sentence() {
    return sentence;
  },
};
