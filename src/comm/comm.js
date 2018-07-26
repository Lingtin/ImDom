import moment from 'moment'

export const TimeMatter = (val,type=0)=>{
    if(!val){return '---';};
    if (type =='date' ) {
        return moment(val).format('YYYY-MM-DD')
    }else if(type == 'time'){
        return moment(val).format('HH:mm:ss')
    }else if(type == 'timer'){
        return moment(val).format('HH:mm')
    }else{
        return moment(val).format('YYYY-MM-DD HH:mm:ss')
    }
}