import {TimeMatter} from './comm.js'

const FileterTime = (val)=>{
    return TimeMatter(val,"timer")
}

const FileterDateTime = (val)=>{
    return TimeMatter(val,"000")
}

export default {FileterTime,FileterDateTime}