// trio.js — create three flip cards centered, back = image 5, front = random tarot image
document.addEventListener('DOMContentLoaded', () => {
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

    // use the correct img folder for the back face
    const backCardImage = 'img/image 5.png';
    const container = document.querySelector('.card-fan .cards');
    if (!container) return;

    // clear and create three cards
    container.innerHTML = '';

    const count = 3;
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        // optional center styling: later cards will be positioned by existing .card rules

        const inner = document.createElement('div');
        inner.className = 'card-inner';
        inner.tabIndex = 0;

        const back = document.createElement('img');
        back.className = 'card-face back';
        back.src = backCardImage;
        back.alt = 'card back';

    // pick a random tarot image for the front (fix path prefix if needed)
    const rand = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    const fixPath = p => (typeof p === 'string' ? p.replace(/^images\//, 'img/') : p);
    const front = document.createElement('img');
    front.className = 'card-face front';
    front.src = fixPath(rand.image) || fixPath(rand?.image) || backCardImage;
    front.alt = rand.name || 'card front';

        inner.appendChild(back);
        inner.appendChild(front);
        card.appendChild(inner);

        const toggle = () => card.classList.toggle('flipped');
        card.addEventListener('click', toggle);
        inner.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                toggle();
            }
        });

        container.appendChild(card);
    }

    // layout tweak: set three cards centered with small spacing using inline transforms
    const cards = Array.from(container.querySelectorAll('.card'));
    // compute simple horizontal offsets so three cards are centered
    const spacing = 310; // px between centers (requested)
    const centerIndex = (cards.length - 1) / 2;
    cards.forEach((el, idx) => {
        const offset = (idx - centerIndex) * spacing;
        // no rotation for trio cards — keep them upright
        const angle = 0; // degrees (0% rotation)
    // move the trio cards down by 160px (add 160px to the translateY portion)
    el.style.transform = `translate(-50%, calc(-60% + 160px)) rotate(${angle}deg) translateX(${offset}px)`;
        el.style.zIndex = `${100 - Math.abs(idx - centerIndex)}`;
    });
});
