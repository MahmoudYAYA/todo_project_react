import { useEffect, useState, } from "react";
import TodoItem from "./TodoItem";
import { Construction } from "lucide-react";

// typ priority peux avoir pluesieurs valeurs
type Priority = 'Urgent' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
  deadline?: string;
 }

function App() {
  // string pour priciser la valeur que input vas recevoir
  const [input, setInput] = useState<string>("") // ici on pricise la valeur par défault de une input
  const [priority, setPriority] = useState<Priority>("Moyenne") // important de préciser le type priority

  
  // un const pour sauvegarder les données dans localstorge
  const saveTodos = localStorage.getItem("todos");
  // puis le convertire  dans un format json
  const initialTodos = saveTodos ? JSON.parse(saveTodos) : []
  const [todos, setTodos] = useState <Todo[]>(initialTodos)
  const [filter, setFilter] = useState<Priority | "Tous"> ("Tous")

  // on utilise useEffect pour metter à jour aund on vas mettre un élément dans un tableau
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
      
  }, [todos])

  function addTodo() {
    if(input.trim() == "")   {  // si l'input n'est pas vide 
      return
  }
  
  const newTodo: Todo = {
    id: Date.now(),
    text: input.trim(),
    priority: priority,
    deadline: deadline || undefined,
    
  }
  // ici on ajoute la nouvelle todo dans la la table de  Todo
  const newTodos = [newTodo, ...todos]  
  setTodos(newTodos)
  setInput("")
  setPriority("Moyenne")
  setDeadline("")
  console.log(newTodos)

  

}

let filteredTodos: Todo[] = []

  if(filter === "Tous") {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter((todos) => todos.priority === filter)
  }


  // pour conter le nombre des taches urgent 
  const urgentConut = todos.filter((t) => t.priority === "Urgent").length
  const mediumConut = todos.filter((t) => t.priority === "Moyenne").length
  const lowConut = todos.filter((t) => t.priority === "Basse").length
  const totalCounts = todos.length

  function deleteTodo(id: number) {

    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cette tâche ?")
  
    if (!isConfirmed) return; // si l’utilisateur annule l'action , on ne fait rien

    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const [selectedTodos, SetSelectedTodos] = useState<Set<number>>(new Set())
  const [deadline, setDeadline] = useState<string>("")

  function toggleSelectTodo(id: number) {
    const newSelect = new Set(selectedTodos)
    if(newSelect.has(id)) {
      newSelect.delete(id)
    }else {
      newSelect.add(id)
    }
    SetSelectedTodos(newSelect)
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {

      if(selectedTodos.has(todo.id)) {
        return false
      } else {
        return true
      }
    }) 
     setTodos(newTodos)
     SetSelectedTodos(new Set)
  }
  return (
    <div className="flex justify-center">
      <div className="w-3/4 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input type="text" className="input w-full" placeholder="Ajouter une tache" value={input} onChange={(e => setInput (e.target.value)) /* on passe la nouvelle valeur qu'on rentrée dans le champs à input grace à setInput */}/>
          <input
            type="date"                   
            className="input w-fit"       // w-fit pour ne pas prendre toute la largeur
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select className="select w-full" value={priority} onChange={(e) => setPriority(e.target.value as Priority) /* on précise le type Priority avec as */}>
            <option value="Urgent">Urgent</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">Ajouter</button>
        </div>
        <div className="espace-y-2 flex-1 h-fit ">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-4">
            <button className={`btn btn-soft ${filter === "Tous" ? "btn btn-primary" : ""}`} onClick={() => setFilter("Tous")}>Tous {totalCounts}</button>

              {/*Ce boutton pour filter les taches */}
            <button className={`btn btn-soft ${filter === "Urgent" ? "btn btn-primary" : ""}`} onClick={() => setFilter("Urgent")}>Urgent {urgentConut}</button>


            <button className={`btn btn-soft ${filter === "Moyenne" ? "btn btn-primary" : ""}`} onClick={() => setFilter("Moyenne")}>Moyenne {mediumConut}</button>


            <button className={`btn btn-soft ${filter === "Basse" ? "btn btn-primary" : ""}`} onClick={() => setFilter("Basse")}>Basse :  {lowConut}</button>
          
           
          </div>
          <button className="btn btn-primary"
            onClick={finishSelected} 
            disabled={selectedTodos.size == 0 /* quand on selectionne rien, il le boutton sera griser */}
          >
            Finir la sélection  {selectedTodos.size}
           </button>
        </div>

          {filteredTodos.length > 0 ?  (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo ) => 
              
              <li key={todo.id}>
                <TodoItem todo={todo} 
                 isSelected={selectedTodos.has(todo.id)}
                 onDelete={() => deleteTodo(todo.id)}
                 onToggleSelect={toggleSelectTodo}
                 />
              </li>
              
              )}
            </ul>

          ): (

            <div className="flex justify-center items-center flex-col p-5">
              <div>
                {/* Sembole qui indique si y a aucune tache exist pour un filtre*/}
                <Construction strokeWidth={1} className="w-20 h-20 text-primary"/>
              </div>
              <p className="text-sm">Aucune Tache pour ce filtre </p>
            </div>
            
          )} 
        </div>
            
      </div>
    </div>
  )
}

export default App  