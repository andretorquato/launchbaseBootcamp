const { age, graduation, date } = require("../../libs/utils");
const teachers = require("../models/teachers");

module.exports = {
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit  = limit || 4;
    let offset = limit * ( page -1 );
      
    let params = {
      filter,
      page,
      limit,
      offset, 
      callback(teachers){
      for (teacher of teachers) {
        teacher.subjects_taught = teacher.subjects_taught.split(",");
        }  
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page
        }        
        return res.render('teachers/index', {teachers, pagination, filter});
      }
    };
    
    teachers.paginate(params);
    
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  show(req, res) {
    teachers.find(req.params, function (teacher) {
      if (teacher == undefined) return res.status(404).render("not-found");

      teacher.subjects_taught = teacher.subjects_taught.split(",");
      teacher.education_level = graduation(teacher.education_level);
      teacher.created_at = date(Date.parse(teacher.created_at)).format;
      teacher.age = date(Date.parse(teacher.birth_date)).birthDay;
      return res.render("teachers/show", { teacher });
    });
  },
  edit(req, res) {
    teachers.find(req.params, function (teacher) {
      if (teacher == undefined) return res.status(404).render("not-found");

      teacher.education_level = graduation(teacher.education_level);
      teacher.birth_date = date(Date.parse(teacher.birth_date)).iso;

      return res.render("teachers/edit", { teacher });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("preencha todos os campos");
      }
    }

    teachers.create(req.body, function (teacher) {
      return res.redirect(`teachers/${teacher.id}/edit`);
    });
  },
  update(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("preencha todos os campos");
      }
    }

    teachers.update(req.body, function (teacher) {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },
  delete(req, res) {
    teachers.delete(req.body.id, function (teacher) {
      return res.redirect("/teachers");
    });
  },
};
