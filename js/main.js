/* DE NICOLE */
/* const tarotCards = [ 
    { name: "High Priestess", image: "images/high priestess.png" },
    { name: "Justice", image: "images/justice.png" },
    { name: "Strength", image: "images/strength.png" },
    { name: "The Emperor", image: "images/the emperor.png" },
    { name: "The Chariot", image: "images/the chariot.png" },
    { name: "The Empress", image: "images/the empress.png" },
    { name: "The Hermit", image: "images/the hermit.png" },
    { name: "The Hierophant", image: "images/the hierophant.png" },
    { name: "The Magician", image: "images/the magician.png" },
    { name: "Wheel of Fortune", image: "images/wheel of fortune.png" },
    { name: "Temperance", image: "images/temperance.png" },
    { name: "Ace of Cups", image: "images/ace of cups.png" },
    { name: "Ace of Pentacles", image: "images/ace of pentacles.png" },
    { name: "Ace of Swords", image: "images/ace of swords.png" },
    { name: "Ace of Wands", image: "images/ace of wands.png" },
    { name: "Hander", image: "images/hander.png" },
    { name: "The Hanged", image: "images/the hanged.png" },
    { name: "Death", image: "images/death.png" },
    { name: "Eight of Cups", image: "images/eight of cups.png" },
    { name: "Eight of Swords", image: "images/eight of swords.png" },
    { name: "Five of Swords", image: "images/five of swords.png" },
    { name: "Four of Swords", image: "images/four of swords.png" },
    { name: "King of Swords", image: "images/king of swords.png" },
    { name: "Page of Swords", image: "images/page of swords.png" },
    { name: "Ring of Pentacle", image: "images/ring of pentacle.png" },
    { name: "Seven of Cups", image: "images/seven of cups.png" },
    { name: "Six of Sword", image: "images/six of sword.png" },
]; */

const tarotCards = [ 
    { name: "The Fool", image: "images/0_the_fool.png" },
    { name: "The Magician", image: "images/1_the_magician.png" },
    { name: "The High Priestess", image: "images/2_the_high_priestess.png" },
    { name: "The Empress", image: "images/3_the_empress.png" },
    { name: "The Emperor", image: "images/4_the_emperor.png" },
    { name: "The Hierophant", image: "images/5_the_hierophant.png" },
    { name: "The Lovers", image: "images/6_the_lovers.png" },
    { name: "The Chariot", image: "images/7_the_chariot.png" },
    { name: "Strength", image: "images/8_strength.png" },
    { name: "The Hermit", image: "images/9_the_hermit.png" },
    { name: "Wheel of Fortune", image: "images/10_wheel_of_fortune.png" },
    { name: "Justice", image: "images/11_justice.png" },
    { name: "The Hanged Man", image: "images/12_the_hanged_man.png" },
    { name: "Death", image: "images/13_death.png" },
    { name: "Temperance", image: "images/14_temperance.png" },
    { name: "The Devil", image: "images/15_the_devil.png" },
    { name: "The Tower", image: "images/16_the_tower.png" },
    { name: "The Star", image:" images/17_the_star.png"},
    { name: "The Moon", image: "images/18_the_moon.png" },
    { name: "The Sun", image: "images/19_the_sun.png" },
    { name: "Judgement", image: "images/20_judgement.png" },
    { name: "The World", image: "images/21_the_world.png" },
];

const backCardImage = "images/image 5.png"; // back of card image
document.addEventListener('DOMContentLoaded', () => {
    // `tartoCards` is defined in js/tarot.js
    const container = document.querySelector('.cards');
    if (!container) return;

    // clear any existing static content
    container.innerHTML = '';

    // create DOM cards from the array (limit to 19 cards)
    const cardsArray = tarotCards.slice(0, 19); // take first 19 entries

    // for each generated card we'll pick a random tarot image for the front face
    cardsArray.forEach((c, i) => {
        const card = document.createElement('div');
        card.className = 'card';

        // mark center card if desired (middle index)
        if (i === Math.floor(cardsArray.length / 2)) {
            card.classList.add('center-card');
        }

        // store the card name for later use
        card.dataset.name = c.name || '';
        card.dataset.backCardImage = backCardImage;

        // build flip structure: .card-inner > .card-face.back, .card-face.front
        const inner = document.createElement('div');
        inner.className = 'card-inner';
        inner.tabIndex = 0; // focusable for keyboard

        const back = document.createElement('img');
        back.className = 'card-face back';
        back.src = backCardImage;
        back.alt = 'card back';

    // pick a random card from the full tarotCards array for the front face
    const randCard = tarotCards[Math.floor(Math.random() * tarotCards.length)] || c;
    const front = document.createElement('img');
    front.className = 'card-face front';
    front.src = randCard.image || c.image || backCardImage;
    front.alt = randCard.name || c.name || 'card front';

        inner.appendChild(back);
        inner.appendChild(front);
        card.appendChild(inner);

        // toggle function
        const toggle = () => {
            card.classList.toggle('flipped');
            card.classList.toggle('selected');
            console.log('Card clicked/toggled:', card.dataset.name || card);
        };

        // click and keyboard handlers
        card.addEventListener('click', toggle);
        inner.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggle();
            }
        });

        container.appendChild(card);
    });

    // attach interaction handlers (click to flip / select)
    container.querySelectorAll('.card').forEach(card => {
       
    });
});