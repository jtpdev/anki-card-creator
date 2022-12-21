import wr from './wr/index.js';
import routes from './routes/index.js';

const multipleSearch = async (words, from, to) => {
    return Promise.all(words.map(async w => await wr(w, from, to)))
}

routes.map('/msearch', multipleSearch)

const port = process.env.PORT || 3000

routes.app.listen(port, function() {
    console.log("Serving in http://localhost:" + port)
});

