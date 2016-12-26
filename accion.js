var AdmClases = require('./AdmClases');

var admCla = AdmClases();
var cla1 = admCla.GetClase('Persona');
cla1.AddAtributo('nombre','texto')

var cla2 = admCla.GetClase('Persona');
console.log(cla2);
