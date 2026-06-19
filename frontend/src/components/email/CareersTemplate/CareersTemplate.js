export const CareersTemplate = (body) => {
  const { Name, PhoneNumber, Email } = body;
  return (
    <div>
      <h1>Ollkom Careers Submission Form for {Name}</h1>
      <div>Name: {Name}</div>
      <div>Phone Number: {PhoneNumber}</div>
      <div>Email: {Email}</div>
    </div>
  );
};

export default CareersTemplate;
