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
    // Make EXIT image (any color) navigate back to home
    const exitEl = document.querySelector('.contenedor-imagen');
    if (exitEl) {
        exitEl.setAttribute('role', 'button');
        exitEl.setAttribute('tabindex', '0');
        const goHome = () => { window.location.href = 'home.html'; };
        exitEl.addEventListener('click', goHome);
        exitEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goHome();
            }
        });
    }

    const container = document.querySelector('.cards');
    if (!container) return;

    // helper: shuffle array copy
    const shuffle = (arr) => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    // track last deck signature to avoid immediate repeats on reshuffle
    let lastSignature = null;

    const buildDeck = () => {
        // fade out cards container briefly
        container.style.transition = 'opacity 200ms ease';
        container.style.opacity = '0';

        // clear and rebuild after a short delay
        setTimeout(() => {
            container.innerHTML = '';

            const cardsArray = tarotCards.slice(0, 19);
            let shuffledDeck = shuffle(tarotCards);
            let uniqueFronts = shuffledDeck.slice(0, cardsArray.length);

            // ensure a different signature from last build (best-effort, few retries)
            const getSig = (fronts) => fronts.map(f => f && f.name).join('|');
            let tries = 0;
            while (lastSignature && getSig(uniqueFronts) === lastSignature && tries < 3) {
                shuffledDeck = shuffle(tarotCards);
                uniqueFronts = shuffledDeck.slice(0, cardsArray.length);
                tries++;
            }
            lastSignature = getSig(uniqueFronts);

            const selectionOrder = [];

            cardsArray.forEach((c, i) => {
                const card = document.createElement('div');
                card.className = 'card';

                if (i === Math.floor(cardsArray.length / 2)) {
                    card.classList.add('center-card');
                }

                card.dataset.name = (uniqueFronts[i] && uniqueFronts[i].name) || c.name || '';
                card.dataset.backCardImage = backCardImage;

                const inner = document.createElement('div');
                inner.className = 'card-inner';
                inner.tabIndex = 0;

                const back = document.createElement('img');
                back.className = 'card-face back';
                back.src = backCardImage;
                back.alt = 'card back';

                const randCard = uniqueFronts[i] || c;
                const fixPath = (p) => (typeof p === 'string' ? p.replace(/^images\//, 'img/') : p);
                const front = document.createElement('img');
                front.className = 'card-face front';
                front.src = fixPath(randCard.image || c.image) || backCardImage;
                front.alt = randCard.name || c.name || 'card front';

                inner.appendChild(back);
                inner.appendChild(front);
                card.appendChild(inner);

                const toggle = () => {
                    card.classList.toggle('flipped');
                    card.classList.toggle('selected');

                    const isSelected = card.classList.contains('selected');
                    if (isSelected) {
                        selectionOrder.push(card);
                    } else {
                        for (let idx = 0; idx < selectionOrder.length; idx++) {
                            if (selectionOrder[idx] === card) {
                                selectionOrder.splice(idx, 1);
                                break;
                            }
                        }
                    }

                    if (selectionOrder.length === 3) {
                        const picks = selectionOrder.map(s => {
                            const frontImg = s.querySelector('.card-face.front');
                            return {
                                name: s.dataset.name || '',
                                image: frontImg ? frontImg.src : ''
                            };
                        });
                        try {
                            sessionStorage.setItem('selectedThree', JSON.stringify(picks));
                        } catch (err) {
                            console.warn('Could not save selected cards to sessionStorage', err);
                        }

                        try { container.style.pointerEvents = 'none'; } catch (e) {}
                        setTimeout(() => {
                            try {
                                const b = document.body;
                                b.style.opacity = b.style.opacity || '1';
                                b.style.transition = 'opacity 1s ease';
                                requestAnimationFrame(() => { b.style.opacity = '0'; });
                            } catch (err) {
                                console.warn('Fade-out failed, will navigate after delay', err);
                            }
                            setTimeout(() => { window.location.href = 'trio.html'; }, 1000);
                        }, 1000);
                    }
                };

                card.addEventListener('click', toggle);
                inner.addEventListener('keydown', (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        toggle();
                    }
                });

                container.appendChild(card);
            });

            // re-enable and fade back in
            container.style.pointerEvents = '';
            requestAnimationFrame(() => {
                container.style.opacity = '1';
            });
        }, 180);
    };

    // initial deck build
    buildDeck();

    // Reshuffle button: rebuild deck without page reload
    const reshuffleBtn = document.getElementById('reshuffle-btn');
    if (reshuffleBtn) {
        reshuffleBtn.addEventListener('click', () => {
            // if mid-transition disable clicks briefly
            try { container.style.pointerEvents = 'none'; } catch (e) {}
            buildDeck();
        });
    }
});