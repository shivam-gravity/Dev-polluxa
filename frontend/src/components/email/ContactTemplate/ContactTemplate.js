export const ContactTemplate = (body) => {
  const {
    FirstName,
    LastName,
    PhoneNumber,
    Email,
    Department,
    Organization,
    Message,
  } = body;
  return (
    <div>
      <h1>Ollkom Contact Form for {Department}</h1>
      <div>First Name: {FirstName}</div>
      <div>Last Name: {LastName}</div>
      <div>Phone Number: {PhoneNumber}</div>
      <div>Email: {Email}</div>
      <div>Department: {Department}</div>
      <div>Organization: {Organization}</div>
      <div>Message: {Message}</div>
    </div>
  );
};

export default ContactTemplate;
