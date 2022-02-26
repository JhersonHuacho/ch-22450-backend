const login = (req, res) => {
    console.log("getLogin", __dirname);
    res.render('login', {
        layout: 'index'
    })
}

module.exports = {
    login
}