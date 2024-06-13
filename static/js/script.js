import { clear_button_active, get_active_tags, get_next_tags } from './tools/priority_tags.js' 
import { get_next_status } from './tools/status.js';
import { get_data, render_todo_list } from './tools/data.js';

window.onload = async () => {
    const data = await get_data();
    render_todo_list(data["result"]);

    // input event
    tags_button_click_EventListener();
    add_task_button_click_EventListener();

    // click to change 
    change_priority_EventListener(data["result"]);
    change_status_EventListener(data["result"]);
};


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

function change_priority_EventListener(result_list){
    document.querySelectorAll(".important_mark").forEach(element => {
        element.addEventListener("click", (e) => {
            let priority_name = e.target.classList[1];
            let next_priority_name = get_next_tags(priority_name);

            e.target.classList.remove(priority_name);
            e.target.classList.add(next_priority_name);
            e.target.innerText = next_priority_name;

            e.target.parentElement.classList.remove(priority_name);
            e.target.parentElement.classList.add(next_priority_name);

            // result_list.forEach(task => {
            //     if (task.id !== parseInt(e.target.parentElement.getAttribute("tid"))) {
                    
            //     };
            // });
        });
    });
}

function change_status_EventListener(){
    document.querySelectorAll(".is_finish_tags").forEach(element => {
        element.addEventListener("click", (e) => {
            let status = e.target.classList[1];
            let next_status = get_next_status(status);

            e.target.classList.remove(status);
            e.target.classList.add(next_status);
            e.target.innerText = next_status;
        });
    });
}