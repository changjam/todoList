import { get_priority_tags } from "./priority_tags.js";
import { get_status_tags } from "./status.js";

export async function get_data() {
    const response = await fetch("api/data/");
    const data = await response.json();

    data.result.sort((a, b) => {
        if (a.priority === b.priority) {
            return b.status - a.status;
        }
        return b.priority - a.priority;
    });

    return data;
}

export async function render_todo_list(data_list){
    let render_str = "";
    data_list.forEach((d)=>{
        const _priority_name = get_priority_tags(d.priority);
        const _status_name = get_status_tags(d.status);
        render_str += `
            <div class="task ${_priority_name}" tid="${d.id}">
                <div class="important_mark ${_priority_name}">${_priority_name}</div>
                <div class="task_title">${d.title}</div>
                <div class="is_finish_tags ${_status_name}">${_status_name}</div>
            </div>
            `
    });
    document.getElementById("task_container").innerHTML = render_str;
}