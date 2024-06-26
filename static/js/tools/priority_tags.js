export function clear_button_active(class_name, remove_class_name){
    let tags = document.getElementsByClassName(class_name);
    for(let i=0; i < tags.length; i++)
        tags[i].classList.remove(remove_class_name);
}

export function get_active_tags(class_name){
    let tags = document.getElementsByClassName(class_name);
    let active_tag = "";
    for(let i=0; i < tags.length; i++){
        if(tags[i].classList.contains('active')){
            active_tag = tags[i].innerHTML;
        }
    }
    const priority = {
        "Low": 1,
        "Medium": 2,
        "High": 3,
    }

    return priority[active_tag];
}

export function get_priority_tags(priority_idx){
    const priority_items = {
        "Low": 1,
        "Medium": 2,
        "High": 3,
    }
    return Object.keys(priority_items)[priority_idx-1];
}