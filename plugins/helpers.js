export default ({ app }, inject) => {
	inject('getData', (array, id, data) => {
		if (id !== null ) {
			let theObject = array.find((element) => element['id'] === id);
			return theObject[data];
		}
	});

	inject('formatDate', (date) => {
		if (date !== null) {
			let theDate = new Date(date);
			return theDate.toLocaleTimeString([], {
				year: '2-digit',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
			});
		}
	});

	inject('formatRun', (run) => {
		if (run !== null) {
		let formated = '';
		run = run.toString().split('').reverse().join('');
		var i = run.length;
		while (i > 0)
			formated +=
				(i % 3 == 0 && i != run.length ? '.' : '') + run.substring(i--, i);
		return formated;
		}
	});
};
