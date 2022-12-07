// Functions thet gets an input and a error message and write the error message in the input
const writeError = (input, message) => {
    input.setCustomValidity(message);
    input.reportValidity();
};

const clearError = (input) => {
    input.setCustomValidity("");
    input.reportValidity();
};
    

export { writeError, clearError}