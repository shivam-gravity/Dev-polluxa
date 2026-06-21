const FeatureCard = ({ icon, tag, title, description, link_url, color = 'var(--violet)' }) => (
  <a
    href={link_url}
    target="_blank"
    rel="noopener noreferrer"
    className="crm-feat-card"
  >
    <div
      className="crm-feat-icon"
      style={{ background: color + '1a', color }}
    >
      {icon}
    </div>
    <span className="crm-feat-tag" style={{ color }}>{tag}</span>
    <h4 className="crm-feat-title">{title}</h4>
    <p className="crm-feat-desc">{description}</p>
  </a>
);

export default FeatureCard;
