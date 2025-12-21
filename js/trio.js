// trio.js — create three flip cards centered, back = image 5, front = random tarot image
document.addEventListener('DOMContentLoaded', () => {
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
