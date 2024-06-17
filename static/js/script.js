import { clear_button_active, get_active_tags } from './tools/priority_tags.js' 
import { get_data, render_todo_list, show_save_button, get_next_idx } from './tools/data.js';




var current_data = [];

window.onload = async () => {
    const data = await get_data();
    init(data["result"], data["result"]);

    // input event
    tags_button_click_EventListener();
    add_task_button_click_EventListener();
    update_task_button_click_EventListener();
};

function init(origin_data_list, current_data_list){
    current_data = current_data_list;
    render_todo_list(current_data_list);

    // click to change 
    change_priority_EventListener(origin_data_list, current_data_list);
    change_status_EventListener(origin_data_list, current_data_list);
}

function tags_button_click_EventListener(){
    document.getElementById("tags_button_container").addEventListener("click", (e) => {
        if (e.target.classList.contains("active") || !e.target.classList.contains("tag"))
            return;
        clear_button_active("tag", "active")
        e.target.classList.add("active");
    });
}

function add_task_button_click_EventListener(){
    document.getElementById("add_task_button").addEventListener("click", async (e) => {
        const input_task = document.getElementById("input_task").value.trim();
        if (input_task === "")
            return;
        const active_tag_value = get_active_tags("tag");

        const response = await fetch("api/task/", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                "title": input_task,
                "priority": active_tag_value
            })
        });
        const data = await response.json();
        location.reload();
    });
}

function update_task_button_click_EventListener(){
    document.getElementById("save_button").addEventListener("click", async (e) => {
        const response = await fetch("api/task/", {
            method: "PUT",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(current_data)
        });
        const data = await response.json();
        location.reload();
    });
}

function change_priority_EventListener(origin_data_list, current_data_list){
    document.querySelectorAll(".important_mark").forEach(element => {
        element.addEventListener("click", (e) => {
            const taskId = parseInt(e.target.parentElement.getAttribute("tid"));
            let new_data_list = current_data_list.map(task => 
                task.id === taskId 
                    ? { ...task, priority: get_next_idx(task.priority) }
                    : task
            );

            show_save_button(origin_data_list, new_data_list);
            init(origin_data_list, new_data_list);
        });
    });
}

function change_status_EventListener(origin_data_list, current_data_list){
    document.querySelectorAll(".is_finish_tags").forEach(element => {
        element.addEventListener("click", (e) => {
            const taskId = parseInt(e.target.parentElement.getAttribute("tid"));
            let new_data_list = current_data_list.map(task => 
                task.id === taskId 
                    ? { ...task, status: get_next_idx(task.status) }
                    : task
            );

            show_save_button(origin_data_list, new_data_list);
            init(origin_data_list, new_data_list);
        });
    });
}