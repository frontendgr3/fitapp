const path = require('path');

module.exports = app => {
    app.get('/register', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'register/register-form.html'));
    });
}
