const fs = require('fs')
const data = require('./data.json')
const { age, graduation, date } = require('./utils')

exports.index = function(req, res){
    return res.render('teachers/index', { teachers: data.teachers})
}
// SHOW
exports.show = function(req,res){
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teacher){
        return teacher.id == id 
    })
    
    if(!foundTeachers) return res.render('not-found')

    const teacher = {
        ...foundTeachers,
        age: age(foundTeachers.birth),
        graduation: graduation(foundTeachers.graduation),
        services: foundTeachers.services.split(","),
        created_at: Intl.DateTimeFormat("pt-BR").format(foundTeachers.created_at),
    }

    return res.render('teachers/show', { teacher })

}

// CREATE
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    let { avatar_url, name, birth, graduation, typeClass, services} = req.body

    for(key of keys){
        if(req.body[key] == "") return res.send("Write in all fields")

    }
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.teachers.length + 1)
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        graduation,
        typeClass,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/teachers")
    })

}

// EDIT
exports.edit = function(req, res){
    const { id } = req.params

    const foundTeachers = data.teachers.find(function(teacher){
        return teacher.id == id
    })

    if(!foundTeachers) return res.render('not-found')
    
    const teacher = {
        ...foundTeachers,
        birth: date(foundTeachers.birth)
    }
    return res.render('teachers/edit', { teacher })
}

// PUT
exports.update = function(req, res){
   
    const { id } = req.body 
    let index = 0

    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
        index = foundIndex
        return true
        }
    })

    if(!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Error write file")
    })

    return res.redirect(`/teachers/${id}`)
}
// DELETE
exports.delete = function(req, res){
    
    const { id } = req.body 

    const filterTeacher = data.teachers.filter(function(teacher){
        return teacher.id != id
    })
    if(!filterTeacher) return res.send("Teacher not delete")

    data.teachers = filterTeacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Error Delete Teacher")
    })

     return res.redirect('/teachers')
}