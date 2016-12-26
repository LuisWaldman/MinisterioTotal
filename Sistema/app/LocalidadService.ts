import { KeyValue } from './KeyValue'; 
export class LocalidadService { 
Get() { 
        var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1','Localidad 1');
        ret[ret.length] = new KeyValue('2','Localidad 2');
        ret[ret.length] = new KeyValue('3','Localidad 3');
        return ret;
} 

GetByMunicipio(value: string) { 
		var ret: KeyValue[] = [];
        ret[ret.length] = new KeyValue('1', value + 'Localidad 1');
        ret[ret.length] = new KeyValue('2', value + 'Localidad 2');
        ret[ret.length] = new KeyValue('3', value + 'Localidad 3');
        return ret;
} 

} 
