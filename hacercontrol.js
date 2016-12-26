concurrencia = function(control) {
    var ret = '';
    if (control.control)
        for (var i in control.control)
            ret += hacercontrol(control.control[i]);
    return ret;
}

hacercontrolformulario = function(texto) {
    var ret = '';
    ret += '<div class="form-group">';
    if (texto)
        ret += texto;
    ret += '</div>';
    return ret;
};

hacerlabel = function(valor, texto) {
    return '<label for="' + valor + '">' + texto + ':</label>';
};

hacerinput = function(valor, texto) {
    return '<input type="text" class="form-control"  [(ngModel)]="model.' + valor + '"  [ngModelOptions]="{standalone: true}"  id="' + valor + '">';
}


hacercontrol = function(control) {
    var ret = '';
    if (control.$.tipo)
    {
        if (control.$.tipo == 'formulario')
        {
            ret += '<form>'
            ret += concurrencia(control);
            ret += '</form>';
        }

        if (control.$.tipo == 'texto')
        {
            ret += hacercontrolformulario(hacerlabel(control.$.valor, control.$.descripcion)
                                        + hacerinput(control.$.valor, control.$.descripcion));
        }
    }
    else
    {
        ret += concurrencia(control);
    }
    
    return ret;
}

module.exports = hacercontrol;