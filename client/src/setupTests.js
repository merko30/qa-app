// react-testing-library renders your components to document.body,
// this will ensure they're removed after each test.
import "react-testing-library/cleanup-after-each";
// this adds jest-dom's custom assertions
import "jest-dom/extend-expect";
require("jest-localstorage-mock");

// this is just a little hack to silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
