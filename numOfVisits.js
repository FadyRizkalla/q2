const cookieParser = require('cookie-parser');

const express = require('express');

const app = express();
const port = 3000;

// Use cookie-parser middleware
app.use(cookieParser());

// Function to format date and time
function formatDateTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    });
}

// Route to handle visits
app.get('/', (req, res) => {
    let visits = parseInt(req.cookies.visits) || 0;
    let lastVisit = req.cookies.lastVisit || 'Never';

    visits += 1;

    // Set the cookies for visits and last visit time
    res.cookie('visits', visits, { maxAge: 900000, httpOnly: true });
    res.cookie('lastVisit', formatDateTime(), { maxAge: 900000, httpOnly: true });

    // Respond based on the visit count
    if (visits === 1) {
        res.send(`Welcome to my webpage! It is your first time that you are here.`);
    } else {
        res.send(`Hello, this is the ${visits} time that you are visiting my webpage.<br>
                  Last visit: ${lastVisit}`);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
