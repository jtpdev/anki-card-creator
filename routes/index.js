import express from "express";
import __dirname from "../dirname.js";

var app = express();

app.use(express.static(__dirname + '/public'));

export default {
    map: (path, fnc) => {
        app.get(path, function(req, res){
            const words = req.query.words.split(',')
            const from = req.query.from
            const to = req.query.to
            fnc(words, from, to).then(data => res.send(data));
        });
    },
    app
}
