export const RetailTemplate = (body) => {
  const {
    FirstName,
    PhoneNumber,
    Country,
    BrandName,
    ProductType,
    QualityCertification,
  } = body;
  return (
    <div>
      <h1>Ollkom Contact Form for {Department}</h1>
      <div>First Name: {FirstName}</div>
      <div>Phone Number: {PhoneNumber}</div>
      <div>Country: {Country}</div>
      <div>Brand Name: {BrandName}</div>
      <div>Product Type: {ProductType}</div>
      <div>Quality Certification: {QualityCertification}</div>
    </div>
  );
};

export default RetailTemplate;
