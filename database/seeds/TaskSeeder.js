"use strict";

/*
|--------------------------------------------------------------------------
| TaskSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class TaskSeeder {
  async run() {
    const tasks = await Factory.model("App/Models/Task").createMany(8);
  }
}

module.exports = TaskSeeder;
