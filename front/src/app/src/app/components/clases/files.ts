import { Histories } from './histories';
import { Combo } from './combo';

export class Files{


    id:number;
    originalName:string;
    name:string;
    type:string;
    container:string;
    size:number;
    url:string;
    dateUpload:Date;
    principal:boolean;
    description:string;
    comboFK:number;
    historyFK:number;
    combo:Combo;
    history: Histories;

}