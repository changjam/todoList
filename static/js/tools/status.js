export function get_status_tags(status_idx){
    const status_items = {
        "Done": 1,
        "Pending": 2,
        "Doing": 3,
    }
    return Object.keys(status_items)[status_idx-1];
}


export function get_next_status(status){
    const status_item = {
        "Done": 1,
        "Pending": 2,
        "Doing": 3,
    };

    let status_idx = status_item[status];
    let next_status_idx = status_idx + 1;
    if(next_status_idx > 3)
        next_status_idx = 1;

    return Object.keys(status_item)[next_status_idx-1];
}