import type { Todo } from "../types/todo.types.ts";

/**
 * Vérifie si une deadline est proche (dans les 3 jours)
 */
export const isDeadlineClose = (deadline?: string): boolean => {
  if (!deadline) return false;
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= 3;
};

/**
 * Compte les tâches avec deadline proche
 */
export const countCloseDeadlines = (todos: Todo[]): number => {
  return todos.filter((todo) => isDeadlineClose(todo.deadline)).length;
};

/**
 * Calcule le pourcentage de complétion
 */
export const calculateCompletion = (
  total: number,
  selected: number
): number => {
  return total > 0 ? Math.round((selected / total) * 100) : 0;
};
