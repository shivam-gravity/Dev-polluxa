export function validation(value, t) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\+?[0-9]+$/;

  // Fallback function if t is not provided
  const translate = (key) => {
    if (!t) {
      // Fallback to English if no translation function provided
      const fallbacks = {
        "please_enter_your_first_name": "Please enter your first name",
        "please_enter_your_last_name": "Please enter your last name",
        "please_enter_your_email": "Please enter your email",
        "invalid_email_format": "Invalid email format",
        "please_enter_your_phone_number": "Please enter your phone number",
        "phone_number_should_contain_only_numbers": "Phone number should contain only numbers",
        "please_enter_your_message": "Please enter your message",
        "please_enter_your_country": "Please enter your country",
        "please_enter_your_organization": "Please enter your organization",
      };
      return fallbacks[key] || key;
    }
    return t(key);
  };

  const validateField = (fieldName, errorMessage) => {
    if (value[fieldName] === undefined) return;
    if (!value[fieldName]) {
      errors[fieldName] = errorMessage;
    }
  };

  const validateEmail = () => {
    if (value.email === undefined) return;
    if (value.email === "") {
      errors.email = translate("please_enter_your_email");
    } else if (!emailPattern.test(value.email)) {
      errors.email = translate("invalid_email_format");
    }
  };

  const validatePhoneNumber = () => {
    if (value.phoneNumber === undefined) return;
    if (value.phoneNumber === "") {
      errors.phoneNumber = translate("please_enter_your_phone_number");
    } else if (!phonePattern.test(value.phoneNumber)) {
      errors.phoneNumber = translate("phone_number_should_contain_only_numbers");
    }
  };

  validateField("firstName", translate("please_enter_your_first_name"));
  validateField("lastName", translate("please_enter_your_last_name"));
  validateField("message", translate("please_enter_your_message"));
  validateField("country", translate("please_enter_your_country"));
  validateField("organization", translate("please_enter_your_organization"));

  validateEmail();
  validatePhoneNumber();

  return errors;
}