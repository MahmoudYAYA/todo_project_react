export type Priority = "Urgent" | "Moyenne" | "Basse";

export type Todo = {
  id: number;
  text: string;
  priority: Priority;
  deadline?: string;
};
