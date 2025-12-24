// Canonical tarotCards array (same source used when generating the deck).
// We include it here so the results page can look up the canonical name
// for each selected card (match by image path). Paths in the source use
// `images/` while assets live in `img/`, so we normalize paths when matching.
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

// Descripcions proporcionades per a cada arcà major (paràgraf complet)
const descriptions = {
	"The Fool": "És la carta del *tarot que representa el desig d'aventura, una energia que ja no pot ser continguda. Lliure i independent, el Boig és un pioner que aspira a descobrir el seu veritable ser, gaudint cada pas d'aquesta exploració plena d'alegria.",
	"The Magician": "El Mag és una carta que simbolitza el poder, la creativitat, l'habilitat i la manifestació. Representa a una persona que té el domini de les seves habilitats i recursos per a materialitzar els seus desitjos i objectius.",
	"The High Priestess": "La Sacerdotessa Major simbolitza la intuïció, el misteri i la saviesa interior. Invita a escoltar la veu interna, observar en silenci i confiar en allò que encara no es mostra del tot.",
	"The Empress": "Simbolitza la fertilitat, la creativitat, la maternitat, l'abundància natural, intel·ligència emocional i saviesa. Representa la força interior, l'energia femenina, l'amor i la compassió. En el seu aspecte més físic és la coqueteria, la sensualitat i el gaudi de la vida.",
	"The Emperor": "L'Emperador simbolitza autoritat, control i estructura. Representa la capacitat de prendre decisions fermes, establir límits clars i crear estabilitat. És la carta del lideratge responsable, de construir bases sòlides i actuar amb lògica i maduresa.",
	"The Hierophant": "Representa a una persona compromesa amb el que vol, que sap mantenir la seva integritat malgrat la crítica, capaç d'il·luminar a uns altres amb el seu exemple i ensenyaments. Les columnes de la carta representen les polaritats. Els dos personatges que estan en el pla inferior de la carta representen el desig i la raó.",
	"The Lovers": "L'Enamorat generalment representa l'elecció d'un camí en lloc d'un altre, la cruïlla que requereix una decisió radical ja que qualsevol rumb pres implicarà deixar una altra oportunitat enrere, com seria triar a una parella sobre una altra, o al matrimoni sobre la solteria, etc.",
	"The Chariot": "El Carro és la setena carta en dels Arcans Majors i està associada al número 7. Aquesta carta és un símbol de moviment, determinació i victòria sobre els obstacles, la qual cosa suggereix que qui rep aquesta carta en una lectura està en un camí de triomf que requereix control, enfocament i voluntat.",
	"The Strength": "Aquesta carta envia un missatge de coratge, fortalesa i control, encara que també de compassió i paciència. Sens dubte, quan apareix en les teves tirades et recorda que has de centrar-te en el que vols, transitant amb determinació el camí que et porti a aconseguir-lo.",
	"The Hermit": "Representa la introspecció, la meditació i la necessitat d'autoconeixement. No sols convida a la reflexió i a l'aïllament per a trobar respostes a preguntes profundes, sinó també simbolitza l'allunyament dels judicis dels altres i l'acceptació de les pròpies experiències.",
	"Wheel of Fortune": "Es refereix a canvis en aquesta, ja sigui un rejoveniment, una crisi favorable i decisiva d'una malaltia que semblava estancada, un nou diagnòstic i tractament que ara es revelarà eficaç, etc. Carta invertida, el canvi significa caiguda del ritme vital, però mai de caràcter greu.",
	"Justice": "És el sentit pràctic, el saber resoldre, el donar-se el que un necessita, l'aplicació de la raó, l'organització i la coordinació, l'ordre en la consecució dels objectius, la llei de causa i efecte. És també l'autoanàlisi, l'habilitat d'analitzar les situacions de manera pragmàtica i magnànima.",
	"The Hanged Man": "El arcano del Colgado nos invita a soltar el control y aceptar los cambios desde una perspectiva más elevada. No es renuncia ni derrota, sino un ejercicio de fortaleza interior que nos prepara para los giros de la vida. Estamos ante una carta que nos habla específicamente del sacrificio por un bien aún invisible.",
	"Death": "La carta de la Mort indica que una etapa important de la teva vida està arribant a la seva fi i que una nova està a punt de començar . Un altre significat és que experimentaràs un canvi, una transició o una transformació important. La teva antiga versió necessita morir per a permetre la creació d'una nova.",
	"Temperance": "És la carta del tarot que simbolitza l'equilibri, la moderació, l'harmonia i la paciència. Representa la capacitat d'integrar oposats (com el conscient i inconscient, o l'esperit i el cos) per a avançar amb serenitat i flexibilitat en la vida.",
	"The Devil": "L'única cosa dolenta que porta la carta del diable en el *Tarot és que representa el negatiu en les nostres vides, és a dir, totes aquelles situacions, persones o condicions que ens estan estancant i impedint sanar i seguir endavant en el camí de les nostres vides.",
	"The Tower": "Hem d'entendre que, darrere de tota destrucció, hi ha un camí de renovació, de regeneració, que pot ser molt positiva. Aquesta carta t'indica que alguna cosa en la teva vida s'enfonsarà. Representa les forces divines impulsant a la persona, traient-la de la seva comoditat a la Torre d'Ivori perquè pugui enfrontar-se al món, créixer i evolucionar. La Torre, en una certa forma, representa l'arrogància que és castigada.",
	"The Star": "L'Estrella en el tarot significa optimisme i fe quan apareix al dret. Si surt en aquesta posició en una de les teves tirades, pots estar contenta, perquè és una carta molt auspiciosa. Indica que tot en la teva vida (treball, amor, família) està en equilibri i harmonia.",
	"The Moon": "Representa les nostres fantasies, les projeccions, la intuïció i la inspiració, la sensibilitat, la poesia, la receptivitat, la relació amb tot l'emocional. És així mateix el regne dels somnis, la imaginació, la idealització, els ancestres, les vides passades, la receptivitat.",
	"The Sun": "Es diu que reflecteix felicitat, satisfacció, vitalitat, confiança en un mateix i èxit. A vegades és coneguda com la millor carta del tarot, perquè representa coses bones i resultats positius per a les lluites actuals. Ens parla d'èxit, confiança, expansió i una connexió pura amb la felicitat autèntica.",
	"Judgement": "El Judici és un dels arcans associats a la transformació i a la presa de decisions importants. Amb ell, reflexionem sobre el passat per a donar pas a nous començaments o reconciliacions. El Judici és la carta de la resurrecció i de les notícies arribades «del cel» en el moment precís.",
	"The World": "És la carta número 21 dels Arcans Majors del tarot. La carta del tarot El Món representa el final d'un cicle de vida, l'èxit, la pau i l'equilibri. És un arcà major que simbolitza la culminació d'objectius i la integració de la personalitat. Èxit assegurat, recompensa, viatge, ruta, emigració, fugida, canvi de lloc"
};

