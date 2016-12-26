var TagHtml = require('./TagHtml');
var Modelo = '';


function concurrencia(control,TS) {
    var ret = [];
    if (control.control)
        for (var i in control.control)
    {
            ret[ret.length] = hacercontrolHTML(control.control[i],TS);
    }
    return ret;
}

hacercontrolformulario = function(controles) {
    var ret = TagHtml(
        'div',
        {
            class: "form-group"
        },
        controles
    );
    return ret;
};

hacerlabel = function(valor, texto) 
{
    var l = TagHtml('label',
    {
        for: valor
    });
    l.innerHTML = texto;
    return l;
};

hacerinput = function(valor, texto, tipo) 
{
    var i = TagHtml('input',
    {
        type: tipo,
        class: 'form-control',
        '[(ngModel)]': Modelo + '.' + valor,
        id: valor,
        name: valor,
    });
    i.atributos["#" + valor] = 'ngModel';
    return i;
}

HacerControl = function(control, input)
{
        var DivValidador =TagHtml('div',{
            "[hidden]": control.valor +  ".valid || " + control.valor + ".pristine",
            class: "alert alert-danger"
        });
        DivValidador.innerHTML = control.descripcion + ' no es valido';
        var ret = TagHtml('div',{class: "form-group"},
                        [ hacerlabel(control.valor, control.descripcion),
                        input,
                        DivValidador
                        ]);
        return ret;    

}

HacerControlCombo = function(control, archivoTS) {
    var option = TagHtml('option',
                        {
                              "*ngFor": "let vk of " + control.clase + "s",
                              "[value]": "vk.Key"
                        });
    option.innerHTML = "{{ vk.Value }}";
    var select = TagHtml('select',
                        {

                            class: 'form-control',
                            '[(ngModel)]': Modelo + '.' + control.valor,
                            "name": control.valor,
                            "id": control.valor
                        }, [ option ]);
    select.atributos["#" + control.valor] = 'ngModel';
    archivoTS.agregarListadoKeyValue(control.clase);
    var ret = HacerControl(control, select);
    if (control.depende)
        select.depende =  control.depende;
    return ret;

}

HacerControlGrilla = function(control, archivoTS)
{
    var columnas = [];
    
    for (var a in control.columna)
    {
        var valor = control.columna[a].$.valor;
        var descripcion = valor;
        if (control.columna[a].$.descripcion)
        {
            descripcion = control.columna[a].$.descripcion;
        }
        var newCol = TagHtml('p-column', {
                field: valor,
                header: descripcion
        });
        columnas[columnas.length] = newCol;
    }

    var ret = TagHtml('p-dataTable', {}, columnas);
    //console.log(control);
    return ret;
}


HacerControlInput = function(tipo, control)
{
   var input = hacerinput(control.valor, control.descripcion, tipo);
   var ret = HacerControl(control, input);

    var carContenido = '.';
    if (tipo == 'numero')
        carContenido = '9';
    var maximo = ' ';
    var minimo = '1';
    var patMaxMin = false;

    if (control.maximo != undefined)
    {
        patMaxMin = true;
        maximo = control.maximo;
        input.atributos.required = 'true';
    }

    if (control.minimo != undefined)
    {
        patMaxMin = true;
        minimo = control.minimo;
        input.atributos.required = 'true';
    }

    if (patMaxMin)
    {
        input.atributos.pattern = carContenido + "{" + minimo +"," + maximo + "}";
    }

     if (control.requerido != undefined)
    {
        input.atributos.required = 'true';
    }

    return ret;
}

hacercontrolHTML = function(control, archivoTS) {
    
    var ret;
    switch(control.$.tipo) {
    case 'formulario':
        Modelo = 'model';
        if (control.$.modelo)
            Modelo = control.$.modelo;


        var interiores = concurrencia(control,archivoTS);
        interiores[interiores.length] = TagHtml('input',
        {
            type: "reset",
            value: "Cancelar",
            "class": 'btn btn-default',
            id: "res_button",
            name: "res_button",
        });

        interiores[interiores.length] = TagHtml('input',
        {
            type: "submit",
            value: "Guardar",
            "class": 'btn btn-default',
            id: "subm_button",
            name: "subm_button",
        });


        ret = TagHtml('form', null, interiores);
        
        
        archivoTS.agregarImport(control.$.clase);
        archivoTS.AddAtributo(Modelo,control.$.clase);
        break;
    case 'texto':
        ret = HacerControlInput('text',control.$);
        break;
    case 'password':
        ret = HacerControlInput('password',control.$);
        break;
    case 'numero':
        ret = HacerControlInput('number',control.$);
        break;
    case 'url':
        ret = HacerControlInput('url',control.$);
        break;
    case 'fecha':
        ret = HacerControlInput('date',control.$);
        break;
    case 'email':
        ret = HacerControlInput('email',control.$);
        break;
    case 'combo':
        ret = HacerControlCombo(control.$, archivoTS);
        break;
    case 'grilla':
        ret = HacerControlGrilla(control, archivoTS);
        break;
   
    default:
        if (control.$.tipo != undefined)
            console.log('Control del tipo : ' + control.$.tipo + 'inexistente');
        
        var interiores = concurrencia(control, archivoTS);
        ret = TagHtml('div', null, interiores);
    }
    return ret;
}

buscarId = function(Id, control)
{
    if (control.atributos)
        if (control.atributos['id'] == Id)
            return control;
    
    if (control.tagInteriores)
        for (var i in control.tagInteriores)
        {
            var retCon = buscarId(Id,control.tagInteriores[i]);
            if (retCon)
                return retCon;
        }    
    return undefined;
}


hacerCosas = function(control, pagina, archivoTS)
{
    if (control.depende)
    {
        var dep = buscarId(control.depende, pagina);
        var nomFuncionChange = 'cambio_' + control.depende;
        dep.atributos['(change)'] = nomFuncionChange + '()';
        var id = control.atributos['id'];
        var textoFuncion = 'this.' +  id + 's = this.obj' + id  + 'Service.GetBy' + control.depende + '(this.' + Modelo + '.' + control.depende + ');\r\n'
        archivoTS.agregarTextoAFuncion(nomFuncionChange, textoFuncion)
    }
    
    if (control.tagInteriores)
        for (var i in control.tagInteriores)
        {
            var retCon = hacerCosas(control.tagInteriores[i], pagina, archivoTS);
            if (retCon)
                return retCon;
        }    
    return undefined;
}



hacerPaginaHTML = function(control, archivoTS) {
    var ret = hacercontrolHTML(control, archivoTS);
    hacerCosas(ret,ret, archivoTS);
    return ret;

}

module.exports = hacerPaginaHTML;

