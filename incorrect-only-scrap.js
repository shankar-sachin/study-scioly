(() => {
  const wrongQuestions = [];

  document.querySelectorAll('.panel.panel-default').forEach(panel => {
    const heading = panel.querySelector('.panel-heading');
    const body = panel.querySelector('.panel-body');
    if (!heading || !body) return;

    // Check if this question has a wrong answer indicator
    const hasWrong = body.querySelector('.glyphicon-remove.text-danger');
    if (!hasWrong) return;

    // Get question number and points
    const questionMeta = heading.querySelector('b');
    const questionMetaText = questionMeta ? questionMeta.innerText.trim() : '';

    // Get question text (exclude the bold meta part)
    const headingClone = heading.cloneNode(true);
    const boldEl = headingClone.querySelector('b');
    if (boldEl) boldEl.closest('div')?.remove();
    const questionText = headingClone.innerText.trim();

    // Get your answer
    const yourAnswerEl = [...body.querySelectorAll('div')]
      .find(d => d.innerHTML.includes('<b>Your Answer: </b>'));
    let yourAnswer = '';
    if (yourAnswerEl) {
      const clone = yourAnswerEl.cloneNode(true);
      clone.querySelector('b')?.remove();
      yourAnswer = clone.innerText.trim();
    }

    // For MC questions, find selected radio/checkbox labels
    const selectedRadio = body.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      const wrapper = selectedRadio.closest('div');
      const sibling = wrapper?.nextElementSibling;
      yourAnswer = 'Selected: ' + (sibling?.innerText?.trim() || 'unknown');
    }

    const checkedBoxes = body.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length > 0) {
      const labels = [...checkedBoxes].map(cb => {
        const wrapper = cb.closest('div');
        const sibling = wrapper?.nextElementSibling;
        return sibling?.innerText?.trim() || '?';
      });
      yourAnswer = 'Selected: ' + labels.join(', ');
    }

    // Get correct answer
    const expectedEl = [...body.querySelectorAll('div')]
      .find(d => d.innerHTML.includes('<b>Expected Answer: </b>'));
    let expectedAnswer = '';
    if (expectedEl) {
      const clone = expectedEl.cloneNode(true);
      clone.querySelector('b')?.remove();
      expectedAnswer = clone.innerText.trim();
    }

    // For MC with "Correct answer: X" format
    const awardedSpan = body.querySelector('.text-warning');
    if (awardedSpan) {
      const match = awardedSpan.innerText.match(/Correct answer:\s*(.+?)\s+Awarded/);
      if (match) expectedAnswer = 'Correct: ' + match[1].trim();
    }

    wrongQuestions.push({
      meta: questionMetaText,
      question: questionText,
      yourAnswer: yourAnswer || '(blank)',
      correctAnswer: expectedAnswer || '(not shown)',
    });
  });

  // Auto-download as JSON
  const blob = new Blob([JSON.stringify(wrongQuestions, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wrong_questions.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`✅ Downloaded ${wrongQuestions.length} wrong questions.`);
  return wrongQuestions;
})();
