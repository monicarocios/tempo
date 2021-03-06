let db = require("../models");

module.exports = function(app) {
    //Get all bands
    app.get("/api/bands", function(req, res) {
        db.Bands.findAll({
            include: [
                { model: db.Discogs },
                { model: db.Tours }
            ]
        }).then(function(dbBands) {
            res.json(dbBands);
        });
    });

    app.get("/api/bands/:bandId", function(req, res) {
        db.Bands.findOne({
            include: [
                { model: db.Discogs },
                { model: db.Tours }
            ],
            where: {
               bandId: req.params.bandId
            }
        }).then(function(dbBand) {
            res.json(dbBand);
        });
    });

    //Create a new band
    app.post("/api/bands", function(req, res) {
        // let newBand = new Band({
        //     bandName: req.body.bandName,
        //     bandPhotoURL: req.body.bandPhotoURL,
        //     bandGenre: req.body.bandGenre,
        //     bandHometown: req.body.bandHometown,
        //     bandBio: req.body.bandBio
        // });
        console.log("You hit the band POST route!");
        db.Bands.create(req.body).then(function(dbBand) {
            res.json(dbBand);
        });
    });

    //Delete a band by id
    app.delete("/api/bands/:bandId", function(req, res) {
        db.Bands.destroy({
           where: { 
               bandId: req.params.bandId
            }
        })
        .then(function(dbBand) {
            res.json(dbBand);
        });
    });
};
