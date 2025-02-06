const courseService = require('../Services/courseService');

exports.getCourseById = async (req, res) => {
    const { id } = req.params;
    console.log(req);
    const course = await courseService.getCourseById(id);
    res.json(course);
};
