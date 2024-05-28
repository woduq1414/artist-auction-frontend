export function dateDiffToKor(date: Date | number) {
    const now = new Date();
    if (date instanceof Date) {
        date = date.getTime();
    }else if (typeof date !== 'number') {
        throw new Error('dateDiffToKor: date must be Date or number');
    }else{
        date = date;
    }

    const diff = now.getTime() - date;
    console.log(now.getTime(), date);

    if (diff > 0){
        const sec = Math.floor(diff / 1000);
        if (sec < 60) {
            return '방금 전';
        }
    
        const min = Math.floor(sec / 60);
    
        if (min < 60) {
            return min + '분 전';
        }
    
        const hour = Math.floor(min / 60);
    
        if (hour < 24) {
            return hour + '시간 전';
        }
    
        const day = Math.floor(hour / 24);
    
        if (day < 15) {
            return day + '일 전';
        }
    
        const week = Math.floor(day / 7);
    
        return week + '주 전';
    }else{
        const sec = Math.floor(-diff / 1000);
        if (sec < 60) {
            return '곧';
        }
    
        const min = Math.floor(sec / 60);
    
        if (min < 60) {
            return min + '분 후';
        }
    
        const hour = Math.floor(min / 60);
    
        if (hour < 24) {
            return hour + '시간 후';
        }
    
        const day = Math.floor(hour / 24);
    
        if (day < 15) {
            return day + '일 후';
        }
    
        const week = Math.floor(day / 7);
    
        return week + '주 후';
    }
 

   

}