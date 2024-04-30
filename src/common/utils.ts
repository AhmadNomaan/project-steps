import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment'

export class Utilities {
    public static UUID(){
        return uuidv4()
    }

    public static currentUTC(){
        return moment.utc().toDate();
    }
}