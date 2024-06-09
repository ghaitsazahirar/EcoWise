// challengeUtils.js

export async function fetchChallengeData() {
    try {
        const response = await fetch('/data/challenges.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching challenge data:', error);
        return null;
    }
}

export function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
