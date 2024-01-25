const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Discord OAuth2 Configuration
const discordClientId = '1187564478565453926';
const discordClientSecret = 'l3RDqqfj6cU4SAaick6nOXwnJMNBJ01qT';
const discordRedirectUri = 'https://spookyland.ca/callback'; // Update accordingly

app.get('/', (req, res) => {
    // Check if the user is authenticated
    if (!req.session || !req.session.isAuthenticated) {
        return res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }

    // User is authenticated, serve the main page
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    // Redirect to Discord OAuth2 for authentication
    res.redirect(`https://discord.com/oauth2/authorize?client_id=${discordClientId}&redirect_uri=${encodeURIComponent(discordRedirectUri)}&response_type=code&scope=identify`);
});

app.get('/callback', async (req, res) => {
    try {
        // Exchange the authorization code for a token
        const { code } = req.query;
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', querystring.stringify({
            client_id: discordClientId,
            client_secret: discordClientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: discordRedirectUri,
            scope: 'identify',
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Set authentication session
        req.session = {
            isAuthenticated: true,
            discordToken: tokenResponse.data.access_token,
        };

        // Redirect to the main page
        res.redirect('/');
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
