const tarotCards = [ 
    { name: "The Fool", image: "images/0_the_fool.png" },
    { name: "The Magician", image: "images/1_the_magician.png" },
    { name: "The High Priestess", image: "images/2_the_high_priestess.png" },
    { name: "The Empress", image: "images/3_the_empress.png" },
    { name: "The Emperor", image: "images/4_the_emperor.png" },
    { name: "The Hierophant", image: "images/5_the_hierophant.png" },
    { name: "The Lovers", image: "images/6_the_lovers.png" },
    { name: "The Chariot", image: "images/7_the_chariot.png" },
    { name: "The Strength", image: "images/8_the_strength.png" },
    { name: "The Hermit", image: "images/9_the_hermit.png" },
    { name: "Wheel of Fortune", image: "images/10_wheel_of_fortune.png" },
    { name: "Justice", image: "images/11_justice.png" },
    { name: "The Hanged Man", image: "images/12_the_hanged_man.png" },
    { name: "Death", image: "images/13_death.png" },
    { name: "Temperance", image: "images/14_temperance.png" },
    { name: "The Devil", image: "images/15_the_devil.png" },
    { name: "The Tower", image: "images/16_the_tower.png" },
    { name: "The Star", image: "images/17_the_star.png"},
    { name: "The Moon", image: "images/18_the_moon.png" },
    { name: "The Sun", image: "images/19_the_sun.png" },
    { name: "Judgement", image: "images/20_judgement.png" },
    { name: "The World", image: "images/21_the_world.png" },
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

    // prepare a shuffled list of unique front images (no repeats)
    const shuffle = (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const shuffledDeck = shuffle(tarotCards);
    const uniqueFronts = shuffledDeck.slice(0, cardsArray.length);

    // for each generated card we'll assign a unique random tarot image for the front face
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
        // pick the preselected unique random card for this index
        const randCard = uniqueFronts[i] || c;
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