document.addEventListener('DOMContentLoaded', () => {
	try {
		const b = document.body;
		requestAnimationFrame(() => { b.style.opacity = '1'; });
	} catch (err) {
		// ignore
	}

	// Load any selected cards if needed
	let selectedThree = null;
	try {
		const raw = sessionStorage.getItem('selectedThree');
		selectedThree = raw ? JSON.parse(raw) : null;
	} catch (e) {
		selectedThree = null;
	}

	// Render a framed block showing the first selected card (if present)
	console.log('resultat loaded, selectedThree =', selectedThree);
	const titleEl = document.getElementById('result-title');
	const line1El = document.getElementById('result-line1');
	const line2El = document.getElementById('result-line2');
	const imgEl = document.querySelector('.result-card-img');

	// Show original card names (use the name provided in the selectedThree entries)

	const fullDescription = (desc, name) => {
		if (desc && typeof desc === 'string' && desc.trim()) return desc.trim();
		return `Interpretació de ${name}.`;
	};

	const fixPath = p => (typeof p === 'string' ? p.replace(/^images\//, 'img/') : p);

	// Find canonical tarotCards entry by matching image (normalized), fallback to name
	const findCanonicalName = (imgSrc, fallback) => {
		if (!imgSrc) return fallback || '';
		const norm = fixPath(imgSrc).replace(/^\.\//, '');
		for (let i = 0; i < tarotCards.length; i++) {
			const entry = tarotCards[i];
			if (!entry || !entry.image) continue;
			const eNorm = fixPath(entry.image).replace(/^\.\//, '');
			// Compare basename or full path (both normalized to img/)
			if (eNorm === norm) return entry.name;
			// also compare basenames as a looser match
			const eBase = eNorm.split('/').pop();
			const nBase = norm.split('/').pop();
			if (eBase === nBase) return entry.name;
		}
		return fallback || '';
	};

	if (selectedThree && Array.isArray(selectedThree) && selectedThree.length > 0) {
		const first = selectedThree[0];
	const origName = findCanonicalName(first.image, first.name || 'Carta 1');
	if (titleEl) titleEl.textContent = origName;
		const desc = descriptions[origName] || descriptions[first.name] || first.description;
		if (line1El) line1El.textContent = fullDescription(desc, origName);
		if (line2El) line2El.textContent = '';
		if (imgEl) {
			imgEl.src = fixPath(first.image || 'img/image 5.png');
			imgEl.alt = origName;
		}
	} else {
		// fallback content when there's no stored selection
		if (titleEl) titleEl.textContent = 'Cap carta seleccionada';
		if (line1El) line1El.textContent = 'No s\'ha trobat cap selecció prèvia.';
		if (line2El) line2El.textContent = '';
		if (imgEl) imgEl.src = 'img/image 5.png';
	}

	// Make the frame accessible: focus the title
	try { if (titleEl) titleEl.setAttribute('tabindex','-1'); titleEl && titleEl.focus(); } catch(e) {}

	// Populate second frame (second selected card) if present
	const title2El = document.getElementById('result2-title');
	const line21El = document.getElementById('result2-line1');
	const line22El = document.getElementById('result2-line2');
	const img2El = document.querySelector('.result-card2-img');
	if (selectedThree && Array.isArray(selectedThree) && selectedThree.length > 1) {
		const second = selectedThree[1];
	const origName2 = findCanonicalName(second.image, second.name || 'Carta 2');
	if (title2El) title2El.textContent = origName2;
		const desc2 = descriptions[origName2] || descriptions[second.name] || second.description;
		if (line21El) line21El.textContent = fullDescription(desc2, origName2);
		if (line22El) line22El.textContent = '';
		if (img2El) {
			img2El.src = fixPath(second.image || 'img/image 5.png');
			img2El.alt = origName2;
		}
	} else {
		if (title2El) title2El.textContent = 'Cap segona carta';
		if (line21El) line21El.textContent = 'No s\'ha trobat una segona selecció prèvia.';
		if (line22El) line22El.textContent = '';
		if (img2El) img2El.src = 'img/image 5.png';
	}

	// Populate third frame (third selected card) if present
	const title3El = document.getElementById('result3-title');
	const line31El = document.getElementById('result3-line1');
	const line32El = document.getElementById('result3-line2');
	const img3El = document.querySelector('.result-card3-img');
	if (selectedThree && Array.isArray(selectedThree) && selectedThree.length > 2) {
		const third = selectedThree[2];
	const origName3 = findCanonicalName(third.image, third.name || 'Carta 3');
	if (title3El) title3El.textContent = origName3;
		const desc3 = descriptions[origName3] || descriptions[third.name] || third.description;
		if (line31El) line31El.textContent = fullDescription(desc3, origName3);
		if (line32El) line32El.textContent = '';
		if (img3El) {
			img3El.src = fixPath(third.image || 'img/image 5.png');
			img3El.alt = origName3;
		}
	} else {
		if (title3El) title3El.textContent = 'Cap tercera carta';
		if (line31El) line31El.textContent = 'No s\'ha trobat una tercera selecció prèvia.';
		if (line32El) line32El.textContent = '';
		if (img3El) img3El.src = 'img/image 5.png';
	}
}); 
// --- IGNORE ---

