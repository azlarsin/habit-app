/**
 * @file Utils
 * @author chencheng20
 * @date 13/11/2017
 */

export const WEEK = [
    'Sun',
    'Mon',
    'Tue',
    'Wen',
    'Thu',
    'Fri',
    'Sat'
];

export const getDatesByWeek = (year = new Date().getFullYear(), month = new Date().getMonth() + 1, date = new Date().getDate()) => {
	month = month - 1;
	let d = new Date(year, month, date),
		day = d.getDay();


	let start = 0 - day;

	d = new Date(d.setDate(start + date));

	let dates = [];
	for(let i = 0;i < 7;i++) {
		dates.push({
			date: d.getDate(),
			fullDate: getDetailDateByDate(d),
			current: isOtherMonth(d, month)
		});

		d = new Date(d.setDate(d.getDate() + 1));
	}

	return dates;
};

export const getDatesByMonth = (year, month) => {
    month = month - 1;
    let d = new Date(year, month),
        day = d.getDay();

    let start = 0 - day;

    d = new Date(d.setDate(start + 1));

    let dates = [];
    for(let i = 0;i < 7 * 6;i++) {
        dates.push({
            date: d.getDate(),
            fullDate: getDetailDateByDate(d),
            current: isOtherMonth(d, month)
        });

        d = new Date(d.setDate(d.getDate() + 1));
    }

    return dates;
};

export const getDetailDateByDate = (d, separator = '-') => {
    if(d instanceof Date) {
        let month = d.getMonth() + 1,
            date = d.getDate();

        month = month < 10 ? '0' + month : month;
        date = date < 10 ? '0' + date : date;

        return `${d.getFullYear()}${separator}${month}${separator}${date}`;
    }

    return null;
};

export const isOtherMonth = (d, month) => {
    return d.getMonth() === month;
};

export const getToday = () => {
    return getDetailDateByDate(new Date);
};

// crate uid
export function uuid() {
	return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
		s4() + "-" + s4() + s4() + s4();
}
function s4() {
	return Math.floor((1 + Math.random()) * 0x10000);
}

// check type
export function is(v, type) {
    if(typeof type === 'function') {
        return v instanceof type && v.constructor === type;
    }

    let t = Object.prototype.toString.call(v).split(' ')[1].slice(0, -1);
    return !type ? t : t.toLowerCase() === type.toLowerCase();
}

export const saveDate = (key, v) => {
    
};
