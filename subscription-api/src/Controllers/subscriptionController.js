const subscriptionService = require('../Services/subscriptionService');

exports.getSubscriptions = async (req, res) => {
    const { userId } = req.params;
    const course = await subscriptionService.getSubscriptions(userId);
    res.json(course);
};
