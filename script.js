// DOM Elements
const myBtn = document.getElementById('myBtn');
const output = document.getElementById('output');

// Event Listeners
myBtn.addEventListener('click', handleButtonClick);

// Functions
function handleButtonClick() {
    const clickCount = parseInt(localStorage.getItem('clickCount')) || 0;
    const newCount = clickCount + 1;
    localStorage.setItem('clickCount', newCount);
    
    output.textContent = `Button clicked ${newCount} time(s)!`;
    console.log('Button was clicked');
}

// Initialize on page load
window.addEventListener('load', function() {
    const savedCount = localStorage.getItem('clickCount');
    if (savedCount) {
        output.textContent = `Button clicked ${savedCount} time(s) (from previous session)`;
    }
});

// Optional: Fetch API example
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Optional: Make API calls
// const data = fetchData('https://api.example.com/data');
// data.then(result => console.log(result));