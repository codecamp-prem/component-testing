# React + Vite + Component Testing

1. Setup Vitest and React Testing library

   - npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

2. Testing form components
   Writing test for user interaction not on implementation
   - onSubmit function is called after validation
   - onSubmit not called, error msg shown after invalid validation
   - Error msg get updates when user change input values after the first submit
