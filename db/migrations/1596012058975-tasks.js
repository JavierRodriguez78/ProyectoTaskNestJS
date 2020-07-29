const { Task } = require('../models');

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  // Write migration here
  await Task.create({"title":"Es un mi primera migración","description":"Mi primera descripción"});
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
