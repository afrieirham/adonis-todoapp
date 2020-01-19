"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Task = use("App/Models/Task");

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const tasks = await Task.all();

    return response.json({ tasks: tasks.toJSON() });
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { title } = request.post();

    if (!title || title === "") {
      return response.status(400).json({
        error: "Task cannot be empty"
      });
    }

    const task = new Task();
    task.title = title;
    await task.save();

    return response.status(201).json({
      message: "Task created successfully",
      task
    });
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { id } = params;
    const task = await Task.find(id);

    if (!task) {
      return response.status(404).json({
        error: "Task not found"
      });
    }

    return response.json(task);
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const { id } = params;
    const { title, isDone } = request.post();

    const task = await Task.find(id);

    if (!task) {
      return response.status(404).json({
        error: "Task not found"
      });
    }

    if (!title && !isDone) {
      return response.json({
        message: "No changes made",
        task
      });
    }

    task.title = title ? title : task.title;
    task.isDone = isDone ? isDone : task.isDone;
    await task.save();

    return response.status(201).json({
      message: "Task updated successfully",
      task
    });
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const task = await Task.find(id);

    if (!task) {
      return response.status(404).json({ error: "Task not found" });
    }
    await task.delete();
    return response.json({
      message: "Task deleted succesfully"
    });
  }
}

module.exports = TaskController;
