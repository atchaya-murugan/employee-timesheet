// Validation Function
function Validation(name, number, email, password) {
  let errors = {};
  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  const number_pattern = /^\d{10}$/;

  if (name.trim() === '') {
      errors.name = 'Name should not be empty';
  }

  if (number.trim() === '') {
      errors.number = "Number shouldn't be empty";
  } else if (!number_pattern.test(number)) {
      errors.number = 'Please enter a valid number';
  }

  if (email.trim() === '') {
      errors.email = "Email shouldn't be empty";
  } else if (!email_pattern.test(email)) {
      errors.email = "Email didn't match the format";
  }

  if (password.trim() === '') {
      errors.password = "Password shouldn't be empty";
  } else if (!password_pattern.test(password)) {
      errors.password = 'atleast 8 characters, uppercase, lowercase, numbers';
  }

  return errors;
}

export default Validation;
