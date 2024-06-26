import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime)

export const convertToDate = (firebaseTimestamp) => {

    if(!firebaseTimestamp) return ''

    // Extract seconds and nanoseconds from the Timestamp
    const seconds = firebaseTimestamp.seconds;
    const nanoseconds = firebaseTimestamp.nanoseconds;

    // Create a new JavaScript Date object using milliseconds
    // JavaScript Date object works with milliseconds since Unix epoch
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    
    return dayjs(dayjs(milliseconds)).fromNow()
}