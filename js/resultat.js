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

// Breu interpretació (2 frases) per cada arcà major
const interpretations = {
	"The Fool": "Noves oportunitats i inici valent. Confia en el camí i aprèn en ruta.",
	"The Magician": "Acció i manifestació amb els recursos que tens. Focalitza l'energia i comunica clar.",
	"The High Priestess": "Intuïció, misteri i saviesa interior. Escolta el silenci i observa els senyals.",
	"The Empress": "Fertilitat, creativitat i cura. Nodreix projectes i relacions amb paciència.",
	"The Emperor": "Estructura, autoritat i ordre. Decideix amb fermesa i responsabilitat.",
	"The Hierophant": "Tradició i aprendre d'un guia. Segueix valors compartits i ritus útils.",
	"The Lovers": "Eleccions amb cor i ment. L'harmonia neix de l'honestedat i el compromís.",
	"The Chariot": "Voluntat i avanç controlat. Disciplina per superar obstacles i guanyar.",
	"The Strength": "Coratge suau i domini de l'instint. La bondat ferma transforma el repte.",
	"The Hermit": "Recés i recerca interior. La llum ve de la reflexió i la prudència.",
	"Wheel of Fortune": "Canvi de cicle i girs sobtats. Adapta't i confia en el flux.",
	"Justice": "Equilibri, causa i efecte. Tria amb equitat i assumeix els resultats.",
	"The Hanged Man": "Pausa i nova perspectiva. Rendeix-te al procés per desbloquejar.",
	"Death": "Tancament i renaixement. Deixa anar l'antic per fer lloc al nou.",
	"Temperance": "Mesura, integració i paciència. Barreja oposats per trobar harmonia.",
	"The Devil": "Vincles, temptacions i dependències. Reconeix el lligam i allibera't amb consciència.",
	"The Tower": "Sacsejada que derrueix estructures. Allibera el que ja no és sòlid i reconstrueix.",
	"The Star": "Esperança, guia i sanació. Cuida't amb fe tranquil·la i inspira els altres.",
	"The Moon": "Emocions, il·lusions i subconscient. Avança amb intuïció i comprova els fets.",
	"The Sun": "Claredat, èxit i alegria. Gaudeix i comparteix la llum amb confiança.",
	"Judgement": "Crida a renéixer i revisar. Perdona't, integra l'aprés i decideix.",
	"The World": "Tancament satisfactori i completitud. Celebra el cicle i prepara el següent pas."
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

	// Helper: produce two short lines from a description or sensible defaults
	function getTwoLines(desc, name) {
		if (desc && typeof desc === 'string') {
			// split into sentences by .!? and trim
			const parts = desc.split(/(?<=[.?!])\s+/).map(s => s.trim()).filter(Boolean);
			if (parts.length >= 2) return [parts[0].replace(/[.?!]*$/, ''), parts[1].replace(/[.?!]*$/, '')];
			if (parts.length === 1) {
				const first = parts[0].replace(/[.?!]*$/, '');
				return [first, 'Aspectes addicionals o consell pràctic.'];
			}
		}
		// default lines (use the original card name in the message)
		return [`Interpretació breu de ${name}.`, 'Aspectes addicionals o consell pràctic.'];
	}

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
		const desc = interpretations[origName] || interpretations[first.name] || first.description;
		const [l1, l2] = getTwoLines(desc, origName);
		if (line1El) line1El.textContent = l1;
		if (line2El) line2El.textContent = l2;
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
		const desc2 = interpretations[origName2] || interpretations[second.name] || second.description;
		const [s1, s2] = getTwoLines(desc2, origName2);
		if (line21El) line21El.textContent = s1;
		if (line22El) line22El.textContent = s2;
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
		const desc3 = interpretations[origName3] || interpretations[third.name] || third.description;
		const [t1, t2] = getTwoLines(desc3, origName3);
		if (line31El) line31El.textContent = t1;
		if (line32El) line32El.textContent = t2;
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

