const courseService = require('../Services/courseService');

exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    const course = await courseService.getCourseById(id);
    res.json(course);
};
