import '@testing-library/jest-dom';

// JSDOM doesn't implement scrollTo; suppress the "Not implemented" warning
window.scrollTo = () => {};
