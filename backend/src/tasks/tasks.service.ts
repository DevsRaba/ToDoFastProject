import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Crear una nueva tarea
  async createTask(title: string, description: string, dueDate: Date): Promise<Task> {
    const newTask = this.taskRepository.create({ title, description, dueDate });
    return this.taskRepository.save(newTask);
  }

  // Obtener todas las tareas
  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Obtener una tarea específica por su ID
  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  // Actualizar una tarea
  async updateTask(id: number, status: string, title?: string, description?: string): Promise<Task> {
    const task = await this.getTaskById(id); // Verificar si la tarea existe
    task.status = status;
    if (title) task.title = title;
    if (description) task.description = description;
    return this.taskRepository.save(task);
  }

  // Eliminar una tarea
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
