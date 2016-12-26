import { KeyValue } from './KeyValue'; 
export class ProvinciaService { 
Get() { 
        var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1','Provincia 1');
        ret[ret.length] = new KeyValue('2','Provincia 2');
        ret[ret.length] = new KeyValue('3','Provincia 3');
        return ret;
} 

} 
