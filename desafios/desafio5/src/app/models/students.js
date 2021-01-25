const { date } = require("../../libs/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(
      `SELECT * FROM students ORDER BY name ASC`,
      function (err, results) {
        if (err) throw `Database error:${err}`;

        return callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
            INSERT INTO students(
                avatar_url,
                name,
                email,
                birth_date,
                school_years,
                hours
            ) VALUES($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_years,
      data.hours
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error:${err}`;

      return callback(results.rows[0]);
    });
  },
  find(data, callback) {
    db.query(
      `SELECT * FROM students WHERE id = $1`,
      [data.id],
      function (err, results) {
        if (err) throw `Database error:${err}`;

        return callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth_date=($4),
            school_years=($5),
            hours=($6)
            WHERE id = $7
        `;
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_years,
      data.hours,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error:${err}`;

      return callback();
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM students WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database error:${err}`;

        return callback();
      }
    );
  },
};
