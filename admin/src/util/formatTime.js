import moment from 'moment';

const formatTime = {
    getTime: (time) => {
        return moment(time).format('YYYY/MM/DD');
    }
}

export default formatTime;