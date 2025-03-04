export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/;
export const receivedPasswordRegex = /^[a-zA-Z0-9]{6}$/;

export const validationMessages = {
  email: {
    required: "Email is required",
    pattern: "Invalid email address"
  },
  password: {
    required: "Password is required",
    receivePassword: "Password must be 6 characters",
    receivePattern: "Invalid Password",
    minLength: "Password must be 8 to 14 characters",
    pattern: "Password must include at least one uppercase letter, one special character, one number, and cannot include spaces",
  }
};
