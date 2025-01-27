const subscriptionRepository = require('../Repositories/subscriptionRepository');

exports.getSubscriptions = async (userId) => {
    return await subscriptionRepository.getSubscriptions(userId);
};
