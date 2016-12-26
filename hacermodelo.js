concurrencia = function(control) {
    var ret = '';
    if (control.control)
        for (var i in control.control)
            ret += hacermodelo(control.control[i]);
    return ret;
}


hacermodelo = function(control) {
    var ret = '';
    if (control.$.tipo)
    {
        if (control.$.tipo == 'formulario')
        {
            
        }

        if (control.$.tipo == 'texto')
        {
        }
    }
    else
    {
        ret += concurrencia(control);
    }    
    return ret;
}

module.exports = hacermodelo;