// const { authenticate } = require('feathers-authentication').hooks;
const addStudentToBatch = require('../../hooks/add-student-to-batch');
const commonHooks = require('feathers-hooks-common');
const updateStudent = require('../../hooks/update-student');
// const fixEvaluationArrays = require('../../hooks/fix-evaluation-arrays');

const batchSchema = {
  include: {
    service: 'batches',
    nameAs: 'batch',
    parentField: 'batchId',
    childField: '_id'
  }
};

const evaluationsSchema = {
  include: {
    service: 'evaluations',
    nameAs: 'evaluations',
    parentField: 'evaluationIds',
    childField: '_id'
  }
};

const updateBatchOnStudentDeletion = require('../../hooks/update-batch-on-student-deletion');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [updateStudent()],
    patch: [updateStudent()],
    remove: []
  },

  after: {
    all: [
      commonHooks.populate({schema: batchSchema}),
      commonHooks.populate({schema: evaluationsSchema}),

    ],
    find: [],
    get: [],
    create: [addStudentToBatch()],
    update: [addStudentToBatch()],
    patch: [addStudentToBatch()],
    remove: [updateBatchOnStudentDeletion()]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
