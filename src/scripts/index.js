import "../styles/style.css"
import "../scripts/components/Footer";

const comments = [
    {
        name: "Zee JKT 48",
        profilePic: "assets/img/profil-1.jpg",
        comment: "This is a great website!"
    },
    {
        name: "Unkown",
        profilePic: "assets/img/profil-1.jpg",
        comment: "I found this website very useful."
    },
    {
        name: "Bapakmu",
        profilePic: "assets/img/profil-1.jpg",
        comment: "Amazing experience, highly recommend!"
    }
];

let currentIndex = 0;

function displayComment(index) {
    const commentContainer = document.getElementById('comment-container');
    const comment = comments[index];

    commentContainer.innerHTML = `
        <img src="${comment.profilePic}" alt="${comment.name}">
        <h3>${comment.name}</h3>
        <p>"${comment.comment}"</p>
    `;
}

document.getElementById('next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % comments.length;
    displayComment(currentIndex);
});

document.getElementById('prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + comments.length) % comments.length;
    displayComment(currentIndex);
});

// Display the first comment initially
displayComment(currentIndex);


