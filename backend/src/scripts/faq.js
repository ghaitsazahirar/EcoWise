document.addEventListener('DOMContentLoaded', async () => {
    const faqContainer = document.getElementById('faq-container');
    console.log('DOM fully loaded and parsed');

    try {
        const response = await fetch('http://localhost:3000/faq'); // Sesuaikan dengan host dan port server Hapi
        console.log('Fetching FAQs...');
        const faqs = await response.json();
        console.log('Received FAQs:', faqs); // Menampilkan data yang diterima ke console

        faqs.forEach(faq => {
            const questionContainer = document.createElement('div');
            questionContainer.classList.add('question-container');

            const questionList = document.createElement('div');
            questionList.classList.add('question-list');

            const questionTitleContainer = document.createElement('div');
            questionTitleContainer.classList.add('question-title-container');

            const questionTitle = document.createElement('h2');
            questionTitle.classList.add('question-title');
            questionTitle.textContent = faq.question;

            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-angle-down');

            const questionAnswer = document.createElement('p');
            questionAnswer.classList.add('question-answer');
            questionAnswer.textContent = faq.answer;

            questionTitleContainer.appendChild(questionTitle);
            questionTitleContainer.appendChild(icon);
            questionList.appendChild(questionTitleContainer);
            questionList.appendChild(questionAnswer);
            questionContainer.appendChild(questionList);
            faqContainer.appendChild(questionContainer);
        });

    } catch (error) {
        console.error('Error fetching FAQ:', error);
    }
});
