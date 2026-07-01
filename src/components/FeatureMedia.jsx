/* Renders a Strapi-editable image (item.image_url, a plain URL pasted from the
   Media Library) when present, falling back to the emoji in item.icon otherwise. */
const FeatureMedia = ({ item, size = 40, rounded = 8, iconFontSize = '2rem', style }) => {
  if (item.image_url) {
    return (
      <img
        src={item.image_url}
        alt={item.title || item.tag || ''}
        loading="lazy"
        style={{ width: size, height: size, objectFit: 'cover', borderRadius: rounded, flexShrink: 0, display: 'block', ...style }}
      />
    );
  }
  return <span style={{ fontSize: iconFontSize, lineHeight: 1, display: 'inline-block', ...style }}>{item.icon}</span>;
};

export default FeatureMedia;
