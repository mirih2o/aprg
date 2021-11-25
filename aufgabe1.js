let nutzer = [
  { name: 'Alice', passwort: '§$Y45/912v' },
  { name: 'Bob', passwort: 'secret' },
  { name: 'Carla', passwort: '123' },
  { name: 'David', passwort: 'divaD' },
];

function benutzerExistiert(benutzername) {
  return nutzer.some((user) => user.name === benutzername);
}

function anmeldungErfolgreich(benutzername, passwort) {
  return nutzer.some(
    (user) => user.name === benutzername && user.passwort === passwort
  );
}

function benutzerHinzufuegen(benutzername, passwort) {
  if (!benutzerExistiert(benutzername)) {
    console.log(benutzername + ' existiert nicht');
    nutzer.push({ name: benutzername, passwort: passwort });
    console.log(benutzername + ' hinzugefügt');
  }
}

console.log(nutzer);
console.log(benutzerExistiert('Bob')); // true
console.log(benutzerExistiert('Ente')); // false

console.log(anmeldungErfolgreich('Bob', 'secret')); // true
console.log(anmeldungErfolgreich('Ente', 'quack')); // false

console.log(benutzerHinzufuegen('Ente', 'quack')); // Ente hinzugefügt

console.log(nutzer);
console.log(benutzerExistiert('Ente')); // true
console.log(anmeldungErfolgreich('Ente', 'quack')); // true
console.log(anmeldungErfolgreich('Ente', 'brot')); // false
