const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TVSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    validate: [
      {
        validator: function(value) {
          // value merujuk pada key itu sendiri
          return TV.findOne({
            title: value,
            userId: this.userId // kalalu mau menunjuk dalam skema yang sama, pakai this
          })
            .then(track => {
              if (track) {
                return false;
              }
              return true;
            })
            .catch(err => {
              return false;
            });
        },
        message: "You have already added that movie to your favorite"
      }
    ]
  },
  overview: String,
  poster_path: String,
  popularity: Number,
  tag: {
    type: [String],
    maxlength: [5, "Maximum tag is 5 per movie"]
  },
  status: Number
});

const TV = mongoose.model("TV", TVSchema);
module.exports = TV;
