(function (document) {

    const getWeatherForecastByAddress = async (address) => {
        const url = `${window.location.origin}/weather?search=${address}`;

        const result = await fetch(url);

        const data = await result.json();

        return data;
    };

    const addErrorToForm = function (message) {
        const formElement = document.querySelector('form .input-help');

        formElement.textContent = message;
        formElement.classList.remove('hide');
        formElement.classList.add('show-error');
    };

    const resetForm = function () {
        const formElement = document.querySelector('form .input-help');

        formElement.classList.remove('show-error');
        formElement.classList.add('hide');

        document.querySelector('.weather-results').classList.add('hide');
    }

    const updateWeatherResults = function ({ location, forecastSummary }) {
        const resultElement = document.querySelector('.weather-results');

        resultElement.querySelector('#location').textContent = location;
        resultElement.querySelector('#weather-summary').textContent = forecastSummary;

        resultElement.classList.remove('hide');
    }

    const loading = function (start = true) {
        submitButton = document.querySelector('form button[type=submit]');

        if (start) {
            submitButton.disabled = true;
            submitButton.textContent = 'Loading...';
        } else {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    }

    const form = document.querySelector('form');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const address = document.querySelector('form input').value;

        resetForm();

        if (! address) {
            return addErrorToForm('The location is required');
        }

        if (address.length < 3) {
            return addErrorToForm('The location should contain at least 3 characters.');
        }

        if (address.length > 255) {
            return addErrorToForm('The location should not contain more than 255 characters.')
        }

        loading();
        getWeatherForecastByAddress(address).then(result => {
            loading(false);

            if (! result.status) {
                return addErrorToForm(result.error);
            }

            updateWeatherResults(result.data);
        });
    });

})(window.document);
