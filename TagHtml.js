String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

TagHtml = function(tag, atributos, tagInteriores) {
    if (tagInteriores == undefined)
        tagInteriores = [];
    if (atributos == undefined)
        atributos = null;
        
    var ret = {
        tag: tag,
        tagInteriores: tagInteriores,
        atributos: atributos,
        innerHTML: '',        
        autocierre: true,
        toString: function()
        {
            

            var atributosString = '';
            var rettoString = '';
            for (var c in this.atributos)
            {
                atributosString += " " + c + "='" + this.atributos[c]  + "'"
            }
            

            if (tagInteriores != '')
                for (var l in tagInteriores)
                {
                    if (tagInteriores[l])
                        rettoString += tagInteriores[l].toString();
                    
                }
            
            var ret = "<" + this.tag  + atributosString;
            if ((rettoString + this.innerHTML) == '')
            {
                if (this.autocierre)
                {
                    ret += "/>\r\n"
                }
                else
                {
                    ret += "></" + this.tag +">\r\n"
                }
                
            }
            else
            {
                if (rettoString == "")
                {
                    ret += ">" + this.innerHTML + rettoString   + "</" + this.tag +">\r\n"
                }
                else
                {
                    ret += ">\r\n" + this.innerHTML + rettoString   + "\r\n</" + this.tag +">\r\n"
                }

                
            }
            
             return ret.replaceAll("\r\n\r\n","\r\n");
             ;

        }

    };

    return ret;
}

module.exports = TagHtml;