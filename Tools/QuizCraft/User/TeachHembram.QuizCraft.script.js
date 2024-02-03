const options = document.querySelectorAll('.option');
    const progressBar = document.getElementById('progressBar');
    const percentage = document.querySelector('.percentage');
    const attemptedCount = document.getElementById('attemptedCount');
    const correctCount = document.getElementById('correctCount');
    const wrongCount = document.getElementById('wrongCount');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton'); // Add this line to select the reset button

    let totalQuestions = 0;
    let correctAnswers = 0;

    options.forEach(option => {
        option.addEventListener('click', () => {
            const questionId = option.getAttribute('data-question');
            const isCorrect = option.getAttribute('data-correct') === 'true';

            const previouslySelected = document.querySelector(`.option.selected[data-question="${questionId}"]`);

            if (!previouslySelected) {
                // Only update counts if the same question hasn't been attempted before
                totalQuestions++;
                if (isCorrect) {
                    correctAnswers++;
                }
            }

            options.forEach(o => {
                if (o.getAttribute('data-question') === questionId) {
                    o.classList.remove('selected', 'correct', 'wrong');
                    if (o === option) {
                        o.classList.add('selected');
                        if (isCorrect) {
                            o.classList.add('correct');
                        } else {
                            o.classList.add('wrong');
                            // Highlight the correct answer
                            options.forEach(correctOption => {
                                if (
                                    correctOption.getAttribute('data-question') === questionId &&
                                    correctOption.getAttribute('data-correct') === 'true'
                                ) {
                                    correctOption.classList.add('correct');
                                }
                            });
                        }
                    }
                }
            });

            // Show explanation
            const explanation = document.querySelector(`.explanation[data-question="${questionId}"]`);
            if (explanation) {
                explanation.style.display = 'block';
            }

            // Update report card
            attemptedCount.textContent = totalQuestions;
            correctCount.textContent = correctAnswers;
            wrongCount.textContent = totalQuestions - correctAnswers;

            // Update progress bar and percentage
            const progress = (totalQuestions / 6) * 100; // Assuming there are 5 questions
            progressBar.style.width = progress + '%';
            percentage.textContent = progress.toFixed(2) + '%';

            // Update the message
            if (totalQuestions === 6) {
                if (correctAnswers === 6) {
                    message.textContent = "Congratulations! You got all the answers correct!";
                } else if (correctAnswers >= 3) {
                    message.textContent = "Great job! You're doing well!";
                } else {
                    message.textContent = "Keep practicing. You can improve!";
                }
            }
        });
    });

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong');
        });
        const explanations = document.querySelectorAll('.explanation');
        explanations.forEach(explanation => {
            explanation.style.display = 'none';
        });
        totalQuestions = 0;
        correctAnswers = 0;
        attemptedCount.textContent = 0;
        correctCount.textContent = 0;
        wrongCount.textContent = 0;
        progressBar.style.width = '0%';
        percentage.textContent = '0%';
        message.textContent = '--';
    });