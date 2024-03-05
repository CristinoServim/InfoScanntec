const data = new Date()

export function getData() {
    return data.getFullYear() + '-' + (data.getMonth() + 1 < 10 ? "0" + (data.getMonth() + 1) : (data.getMonth() + 1)) + '-' + (data.getDate() + 1 < 11 ? "0" + (data.getDate()) : (data.getDate()))
}

export function getHora() {
    return (data.getHours() < 10 ? '0' : '') + data.getHours() + (data.getMinutes() < 10 ? ':0' : ':') + data.getMinutes()  
}