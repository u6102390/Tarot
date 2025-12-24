// trio.js — create three flip cards centered, back = image 5, front = random tarot image
document.addEventListener('DOMContentLoaded', () => {
    // trigger fade-in when the page loads (if body started with opacity 0)
    try {
        const b = document.body;
        requestAnimationFrame(() => { b.style.opacity = '1'; });
    } catch (err) {
        // ignore
    }
    // Make EXIT image (any color) navigate back to home
    const exitEl = document.querySelector('.contenedor-imagen');
    if (exitEl) {
        exitEl.setAttribute('role', 'button');
        exitEl.setAttribute('tabindex', '0');
        const goHome = () => { window.location.href = 'index.html'; };
        exitEl.addEventListener('click', goHome);
        exitEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goHome();
            }
        });
    }
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

    // if the user came from baralla.html and selected three cards, they'll be stored in sessionStorage
    let selectedThree = null;
    try {
        const raw = sessionStorage.getItem('selectedThree');
        selectedThree = raw ? JSON.parse(raw) : null;
    } catch (err) {
        console.warn('Could not read selectedThree from sessionStorage', err);
        selectedThree = null;
    }
    const container = document.querySelector('.card-fan .cards');
    if (!container) return;

    // Flip sound effect using asset img/carta.MP3, with safe fallback
    const getAudioCtx = () => {
        try {
            if (window.__flipAudioCtx) return window.__flipAudioCtx;
            const Ctx = window.AudioContext || window.webkitAudioContext;
            const ctx = new Ctx();
            window.__flipAudioCtx = ctx;
            return ctx;
        } catch { return null; }
    };
    const beepFallback = () => {
        const ctx = getAudioCtx();
        if (!ctx) return;
        try { ctx.resume && ctx.resume(); } catch {}
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        const t0 = ctx.currentTime;
        osc.frequency.setValueAtTime(700, t0);
        osc.frequency.exponentialRampToValueAtTime(1100, t0 + 0.08);
        gain.gain.setValueAtTime(0.06, t0);
        gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.12);
    };
    const playFlipSound = () => {
        try {
            const a = new Audio('audios/carta.mp4');
            a.volume = 1.0;
            a.play().catch((e) => {
                console.warn('Flip audio play failed, using beep fallback', e);
                beepFallback();
            });
        } catch (e) {
            console.warn('Flip audio init failed, using beep fallback', e);
            beepFallback();
        }
    };

    // the view-results button: start disabled and will be enabled once 3 cards are flipped
    const viewBtn = document.querySelector('.trio-btn');
    if (viewBtn) viewBtn.disabled = true;

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

        // pick a front image: prefer a selectedThree entry (when coming from baralla), otherwise pick random
        const fixPath = p => (typeof p === 'string' ? p.replace(/^images\//, 'img/') : p);
        let frontSrc = backCardImage;
        let frontAlt = 'card front';
        if (selectedThree && Array.isArray(selectedThree) && selectedThree[i]) {
            frontSrc = selectedThree[i].image || backCardImage;
            frontAlt = selectedThree[i].name || frontAlt;
        } else {
            const rand = tarotCards[Math.floor(Math.random() * tarotCards.length)];
            frontSrc = fixPath(rand.image) || backCardImage;
            frontAlt = rand.name || frontAlt;
        }

        const front = document.createElement('img');
        front.className = 'card-face front';
        front.src = fixPath(frontSrc);
        front.alt = frontAlt;

        inner.appendChild(back);
        inner.appendChild(front);
        card.appendChild(inner);

        const toggle = () => {
            card.classList.toggle('flipped');
            playFlipSound();

            // after toggling, check how many cards are flipped
            const flipped = Array.from(container.querySelectorAll('.card.flipped'));
            if (flipped.length === 3) {
                // disable further interaction with the fan
                try { container.style.pointerEvents = 'none'; } catch (e) {}

                // enable the "Veure resultats" button instead of auto-navigating
                if (viewBtn) {
                    viewBtn.disabled = false;
                    viewBtn.classList.add('ready');
                    try { viewBtn.focus(); } catch(e) {}
                }
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
    // move the trio cards down by 210px (previously 160px) — this lowers them 50px
    el.style.transform = `translate(-50%, calc(-60% + 230px)) rotate(${angle}deg) translateX(${offset}px)`;
        el.style.zIndex = `${100 - Math.abs(idx - centerIndex)}`;
    });

    // When the user clicks the view-results button, perform the wait+fade+navigate sequence.
    if (viewBtn) {
        viewBtn.addEventListener('click', () => {
            // guard: only allow if three cards are flipped
            const flipped = container.querySelectorAll('.card.flipped');
            if (!flipped || flipped.length < 3) return;

            // prevent double clicks and further interaction
            viewBtn.disabled = true;
            try { container.style.pointerEvents = 'none'; } catch (e) {}

            // Start fade immediately and navigate after the 1s fade (no extra waiting)
            try {
                const b = document.body;
                b.style.transition = 'opacity 1s ease';
                requestAnimationFrame(() => { b.style.opacity = '0'; });
            } catch (err) {
                console.warn('Fade-out failed, will navigate after delay', err);
            }
            setTimeout(() => { window.location.href = 'resultat.html'; }, 1000);
        });
    }
});
