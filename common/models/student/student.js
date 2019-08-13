let to = require('await-to-js').to;

'use strict';

module.exports = function(Student) {
    Student.createStudent = async function(studentId, firstName, midName, lastName, dateOfBirth, studentClass) {
        let [err, student] = await to(Student.findOne({where: {studentId: studentId}}))
        if (student != null) {
            return [200, 'student existed']
        }
        let studentData = {
            studentId: studentId,
            firstName: firstName,
            midName: midName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            studentClass: studentClass
        }
        Student.upsert(studentData)
        return [200, 'success']
    }

    Student.readStudent = async function(studentId) {
        let [err, student] = await to(Student.findOne({where: {studentId: studentId}}));
        if (student == null) {
            return ["can't find student", {}]
        }
        return ["success", student];
    }

    Student.updateStudent = async function(studentId, firstName, midName, lastName, dateOfBirth, studentClass) {
        let [err, student] = await to(Student.findOne({where: {studentId: studentId}}))
        if (student == null) {
            return ['200', 'can not find student']
        }
        let studentData = {
            id: student.id,
            studentId: studentId,
            firstName: firstName,
            midName: midName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
            studentClass: studentClass
        }
        Student.upsert(studentData)
        return [200, 'success']
    }

    Student.deleteStudent = async function(studentId) {
        let [err, student] = await to(Student.findOne({where: {studentId: studentId}}))
        if (student == null) {
            return [200, 'can not find student']
        }
        Student.destroyById(student.id)
        return [200, 'success']
    }

    Student.remoteMethod(
        'createStudent', {
            http: {path: '/student', verb: 'post'},
            accepts: [
                {arg: 'student_id', type: 'string', required: true},
                {arg: 'first_name', type: 'string', 'required': true},
                {arg: 'mid_name', type: 'string', required: true},
                {arg: 'last_name', type: 'string', required: true},
                {arg: 'date_of_birth', type: 'date', required: true},
                {arg: 'student_class', type: 'string', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    Student.remoteMethod(
        'readStudent', {
            http: {path: '/student', verb: 'get'},
            accepts: [
                {arg: 'student_id', type: 'string', required: true}
            ],
            returns: [
                {arg: 'messeage', type: 'string'},
                {arg: 'student', type: 'object'}],
        },
    )

    Student.remoteMethod(
        'updateStudent', {
            http: {path: '/student', verb: 'put'},
            accepts: [
                {arg: 'student_id', type: 'string', required: true},
                {arg: 'first_name', type: 'string', 'required': true},
                {arg: 'mid_name', type: 'string', required: true},
                {arg: 'last_name', type: 'string', required: true},
                {arg: 'date_of_birth', type: 'date', required: true},
                {arg: 'student_class', type: 'string', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )

    Student.remoteMethod(
        'deleteStudent', {
            http: {path: '/student', verb: 'delete'},
            accepts: [
                {arg: 'student_id', type: 'string', required: true}
            ],
            returns: [
                {arg: 'status', type: 'number'},
                {arg: 'message', type: 'string'}],
        },
    )
};
