const Former = (form, onSubmit) => {
    const getOtherValues = () => {
        const formData = new FormData(form);
		return Array.from(formData.keys()).reduce((values, key) => {
            return {
                ...values,
				[key]: parseInt(formData.get(key)),
                repeat: form.repeat.checked,
			};
		}, {});
	};
    
	form.addEventListener('submit', (e) => {
        e.preventDefault();
        
		if (form.reportValidity()) {
            onSubmit(getOtherValues());
		}
	});
};