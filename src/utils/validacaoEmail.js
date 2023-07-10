export function validacaoEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
