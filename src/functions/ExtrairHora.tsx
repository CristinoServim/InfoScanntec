export function extrairHora(dateTimeISO: any) {
    const date = new Date(dateTimeISO);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
