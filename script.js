// قائمة الحروف بأشكالها (أولية، وسطية، آخرية، منفصلة) مع نطق واضح وبطيء
const lettersList = [
  { char: "أَ", speech: "أَ" }, { char: "أُ", speech: "أُ" }, { char: "إِ", speech: "إِ" },
  { char: "بَـ", speech: "بَ أول الكلمة" }, { char: "ـبَـ", speech: "بَ وسط الكلمة" }, { char: "ـبْ", speech: "ب ساكنة" },
  { char: "تَـ", speech: "تَ أول الكلمة" }, { char: "ـتَـ", speech: "تَ وسط الكلمة" }, { char: "ـتْ", speech: "ت ساكنة" },
  { char: "ثَـ", speech: "ثَ أول الكلمة" }, { char: "ـثَـ", speech: "ثَ وسط الكلمة" }, { char: "ـثْ", speech: "ث ساكنة" },
  { char: "جَـ", speech: "جَ أول الكلمة" }, { char: "ـجَـ", speech: "جَ وسط الكلمة" }, { char: "ـجْ", speech: "ج ساكنة" },
  { char: "حَـ", speech: "حَ أول الكلمة" }, { char: "ـحَـ", speech: "حَ وسط الكلمة" }, { char: "ـحْ", speech: "ح ساكنة" },
  { char: "خَـ", speech: "خَ أول الكلمة" }, { char: "ـخَـ", speech: "خَ وسط الكلمة" }, { char: "ـخْ", speech: "خ ساكنة" },
  { char: "سَـ", speech: "سَ أول الكلمة" }, { char: "ـسَـ", speech: "سَ وسط الكلمة" }, { char: "ـسْ", speech: "س ساكنة" },
  { char: "شَـ", speech: "شَ أول الكلمة" }, { char: "ـشَـ", speech: "شَ وسط الكلمة" }, { char: "ـشْ", speech: "ش ساكنة" },
  { char: "فَـ", speech: "فَ أول الكلمة" }, { char: "ـفَـ", speech: "فَ وسط الكلمة" }, { char: "ـفْ", speech: "ف ساكنة" },
  { char: "قَـ", speech: "قَ أول الكلمة" }, { char: "ـقَـ", speech: "قَ وسط الكلمة" }, { char: "ـقْ", speech: "ق ساكنة" },
  { char: "كَـ", speech: "كَ أول الكلمة" }, { char: "ـكَـ", speech: "كَ وسط الكلمة" }, { char: "ـكْ", speech: "ك ساكنة" },
  { char: "لَـ", speech: "لَ أول الكلمة" }, { char: "ـلَـ", speech: "لَ وسط الكلمة" }, { char: "ـلْ", speech: "ل ساكنة" },
  { char: "مَـ", speech: "مَ أول الكلمة" }, { char: "ـمَـ", speech: "مَ وسط الكلمة" }, { char: "ـمْ", speech: "م ساكنة" },
  { char: "نَـ", speech: "نَ أول الكلمة" }, { char: "ـنَـ", speech: "نَ وسط الكلمة" }, { char: "ـنْ", speech: "ن ساكنة" }
];

const praisePhrases = ["أحسنتِ يا بطلة! 🌟", "إجابة رائعة! 🎉", "ممتازة جداً! 👏", "ذكية جداً! 🎈"];

let targetItem = null;
let score = 0;
let canSelect = true;

const targetCharEl = document.getElementById('targetChar');
const optionsGridEl = document.getElementById('optionsGrid');
const targetCardEl = document.getElementById('targetCard');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('nextBtn');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');

// دالة نطق واضحة جداً عبر متصفح الويب
function speak(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.75; // سرعة بطيئة ومفهومة للأطفال
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
}

// زر بدء اللعبة لتفعيل الصوت في المتصفح
startBtn.addEventListener('click', () => {
  startScreen.style.display = 'none';
  startNewRound();
});

function startNewRound() {
  canSelect = true;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';

  const randomIndex = Math.floor(Math.random() * lettersList.length);
  targetItem = lettersList[randomIndex];
  
  targetCharEl.textContent = '؟';

  let wrongItems = lettersList.filter(item => item.char !== targetItem.char);
  wrongItems = wrongItems.sort(() => 0.5 - Math.random()).slice(0, 3);

  const options = [targetItem, ...wrongItems].sort(() => 0.5 - Math.random());

  optionsGridEl.innerHTML = '';
  options.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = item.char;
    btn.addEventListener('click', () => handleOptionClick(btn, item));
    optionsGridEl.appendChild(btn);
  });

  speak(targetItem.speech);
}

function handleOptionClick(selectedBtn, selectedItem) {
  if (!canSelect) return;

  if (selectedItem.char === targetItem.char) {
    canSelect = false;
    selectedBtn.classList.add('correct');
    targetCharEl.textContent = targetItem.char;

    score += 10;
    scoreEl.textContent = score;

    const praise = praisePhrases[Math.floor(Math.random() * praisePhrases.length)];
    feedbackEl.textContent = praise;
    feedbackEl.className = 'feedback correct-text';

    speak(targetItem.speech + '. ' + praise);

    if (typeof confetti === 'function') {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    }

    setTimeout(() => { startNewRound(); }, 2500);

  } else {
    selectedBtn.classList.add('wrong');
    feedbackEl.textContent = "حاولي مرة أخرى! ❌";
    feedbackEl.className = 'feedback wrong-text';
    speak("حاولي مرة أخرى");

    setTimeout(() => {
      selectedBtn.classList.remove('wrong');
    }, 800);
  }
}

targetCardEl.addEventListener('click', () => {
  if (targetItem) {
    speak(targetItem.speech);
  }
});

nextBtn.addEventListener('click', startNewRound);