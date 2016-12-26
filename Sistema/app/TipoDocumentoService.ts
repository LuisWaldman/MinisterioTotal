import { KeyValue } from './KeyValue'; 
export class TipoDocumentoService { 
Get() { 
        var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1','TipoDocumento 1');
        ret[ret.length] = new KeyValue('2','TipoDocumento 2');
        ret[ret.length] = new KeyValue('3','TipoDocumento 3');
        return ret;
} 

} 
