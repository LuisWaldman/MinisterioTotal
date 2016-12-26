import { KeyValue } from './KeyValue'; 
export class MunicipioService { 
Get() { 
        var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1','Municipio 1');
        ret[ret.length] = new KeyValue('2','Municipio 2');
        ret[ret.length] = new KeyValue('3','Municipio 3');
        return ret;
} 

GetByProvincia(value: string) { 
		var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1', value + 'Municipio 1');
        ret[ret.length] = new KeyValue('2', value + 'Municipio 2');
        ret[ret.length] = new KeyValue('3', value + 'Municipio 3');
        return ret;
} 

} 
