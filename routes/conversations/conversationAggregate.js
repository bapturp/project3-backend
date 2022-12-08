const {
  Types: { ObjectId },
} = require('mongoose');

module.exports = function conversationAggregate(userId) {
  return [
    {
      $match: {
        participants: {
          $eq: new ObjectId(userId),
        },
      },
    },
    {
      $unwind: {
        path: '$participants',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $match: {
        participants: {
          $ne: new ObjectId(userId),
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'participants',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $addFields: {
        penfriend: '$user.username',
      },
    },
    {
      $unwind: {
        path: '$penfriend',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $lookup: {
        from: 'services',
        localField: 'service',
        foreignField: '_id',
        as: 'serviceArr',
      },
    },
    {
      $unwind: {
        path: '$serviceArr',
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $addFields: {
        serviceTitle: '$serviceArr.title',
      },
    },
    {
      $project: {
        _id: 0,
        conversationId: '$_id',
        service: {
          id: '$service',
          title: '$serviceTitle',
        },
        penfriend: 1,
      },
    },
  ];
};
