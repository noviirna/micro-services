module.exports = function(err, req, res, next) {
  console.log(JSON.stringify(err), err);
  if (err.code) {
    res.status(err.code).json({ message: err.message });
  } else if (err.name === "ValidationError" || err.name == "CastError") {
    let { message } = err;
    let arr = [
      "User validation failed: ",
      "Validation failed: ",
      "User validation failed: ",
      "email: ",
      "password: "
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].indexOf(message)) {
        message = message.replace(arr[i], "");
      }
    }
    res.status(400).json({ message });
  } else {
    res.status(500).json({ message: "internal server error" });
  }
};
