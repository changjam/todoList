import { clear_button_active, get_active_tags } from './tools/input_tags.js' 

window.onload = () => {
    tags_button_click_EventListener();
    add_task_button_click_EventListener();
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

        const response = await fetch("task/", {
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
        console.log(data);
    });
}