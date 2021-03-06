var connection = require("./connection");

// Creates array of question marks for query
function printQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) { arr.push("?"); }

    return arr.toString();
}

// Converts key/value pairs into SQL syntax
function convertSyntax(ob) {
    var arr = [];
    for (var key in ob) {
      var value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        arr.push(key + "=" + value);
      }
    }

    return arr.toString();
}

var orm = {
    selectAll: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (" + cols.toString() + ") ";
        queryString += " VALUES (" + printQmarks(vals.length) + ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET " + convertSyntax(objColVals);
        queryString += " WHERE " + condition;
        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE " + condition;
        console.log(queryString);

        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;