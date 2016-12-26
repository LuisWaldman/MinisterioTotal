var Cfuncion = require('./Cfuncion');


function concurrencia(control,admClases)
{
    var ret = [];
    if (control.control)
        for (var i in control.control)
    {
            ret[ret.length] = hacerclases(control.control[i], admClases);
    }
    return ret;
}

function agregaratributos(control,clase)
{
    var ret = [];
    if (control.control)
        for (var i in control.control)
        {
            switch(control.control[i].$.tipo) 
            {
                case 'texto':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
                case 'password':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
                case 'numero':
                    clase.AddAtributo(control.control[i].$.valor,"number");
                    break;
                case 'url':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
                case 'fecha':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
                case 'email':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
                case 'combo':
                    clase.AddAtributo(control.control[i].$.valor,"string");
                    break;
            }
            agregaratributos(control.control[i], clase);

        }
    return ret;
}


hacerclases = function(control,admClases) {
    
    var ret = [];
    
    switch(control.$.tipo) 
    {
    case 'formulario':
        var clase = admClases.GetClase(control.$.clase);
        agregaratributos(control, clase);
        concurrencia(control, admClases);
        break;
    
    case 'grilla':
        var clase = admClases.GetClase(control.$.clase);
        
        for (var co in control.columna)
        {
            clase.AddAtributo(control.columna[co].$.valor, 'string');
        }
        break;    
    case 'combo':
        var clase = admClases.GetClase(control.$.clase + 'Service');

        var texto = '        var ret: KeyValue[] = [];\r\n';
        texto += "        ret[ret.length] = new KeyValue('1','" + control.$.clase +  " 1');\r\n";
        texto += "        ret[ret.length] = new KeyValue('2','" + control.$.clase +  " 2');\r\n";
        texto += "        ret[ret.length] = new KeyValue('3','" + control.$.clase +  " 3');\r\n";
        texto += "        return ret;\r\n";
        clase.AddFuncion(Cfuncion('Get',[],texto));

        if (control.$.depende)
        {
            var textoDep = '\t\tvar ret: KeyValue[] = [];\r\n';
            textoDep += "        ret[ret.length] = new KeyValue('1', value + '" + control.$.clase +  " 1');\r\n";
            textoDep += "        ret[ret.length] = new KeyValue('2', value + '" + control.$.clase +  " 2');\r\n";
            textoDep += "        ret[ret.length] = new KeyValue('3', value + '" + control.$.clase +  " 3');\r\n";
            textoDep += "        return ret;\r\n";
            clase.AddFuncion(Cfuncion('GetBy' + control.$.depende ,['value: string'],textoDep));
        }

        clase.AddImport('KeyValue');
        break;
    default:
        concurrencia(control, admClases);
        break;

    }
    return ret;
}

module.exports = hacerclases;