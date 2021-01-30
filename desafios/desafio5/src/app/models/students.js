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
                hours,
                teacher_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_years,
      data.hours,
      data.teacher_id
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error:${err}`;

      return callback(results.rows[0]);
    });
  },
  find(data, callback) {
    db.query(
      `SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id)
      WHERE students.id = $1
      `,
      [data.id],
      function (err, results) {
        if (err) throw `Database error:${err}`;

        return callback(results.rows[0]);
      }
    );
  },
  findBy(filter, callback){
    db.query(`
      SELECT * FROM students
      WHERE students.name ILIKE '%${filter}%'
      GROUP BY students.id
      ORDER BY students.id DESC
    `, function (err, results) {
      if(err) throw `DatabaseError ${err}`

      callback(results.rows);
    })
  },
  update(data, callback) {
    const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            email=($3),
            birth_date=($4),
            school_years=($5),
            hours=($6),
            teacher_id=($7)
            WHERE id = $8
        `;
    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth_date).iso,
      data.school_years,
      data.hours,
      data.teacher_id,
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
  teachersSelectOption(callback) {
    db.query(`SELECT name, id FROM teachers`, function (err, results) {
      if (err) throw `Database error: ${err}`;

      callback(results.rows);
    });
  },
  paginate(params){
    const { limit, offset, filter, callback } = params;

      let query = "",
      filterQuery = "",
      totalQuery = `(
        SELECT count(*) FROM students
        ) AS total
      `
      if(filter){
        filterQuery = `
        WHERE students.name ILIKE '%${filter}%'
        OR students.email ILIKE '%${filter}%'
        `
      }

      totalQuery = `
         (SELECT count(*) FROM students
        ${filterQuery}
        ) AS total
      `
      query = `
       SELECT students.*, ${totalQuery}
       FROM students
       ${filterQuery}
       ORDER BY students.name ASC
       LIMIT $1 OFFSET $2
      `
      db.query(query, [limit, offset], function (err, results){
        if (err) throw `Database error:${err}`;

        callback(results.rows);
      });
    
  }
};
