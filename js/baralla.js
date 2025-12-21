const tarotCards = [ 
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
];
// Use the actual image asset in the `img/` folder
const backCardImage = "img/image 5.png"; // back of card image (also used as front to force all cards to show image 5)
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
    // helper to fix path prefix (some entries use `images/` but assets live in `img/`)
    const fixPath = (p) => (typeof p === 'string' ? p.replace(/^images\//, 'img/') : p);
    const front = document.createElement('img');
    front.className = 'card-face front';
    front.src = fixPath(randCard.image || c.image) || backCardImage;
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