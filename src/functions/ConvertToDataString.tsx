export function ConvertToDataString(dateIsoString: any) {
    const date = new Date(dateIsoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
}