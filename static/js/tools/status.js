export function get_status_tags(status_idx){
    const status_items = {
        "Done": 1,
        "Pending": 2,
        "Doing": 3,
    }
    return Object.keys(status_items)[status_idx-1];
}