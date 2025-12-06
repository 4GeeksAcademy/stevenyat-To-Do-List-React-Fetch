import React, {useState, useEffect} from "react";

//create your first component


const Home = () => {
	
	const [task, setTask] = useState("");
	const [taskList, setTaskList] = useState ([]);
 	const loadTask = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/users/stevenyat07")
		const data = await response.json()
		console.log(data)
		setTaskList(data.todos)
 	}
	const addTask = async () => {
		const response = await fetch ("https://playground.4geeks.com/todo/todos/stevenyat07", {
			method:"POST",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify({label: task, is_done: false})
		})
		const data = await response.json()
		loadTask()
	}
	
	useEffect(()=> {
		loadTask()
	},[])


		return (
		<div id="tares" className="d-flex justify-content-center align-items-center flex-column">
			<h1 id="titulo">ToDoList</h1>
			<div className="card rounded-0 d-flex justify-content-center align-items-center flex-column mt-5">
				<div className="card-body p-0">
					<input 
						type="text"
						value={task || ""}
						placeholder="What needs to be done?"
						className="form-control border-0 focus-ring focus-ring-light border-bottom rounded-0 ps-4 p-2"
						onChange={(e) => setTask (e.target.value)}
						onKeyUp={(e) => {
							if (e.key === "Enter") {
								addTask();
								setTaskList([...taskList, {label:task,is_done:false}]);
								setTask("");
							}
						}}
					/>
					{/* <button onClick={() => setTaskList([...taskList, task])} className="btn btn-primary my-2">
						Add Task
					</button> */}
					{taskList.length === 0 && <p className="mt-3 text-center">No tasks, add tasks</p>}
					{taskList && taskList.map((task, index) => 
						<p key={index}
							className="d-flex border-bottom justify-content-between align-items-center m-0 ps-4 p-2">
							{task.label}
							<button 
								onClick={()=> setTaskList(taskList.filter((item,ind)=> ind !== index)) }
								className="btn-close">
							</button> 
						</p>)
					}
					<h6
						className="fw-lighter text-muted m-2"
					>
							{taskList.length} {taskList.length === 1 ? "item" : "items"} left
					</h6>
				</div>
			</div>
		</div>
	);
};

export default Home;