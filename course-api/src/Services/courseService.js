const courseRepository = require('../Repositories/courseRepository');

exports.getCourseById = async (id) => {
    return await courseRepository.findById(id);
};
