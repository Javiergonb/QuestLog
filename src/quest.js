export function Quest(title, description, dueDate, priority, complete = false){
    return {
    title,
    description,
    dueDate,
    priority,
    complete
    }
};