import { get_priority_tags } from "./priority_tags.js";
import { get_status_tags } from "./status.js";




export async function get_data() {
    const response = await fetch("api/task/");
    const data = await response.json();

    data.result.sort((a, b) => {
        if (a.status === b.status) 
            return b.priority - a.priority;
        return b.status - a.status;
    });

    return data;
}

export async function render_todo_list(data_list){
    let render_str = "";
    console.log(data_list)
    if (data_list.length === 0){
        render_str = "<div class=\"no_task_message\">No task to display</div>";
    }else{
        data_list.forEach((d)=>{
            const _priority_name = get_priority_tags(d.priority);
            const _status_name = get_status_tags(d.status);
            const _add_remove_style = d.status === 1 ? "remove" : "";
            render_str += `
                <div class="task ${_priority_name}" tid="${d.id}">
                    <div class="remove_task_button">X</div>
                    <div class="important_mark ${_priority_name}">${_priority_name}</div>
                    <div class="task_title ${_add_remove_style}">${d.title}</div>
                    <div class="is_finish_tags ${_status_name}">${_status_name}</div>
                </div>
                `
        });
    }

    document.getElementById("task_container").innerHTML = render_str;
}

export function show_save_button(origin_result_list, result_list){
    const save_button = document.getElementById("save_button");
    if (arraysEqual(origin_result_list, result_list))
        save_button.classList.add("display_none");
    else
        save_button.classList.remove("display_none");
}

function arraysEqual(arr1, arr2) {
    let is_equal = true;
    if (arr1.length !== arr2.length)
        return false;

    const sortedArr1 = arr1.slice().sort((a, b) => a.id - b.id);
    const sortedArr2 = arr2.slice().sort((a, b) => a.id - b.id);

    sortedArr1.forEach((item, index) => {
        if (item.id !== sortedArr2[index].id || 
            item.title !== sortedArr2[index].title || 
            item.priority !== sortedArr2[index].priority || 
            item.status !== sortedArr2[index].status
        ) {
            is_equal = false;
            return;
        }
    });

    return is_equal;
}

export function get_next_idx(idx, lower_limit = 1, upper_limit = 3){
    let next_idx = idx + 1;
    if(next_idx > upper_limit)
        next_idx = lower_limit;
    return next_idx;
}