const fs = require('fs')
const data = require('../data.json');
const { age, graduation, date } = require('../utils')

exports.index = function(req, res){
    
    const students = []
    
    for(let student of data.students){
        const instructor = {
            ...student,
            
        }
        students.push(instructor)
    }
    return res.render('students/index', { students })
}
exports.create = function(req, res){
    return res.render('students/create')
}
exports.show = function(req,res){
    const { id } = req.params

    const foundStudents = data.students.find(function(student){
        return student.id == id 
    })
    
    if(!foundStudents) return res.render('not-found')

    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth),
    }

    return res.render('students/show', { student })

}
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    let { birth } = req.body

    for(key of keys){
        if(req.body[key] == "") return res.send("Write in all fields")

    }
    birth = Date.parse(birth)
    let id = 1;
    let lastStudent = data.students.length;
    if(lastStudent > 0){
        lastStudent = data.students[data.students.length - 1].id;
        id = lastStudent + 1;
    }

    data.students.push({
        id,
        ...req.body,
        birth,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error")

        return res.redirect("/students")
    })

}
exports.edit = function(req, res){
    const { id } = req.params

    const foundStudents = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudents) return res.render('not-found')
    
    const student = {
        ...foundStudents,
        birth: date(foundStudents.birth)
    }
    return res.render('students/edit', { student })
}
exports.update = function(req, res){
   
    const { id } = req.body 
    let index = 0

    const foundStudent = data.students.find(function(student, foundIndex){
        if(id == student.id){
        index = foundIndex
        return true
        }
    })

    if(!foundStudent) return res.send("Student not found")

    const student = {
        ...foundStudent,
        ...req.body,
        id: Number(id),
        birth: Date.parse(req.body.birth)
    }

    data.students[index] = student

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Error write file")
    })

    return res.redirect(`/students/${id}`)
}
exports.delete = function(req, res){
    
    const { id } = req.body 

    const filterStudent = data.students.filter(function(student){
        return student.id != id
    })
    if(!filterStudent) return res.send("Student not delete")

    data.students = filterStudent

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Error Delete Student")
    })

     return res.redirect('/students')
}