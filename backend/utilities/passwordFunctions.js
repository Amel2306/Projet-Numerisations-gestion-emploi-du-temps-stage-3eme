// paramètres : taille du mot de passe à générer
//génère un mot de passe au hazard de la taille souhaité
function generateRandomPassword(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
}

const generatedPassword = generateRandomPassword(8);

module.exports = {
  generateRandomPassword,
  generatedPassword,
};
