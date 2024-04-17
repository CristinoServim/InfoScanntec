export const formatCNPJ = (value: any) => {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .replace(/^(\d{2})(\d)/, '$1.$2') // Coloca ponto após os dois primeiros dígitos
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3') // Coloca ponto entre o quinto e o sexto dígitos
      .replace(/\.(\d{3})(\d)/, '.$1/$2') // Coloca uma barra após o oitavo dígito
      .replace(/(\d{4})(\d)/, '$1-$2') // Coloca um hífen após o dígito 12
      .substring(0, 18); // Limita o tamanho do CNPJ em 18 caracteres
  };