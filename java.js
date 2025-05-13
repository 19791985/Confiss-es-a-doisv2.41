const questions = [
  {
    question: "O que mais valorizas num momento íntimo?",
    answers: [
      { text: "Conexão emocional", value: "emoção" },
      { text: "Exploração do corpo", value: "físico" }
    ]
  },
  {
    question: "Gostarias de experimentar algo novo com o teu parceiro?",
    answers: [
      { text: "Sim, com confiança", value: "abertura" },
      { text: "Prefiro manter o que já conhecemos", value: "segurança" }
    ]
  }
];

let currentQuestion = -1;   // começa em -1 para mostrar a introdução
let results = [];

const container = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const answersEl  = document.getElementById("answers");
const nextBtn    = document.getElementById("next-btn");
const resultEl   = document.getElementById("result");

// Mostra o ecrã atual (introdução, pergunta ou resultado)
function showScreen() {
  // Intro
  if (currentQuestion === -1) {
    questionEl.textContent = "Confissões a Dois";
    answersEl.innerHTML = "";
    nextBtn.textContent = "Começar";
    nextBtn.style.display = "inline-block";
    container.classList.remove("hidden");
    resultEl.classList.add("hidden");
    return;
  }

  // Perguntas
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";
    nextBtn.style.display = "none";  // esconde o botão
    q.answers.forEach(ans => {
      const btn = document.createElement("button");
      btn.textContent = ans.text;
      btn.onclick = () => {
        results.push(ans.value);
        currentQuestion++;
        showScreen();
      };
      answersEl.appendChild(btn);
    });
    return;
  }

  // Resultado
  const emotion  = results.filter(r => r === "emoção").length;
  const fisico   = results.filter(r => r === "físico").length;
  const abertura = results.filter(r => r === "abertura").length;
  const seguranca= results.filter(r => r === "segurança").length;

  let resumo = "Resumo psicológico:\n";
  resumo += emotion > fisico   ? "- Valoriza ligação emocional.\n" : "- Dá importância à dimensão física.\n";
  resumo += abertura > seguranca ? "- Está aberta a novas experiências." : "- Prefere segurança e familiaridade.";

  questionEl.textContent = "";
  answersEl.innerHTML = "";
  resultEl.textContent = resumo;
  resultEl.classList.remove("hidden");
  nextBtn.style.display = "none";
}

// Avança do intro para a primeira pergunta
nextBtn.addEventListener("click", () => {
  currentQuestion = 0;
  showScreen();
});

// Inicia tudo
showScreen();
