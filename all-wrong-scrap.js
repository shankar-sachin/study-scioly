(() => {
  const wrongQuestions = [];

  document.querySelectorAll('.panel.panel-default').forEach(panel => {
    const heading = panel.querySelector('.panel-heading');
    const body = panel.querySelector('.panel-body');
    if (!heading || !body) return;

    // Check for wrong OR partial credit indicators
    const hasWrong = body.querySelector('.glyphicon-remove.text-danger');
    const hasPartial = body.querySelector('.glyphicon-adjust.text-success');
    if (!hasWrong && !hasPartial) return;

    const status = hasPartial ? 'partial' : 'incorrect';

    // Get question number and points
    const questionMeta = heading.querySelector('b');
    const questionMetaText = questionMeta ? questionMeta.innerText.trim() : '';

    // Get question text
    const headingClone = heading.cloneNode(true);
    const boldEl = headingClone.querySelector('b');
    if (boldEl) boldEl.closest('div')?.remove();
    const questionText = headingClone.innerText.trim();

    // Get your answer (free response)
    const yourAnswerEl = [...body.querySelectorAll('div')]
      .find(d => d.innerHTML.includes('<b>Your Answer: </b>'));
    let yourAnswer = '';
    if (yourAnswerEl) {
      const clone = yourAnswerEl.cloneNode(true);
      clone.querySelector('b')?.remove();
      yourAnswer = clone.innerText.trim();
    }

    // Override with MC radio selection if present
    const selectedRadio = body.querySelector('input[type="radio"]:checked');
    if (selectedRadio) {
      const wrapper = selectedRadio.closest('div');
      const sibling = wrapper?.nextElementSibling;
      yourAnswer = 'Selected: ' + (sibling?.innerText?.trim() || 'unknown');
    }

    // Override with MC checkbox selections if present
    const checkedBoxes = body.querySelectorAll('input[type="checkbox"]:checked');
    if (checkedBoxes.length > 0) {
      const labels = [...checkedBoxes].map(cb => {
        const wrapper = cb.closest('div');
        const sibling = wrapper?.nextElementSibling;
        return sibling?.innerText?.trim() || '?';
      });
      yourAnswer = 'Selected: ' + labels.join(', ');
    }

    // Get expected answer (free response)
    const expectedEl = [...body.querySelectorAll('div')]
      .find(d => d.innerHTML.includes('<b>Expected Answer: </b>'));
    let expectedAnswer = '';
    if (expectedEl) {
      const clone = expectedEl.cloneNode(true);
      clone.querySelector('b')?.remove();
      expectedAnswer = clone.innerText.trim();
    }

    // Override with MC "Correct answer: X" format
    const awardedSpan = body.querySelector('.text-warning');
    if (awardedSpan) {
      const match = awardedSpan.innerText.match(/Correct answer:\s*(.+?)\s+Awarded/);
      if (match) expectedAnswer = 'Correct: ' + match[1].trim();
    }

    // Get points awarded vs total
    let awardedPoints = null;
    let totalPoints = null;
    if (awardedSpan) {
      const awardedMatch = awardedSpan.innerText.match(/Awarded points:\s*([\d.]+)/);
      if (awardedMatch) awardedPoints = parseFloat(awardedMatch[1]);
    }
    const totalMatch = questionMetaText.match(/\(([\d.]+)\s*pts/);
    if (totalMatch) totalPoints = parseFloat(totalMatch[1]);

    // Get image URLs if any
    const images = [...heading.querySelectorAll('img')].map(img => img.src);

    wrongQuestions.push({
      meta: questionMetaText,
      status,
      pointsAwarded: awardedPoints,
      pointsTotal: totalPoints,
      question: questionText,
      yourAnswer: yourAnswer || '(blank)',
      correctAnswer: expectedAnswer || '(not shown)',
      ...(images.length > 0 && { imageUrls: images }),
    });
  });

  // Sort: incorrect first, then partial
  wrongQuestions.sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === 'incorrect' ? -1 : 1;
  });

  const incorrect = wrongQuestions.filter(q => q.status === 'incorrect').length;
  const partial = wrongQuestions.filter(q => q.status === 'partial').length;
  const totalLost = wrongQuestions.reduce((sum, q) => sum + (q.pointsTotal - q.pointsAwarded), 0);

  const output = {
    summary: {
      totalFlagged: wrongQuestions.length,
      incorrect,
      partial,
      totalPointsLost: Math.round(totalLost * 100) / 100,
    },
    questions: wrongQuestions,
  };

  // Auto-download
  const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'flagged_questions.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log(`✅ ${wrongQuestions.length} questions flagged (${incorrect} incorrect, ${partial} partial) — ${totalLost} pts lost`);
  return output;
})();
