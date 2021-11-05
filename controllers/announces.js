const AnnouncesModel = require("../models/announces");

exports.createAnnounces = (req, res, next) => {
    console.log("BODY :" +req.body);
    delete req.body._id;
    const announce = new AnnouncesModel({
      ...req.body,
      image: `./images/${req.filename}`
      
    });
    announce
      .save()
      .then(() => {
        res.status(201).json({
          message: "Post saved successfully!",
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error
        });
      });
  };
  
  exports.getOneAnnounces = (req, res, next) => {
    AnnouncesModel.findOne({
      _id: req.params.id,
    })
      .then((announce) => {
        res.status(200).json(announce);
      })
      .catch((error) => {
        res.status(404).json({
          error: error
        });
      });
  };
  
  exports.modifyAnnounces = (req, res, next) => {
    const announce = new AnnouncesModel({
        ...req.body
    });
    AnnouncesModel.updateOne({ _id: req.params.id }, announce).then(() => {
      res.status(201).json({
        message: "Announce updated successfully!",
      });
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
  
  exports.deleteAnnounces = (req, res, next) => {
    AnnouncesModel.deleteOne({ _id: req.params.id }).then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    }).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };
/*const announces = {
  getAnnounces(req, res, next) {
    AnnouncesModel.find({}).then((announces) => {
      res.send(announces);
    });
  },
};

module.exports = announces;*/

exports.getAnnounces = (req, res, next) => {
    AnnouncesModel.find({}).then((announces) => {
      res.send(announces);
    });
  };

