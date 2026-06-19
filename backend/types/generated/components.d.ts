import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsBrand extends Schema.Component {
  collectionName: 'components_elements_brands';
  info: {
    displayName: 'Brand';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface ElementsBrandsCategory extends Schema.Component {
  collectionName: 'components_elements_brands_categories';
  info: {
    displayName: 'BrandsCategory';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Brand: Attribute.Component<'elements.brand', true>;
  };
}

export interface ElementsCompanyBullets extends Schema.Component {
  collectionName: 'components_elements_company_bullets';
  info: {
    displayName: 'Bullets';
    description: '';
  };
  attributes: {
    Bullet: Attribute.Text;
  };
}

export interface ElementsFeatureBullets extends Schema.Component {
  collectionName: 'components_elements_feature_bullets';
  info: {
    displayName: 'FeatureBullets';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    image: Attribute.Media;
    bullets: Attribute.Component<'elements.company-bullets', true>;
  };
}

export interface ElementsFeatureColumn extends Schema.Component {
  collectionName: 'components_slices_feature_columns';
  info: {
    name: 'FeatureColumn';
    displayName: 'Feature column';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media & Attribute.Required;
  };
}

export interface ElementsFeatureRow extends Schema.Component {
  collectionName: 'components_slices_feature_rows';
  info: {
    name: 'FeatureRow';
    displayName: 'Feature row';
    icon: 'arrows-alt-h';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    media: Attribute.Media & Attribute.Required;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsFeature extends Schema.Component {
  collectionName: 'components_elements_features';
  info: {
    displayName: 'Feature';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media;
    showLink: Attribute.Boolean & Attribute.DefaultTo<false>;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    url: Attribute.String;
    text: Attribute.String;
    MediaHover: Attribute.Media;
  };
}

export interface ElementsFooterSection extends Schema.Component {
  collectionName: 'components_links_footer_sections';
  info: {
    name: 'FooterSection';
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'links.link', true>;
  };
}

export interface ElementsLogos extends Schema.Component {
  collectionName: 'components_elements_logos';
  info: {
    name: 'logos';
    displayName: 'Logos';
    icon: 'apple-alt';
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media;
  };
}

export interface ElementsMetrics extends Schema.Component {
  collectionName: 'components_elements_metrics';
  info: {
    displayName: 'Metrics';
    description: '';
  };
  attributes: {
    metric: Attribute.String;
    description: Attribute.String;
    image: Attribute.Media;
    metricSuffix: Attribute.String;
  };
}

export interface ElementsNotificationBanner extends Schema.Component {
  collectionName: 'components_elements_notification_banners';
  info: {
    name: 'NotificationBanner';
    displayName: 'Notification banner';
    icon: 'exclamation';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['alert', 'info', 'warning']> &
      Attribute.Required;
    heading: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    show: Attribute.Boolean & Attribute.DefaultTo<false>;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsPostItems extends Schema.Component {
  collectionName: 'components_elements_post_items';
  info: {
    displayName: 'PostItems';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Bullets: Attribute.Component<'elements.company-bullets', true>;
    media: Attribute.Component<'shared.media', true>;
  };
}

export interface ElementsPriceFeatureContainer extends Schema.Component {
  collectionName: 'components_elements_price_feature_containers';
  info: {
    displayName: 'PriceFeatureContainer';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    PriceFeatureOptions: Attribute.Component<
      'elements.price-feature-options',
      true
    >;
  };
}

export interface ElementsPriceFeatureOptions extends Schema.Component {
  collectionName: 'components_elements_price_feature_options';
  info: {
    displayName: 'PriceFeatureOptions';
  };
  attributes: {
    option: Attribute.String;
  };
}

export interface ElementsPriceFeatures extends Schema.Component {
  collectionName: 'components_elements_price_features';
  info: {
    displayName: 'PriceFeatures';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    PriceFeatureContainer: Attribute.Component<
      'elements.price-feature-container',
      true
    >;
  };
}

export interface ElementsPriceTransaction extends Schema.Component {
  collectionName: 'components_elements_price_transactions';
  info: {
    displayName: 'PriceTransaction';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    TransactionFee: Attribute.Component<'elements.transaction-fee', true>;
  };
}

export interface ElementsPricingFeatureGroup extends Schema.Component {
  collectionName: 'components_elements_pricing_feature_groups';
  info: {
    displayName: 'Pricing Feature Group';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    items: Attribute.Component<'elements.pricing-feature', true> &
      Attribute.Required;
  };
}

export interface ElementsPricingFeatureItem extends Schema.Component {
  collectionName: 'components_elements_pricing_feature_items';
  info: {
    displayName: 'Pricing Feature Item';
    description: 'Individual feature item with icon and enabled/disabled state';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
    isEnabled: Attribute.Boolean & Attribute.DefaultTo<true>;
    icon: Attribute.Media;
    iconType: Attribute.Enumeration<
      ['checkmark-primary', 'checkmark-white', 'cross-disabled']
    > &
      Attribute.DefaultTo<'checkmark-primary'>;
  };
}

export interface ElementsPricingFeature extends Schema.Component {
  collectionName: 'components_elements_pricing_features';
  info: {
    displayName: 'Pricing Feature';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
  };
}

export interface ElementsService extends Schema.Component {
  collectionName: 'components_elements_plans';
  info: {
    name: 'service';
    displayName: 'Services plan';
    icon: 'search-dollar';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    isRecommended: Attribute.Boolean;
    icon: Attribute.Media;
    video: Attribute.Media;
    Button: Attribute.Component<'links.button-link'>;
    subheader: Attribute.Text;
  };
}

export interface ElementsTechTabs extends Schema.Component {
  collectionName: 'components_elements_tech_tabs';
  info: {
    displayName: 'TechTabs';
  };
  attributes: {
    title: Attribute.String;
    feature: Attribute.Component<'elements.feature', true>;
  };
}

export interface ElementsTestimonial extends Schema.Component {
  collectionName: 'components_slices_clients';
  info: {
    name: 'Client';
    displayName: 'Testimonial';
    icon: 'user-check';
    description: '';
  };
  attributes: {
    picture: Attribute.Media & Attribute.Required;
    paragraph: Attribute.Text;
    text: Attribute.Text;
    authorName: Attribute.String;
    authorTitle: Attribute.Text;
  };
}

export interface ElementsTransactionFee extends Schema.Component {
  collectionName: 'components_elements_transaction_fees';
  info: {
    displayName: 'Transaction Fee';
    description: 'Transaction fee information';
  };
  attributes: {
    label: Attribute.String;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface LayoutAddressDetails extends Schema.Component {
  collectionName: 'components_layout_address_details';
  info: {
    displayName: 'AddressDetails';
  };
  attributes: {
    name: Attribute.String;
    country: Attribute.String;
    address: Attribute.Text;
    mapUrl: Attribute.Text;
  };
}

export interface LayoutFooterMenu extends Schema.Component {
  collectionName: 'components_layout_footer_menus';
  info: {
    displayName: 'FooterMenu';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    FooterLinks: Attribute.Component<'links.link', true>;
    slug: Attribute.String;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    footerLogo: Attribute.Component<'layout.logo'>;
    menuLinks: Attribute.Component<'links.link', true>;
    legalLinks: Attribute.Component<'links.link', true>;
    socialLinks: Attribute.Component<'links.social-link', true>;
    categories: Attribute.Relation<
      'layout.footer',
      'oneToMany',
      'api::category.category'
    >;
    FooterMenu: Attribute.Component<'layout.footer-menu', true>;
    button: Attribute.Component<'links.button-link'>;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logoImg: Attribute.Media & Attribute.Required;
    logoText: Attribute.String;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    name: 'Navbar';
    displayName: 'Navbar';
    icon: 'map-signs';
    description: '';
  };
  attributes: {
    links: Attribute.Component<'links.link', true>;
    button: Attribute.Component<'links.button-link'>;
    navbarLogo: Attribute.Component<'layout.logo'>;
    navbarLogoMobile: Attribute.Component<'layout.logo'>;
  };
}

export interface LayoutPageHeader extends Schema.Component {
  collectionName: 'components_layout_page_headers';
  info: {
    displayName: 'PageHeader';
    icon: 'apps';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.Text;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    FeaturedProducts: Attribute.Component<'sections.featured-products'>;
  };
}

export interface LayoutSubMenu extends Schema.Component {
  collectionName: 'components_layout_sub_menus';
  info: {
    displayName: 'SubMenu';
  };
  attributes: {
    button: Attribute.Component<'links.button-link'>;
    subMenuLogo: Attribute.Component<'layout.logo'>;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: 'components_links_buttons';
  info: {
    name: 'Button-link';
    displayName: 'Button link';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    type: Attribute.Enumeration<
      [
        'primary',
        'secondary',
        'subsecondary',
        'gradient',
        'download',
        'playstore',
        'pricing-filled',
        'pricing-outline',
        'recommended-blogs',
        'download-macos',
        'download-windows',
        'explore'
      ]
    >;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: 'components_links_simple_buttons';
  info: {
    name: 'Button';
    displayName: 'Button';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    name: 'Link';
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean;
  };
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
    social: Attribute.Enumeration<
      ['YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'LINKEDIN']
    >;
    icon: Attribute.Media;
  };
}

export interface MenuDropdown extends Schema.Component {
  collectionName: 'components_menu_dropdowns';
  info: {
    displayName: 'dropdown';
    icon: 'arrowDown';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    navigations: Attribute.Relation<
      'menu.dropdown',
      'oneToMany',
      'api::navigation.navigation'
    >;
    exploreSection: Attribute.Component<'menu.explore-section'>;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    media: Attribute.Component<'shared.media'>;
    subtitle: Attribute.String;
    footNote: Attribute.Text;
  };
}

export interface MenuExploreSection extends Schema.Component {
  collectionName: 'components_menu_explore_sections';
  info: {
    displayName: 'explore-section';
    icon: 'compass';
    description: '';
  };
  attributes: {
    sectionTitle: Attribute.String;
    image: Attribute.Component<'shared.media', true>;
    heading: Attribute.String;
    description: Attribute.Text;
    button: Attribute.Component<'links.button-link'>;
  };
}

export interface MenuLink extends Schema.Component {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface MenuMenuButton extends Schema.Component {
  collectionName: 'components_menu_menu_buttons';
  info: {
    displayName: 'MenuButton';
    icon: 'cursor';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface MenuMenuLink extends Schema.Component {
  collectionName: 'components_menu_menu_links';
  info: {
    displayName: 'MenuLink';
    icon: 'link';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
  };
}

export interface MenuNavlinks extends Schema.Component {
  collectionName: 'components_menu_navlinks';
  info: {
    displayName: 'Navlinks';
    icon: 'link';
    description: 'Navigation links with title, url, subtitle, and sub links';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    subtitle: Attribute.String;
    subLinks: Attribute.Component<'menu.sub-link-item', true>;
  };
}

export interface MenuSubLinkItem extends Schema.Component {
  collectionName: 'components_menu_sub_link_items';
  info: {
    displayName: 'Sub Link Item';
    icon: 'link';
    description: 'Sub link item with name, url, description, and icon';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    name: 'Metadata';
    displayName: 'Metadata';
    icon: 'robot';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsAboutUs extends Schema.Component {
  collectionName: 'components_sections_aboutuses';
  info: {
    displayName: 'AboutUs';
    icon: 'chartCircle';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    video: Attribute.Component<'sections.large-video'>;
  };
}

export interface SectionsAddressSection extends Schema.Component {
  collectionName: 'components_sections_address_sections';
  info: {
    displayName: 'Address Section';
    description: 'A section to display address details';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    addressDetails: Attribute.Component<'layout.address-details', true>;
  };
}

export interface SectionsAgentlist extends Schema.Component {
  collectionName: 'components_sections_agentlists';
  info: {
    displayName: 'Agentlist';
    description: '';
  };
  attributes: {
    tittle: Attribute.String;
    subtittle: Attribute.String;
    image: Attribute.Media;
    heading: Attribute.String;
    bulletspoint: Attribute.Component<'elements.company-bullets', true>;
    url: Attribute.String;
    text: Attribute.String;
    newTabs: Attribute.Boolean;
  };
}

export interface SectionsBannerSlider extends Schema.Component {
  collectionName: 'components_sections_banner_sliders';
  info: {
    displayName: 'BannerSlider';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Slides: Attribute.Component<'shared.slider'>;
  };
}

export interface SectionsBottomActions extends Schema.Component {
  collectionName: 'components_slices_bottom_actions';
  info: {
    name: 'BottomActions';
    displayName: 'Bottom actions';
    icon: 'angle-double-right';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    buttons: Attribute.Component<'links.button-link', true>;
    description: Attribute.Text;
  };
}

export interface SectionsCareerForm extends Schema.Component {
  collectionName: 'components_sections_career_forms';
  info: {
    displayName: 'Career Form';
    icon: 'crown';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    CareersEmail: Attribute.String;
  };
}

export interface SectionsCeoMessage extends Schema.Component {
  collectionName: 'components_sections_ceo_messages';
  info: {
    displayName: 'CEO Message';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    paragraph1: Attribute.Text;
    paragraph2: Attribute.Text;
    name: Attribute.String;
    designation: Attribute.String;
    signature: Attribute.Media;
  };
}

export interface SectionsClients extends Schema.Component {
  collectionName: 'components_sections_clients';
  info: {
    displayName: 'Clients';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    Client: Attribute.Component<'elements.feature', true>;
    subtitle: Attribute.String;
    Button: Attribute.Component<'links.button-link'>;
    enable: Attribute.Boolean;
  };
}

export interface SectionsCollections extends Schema.Component {
  collectionName: 'components_sections_collections';
  info: {
    displayName: 'Collections';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Card: Attribute.Component<'shared.card', true>;
  };
}

export interface SectionsCompany extends Schema.Component {
  collectionName: 'components_sections_companies';
  info: {
    displayName: 'Company';
    icon: 'cube';
    description: '';
  };
  attributes: {
    description: Attribute.Text;
    Bullets: Attribute.Component<'elements.company-bullets', true>;
    title: Attribute.String;
    media: Attribute.Component<'shared.media'>;
    enable: Attribute.Boolean;
  };
}

export interface SectionsContactForm extends Schema.Component {
  collectionName: 'components_sections_contact_forms';
  info: {
    displayName: 'Contact Form';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    title: Attribute.String;
    ContactDetails: Attribute.Component<'elements.feature', true>;
    Button: Attribute.Component<'links.button'>;
    media: Attribute.Component<'shared.media'>;
    marketingEmail: Attribute.String;
    logisticsEmail: Attribute.String;
    retailEmail: Attribute.String;
    enable: Attribute.Boolean;
  };
}

export interface SectionsContentWithImage extends Schema.Component {
  collectionName: 'components_sections_content_with_images';
  info: {
    displayName: 'Content with Image';
    description: 'Two-column section with heading, title, description and image (left or right position)';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media;
    imagePosition: Attribute.Enumeration<['left', 'right']> &
      Attribute.DefaultTo<'right'>;
  };
}

export interface SectionsCrmFeatures extends Schema.Component {
  collectionName: 'components_layout_crm_features';
  info: {
    displayName: 'CRM Features';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
    title: Attribute.Text;
    variant: Attribute.Enumeration<
      ['primary', 'secondary', 'subSecondary', 'card', 'defaultCard']
    >;
    bgVariant: Attribute.Enumeration<['primary', 'secondary']>;
    columns: Attribute.Enumeration<
      ['threeColumn', 'fourColumn', 'fiveColumn', 'sixColumn']
    >;
    bgColor: Attribute.String;
    Button: Attribute.Component<'links.button-link'>;
    showFilter: Attribute.Boolean & Attribute.DefaultTo<false>;
    enable: Attribute.Boolean;
    titleColor: Attribute.String;
  };
}

export interface SectionsCrmPricingPlans extends Schema.Component {
  collectionName: 'components_sections_crm_pricing_plans';
  info: {
    displayName: 'CRM Pricing Plans';
    description: 'Full-featured CRM pricing section with monthly/yearly toggle and three-tier plans';
  };
  attributes: {
    heading: Attribute.String & Attribute.DefaultTo<'The Future of CRM Today'>;
    title: Attribute.String &
      Attribute.DefaultTo<'Transparent Pricing. Dedicated Support. Tailored Implementation.'>;
    subtitle: Attribute.String &
      Attribute.DefaultTo<"Choose a plan that's right for you">;
    showPaymentToggle: Attribute.Boolean & Attribute.DefaultTo<true>;
    monthlyLabel: Attribute.String & Attribute.DefaultTo<'Pay Monthly'>;
    yearlyLabel: Attribute.String & Attribute.DefaultTo<'Pay Yearly'>;
    savingBadgeText: Attribute.String & Attribute.DefaultTo<'Save upto 28%'>;
    monthlyPricing: Attribute.Component<'shared.pricing-tier', true>;
    yearlyPricing: Attribute.Component<'shared.pricing-tier', true>;
    enable: Attribute.Boolean & Attribute.DefaultTo<true>;
  };
}

export interface SectionsCta extends Schema.Component {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    bgColor: Attribute.String;
  };
}

export interface SectionsEnhancedPricingPlans extends Schema.Component {
  collectionName: 'components_sections_enhanced_pricing_plans';
  info: {
    displayName: 'Enhanced Pricing Plans';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    PriceOptions: Attribute.Component<'shared.price-options', true>;
  };
}

export interface SectionsEventActions extends Schema.Component {
  collectionName: 'components_sections_event_actions';
  info: {
    displayName: 'EventActions';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    socialLinks: Attribute.Component<'links.social-link', true>;
  };
}

export interface SectionsEventGalleryAndVideo extends Schema.Component {
  collectionName: 'components_sections_event_gallery_and_videos';
  info: {
    displayName: 'EventGalleryAndVideo';
    description: '';
  };
  attributes: {
    media: Attribute.Component<'shared.media', true>;
    video: Attribute.Component<'shared.video-embed'>;
    header: Attribute.Component<'sections.heading'>;
  };
}

export interface SectionsEventInformation extends Schema.Component {
  collectionName: 'components_sections_event_informations';
  info: {
    displayName: 'EventInformation';
  };
  attributes: {
    PostInformation: Attribute.Component<'sections.post-information', true>;
    columns: Attribute.Enumeration<['twoColumn', 'threeColumn', 'fourColumn']> &
      Attribute.DefaultTo<'twoColumn'>;
  };
}

export interface SectionsFaq extends Schema.Component {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'FAQ';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    FaqOption: Attribute.Component<'shared.faq-option', true>;
  };
}

export interface SectionsFavoriteCategories extends Schema.Component {
  collectionName: 'components_sections_favorite_categories';
  info: {
    displayName: 'Favorite Categories';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.String;
    link: Attribute.Component<'links.link'>;
    Card: Attribute.Component<'shared.card', true>;
  };
}

export interface SectionsFeatureList extends Schema.Component {
  collectionName: 'components_layout_feature_lists';
  info: {
    displayName: 'FeatureList';
    description: '';
  };
  attributes: {
    features: Attribute.Component<'elements.feature-bullets', true>;
  };
}

export interface SectionsFeaturedProducts extends Schema.Component {
  collectionName: 'components_sections_featured_products';
  info: {
    displayName: 'Featured Products';
  };
  attributes: {
    title: Attribute.String;
    ProductItem: Attribute.Component<'shared.product-item', true>;
  };
}

export interface SectionsFeatures extends Schema.Component {
  collectionName: 'components_layout_features';
  info: {
    displayName: 'Features';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
    title: Attribute.Text;
    variant: Attribute.Enumeration<
      ['primary', 'secondary', 'subSecondary', 'card', 'defaultCard']
    >;
    bgVariant: Attribute.Enumeration<['primary', 'secondary']>;
    columns: Attribute.Enumeration<
      ['threeColumn', 'fourColumn', 'fiveColumn', 'sixColumn']
    >;
    bgColor: Attribute.String;
    Button: Attribute.Component<'links.button-link'>;
    showFilter: Attribute.Boolean & Attribute.DefaultTo<false>;
    enable: Attribute.Boolean;
    titleColor: Attribute.String;
  };
}

export interface SectionsFooterMenuShop extends Schema.Component {
  collectionName: 'components_sections_footer_menu_shops';
  info: {
    displayName: 'Footer Menu Shop';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    FooterLinks: Attribute.Component<'links.link', true>;
  };
}

export interface SectionsFooterShop extends Schema.Component {
  collectionName: 'components_sections_footers_shops';
  info: {
    displayName: 'Footer Shop';
  };
  attributes: {
    FooterMenuShop: Attribute.Component<'sections.footer-menu-shop', true>;
    FooterLogo: Attribute.Component<'layout.logo'>;
    SocialLinks: Attribute.Component<'links.social-link', true>;
    copyright: Attribute.String;
    address: Attribute.Text;
    phone: Attribute.String;
    email: Attribute.String;
  };
}

export interface SectionsHeaderLinksShop extends Schema.Component {
  collectionName: 'components_sections_header_links_shops';
  info: {
    displayName: 'Header Links Shop';
    description: '';
  };
  attributes: {
    Links: Attribute.Component<'links.link', true> & Attribute.Required;
  };
}

export interface SectionsHeaderShop extends Schema.Component {
  collectionName: 'components_sections_headers_shops';
  info: {
    displayName: 'Header Shop';
  };
  attributes: {
    HeaderLinks: Attribute.Component<'sections.header-links-shop'>;
    HeaderLogo: Attribute.Component<'layout.logo'>;
  };
}

export interface SectionsHeading extends Schema.Component {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
  };
}

export interface SectionsHeroShop extends Schema.Component {
  collectionName: 'components_sections_hero_shops';
  info: {
    displayName: 'Hero Shop';
    description: '';
  };
  attributes: {
    BannerSlide: Attribute.Component<'shared.banner-slide', true>;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_slices_heroes';
  info: {
    name: 'Hero';
    displayName: 'Hero';
    icon: 'heading';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    picture: Attribute.Media;
    buttons: Attribute.Component<'links.button-link', true>;
    pictureMobile: Attribute.Media;
    subHeading: Attribute.String;
    bgColor: Attribute.String;
    video: Attribute.String;
  };
}

export interface SectionsHomepageStatistics extends Schema.Component {
  collectionName: 'components_sections_homepage_statistics';
  info: {
    displayName: 'HomepageStatistics';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    clients: Attribute.Component<'elements.feature', true>;
    facts: Attribute.Component<'elements.feature', true>;
    bgColor: Attribute.String;
  };
}

export interface SectionsImplementationBundles extends Schema.Component {
  collectionName: 'components_sections_implementation_bundles';
  info: {
    displayName: 'Implementation Bundles';
    description: 'Professional implementation/onboarding bundles section with pricing tiers';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
    bundles: Attribute.Component<'shared.pricing-tier', true>;
  };
}

export interface SectionsIndustries extends Schema.Component {
  collectionName: 'components_sections_industries';
  info: {
    displayName: 'Industries';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    industries: Attribute.Relation<
      'sections.industries',
      'oneToMany',
      'api::industry.industry'
    >;
  };
}

export interface SectionsInfoGrid extends Schema.Component {
  collectionName: 'components_sections_info_grids';
  info: {
    displayName: 'Info Grid';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    service: Attribute.Component<'elements.service', true>;
  };
}

export interface SectionsInnovations extends Schema.Component {
  collectionName: 'components_sections_innovations';
  info: {
    displayName: 'Innovations';
  };
  attributes: {
    feature: Attribute.Component<'elements.feature', true>;
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionsInternalContactForm extends Schema.Component {
  collectionName: 'components_sections_internal_contact_forms';
  info: {
    displayName: 'Internal Contact Form';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    ContactDetails: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsKeyStats extends Schema.Component {
  collectionName: 'components_sections_key_stats';
  info: {
    displayName: 'KeyStats';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    keys: Attribute.Component<'shared.faq-option', true>;
    variant: Attribute.Enumeration<['vertical', 'horizontal']> &
      Attribute.DefaultTo<'vertical'>;
  };
}

export interface SectionsLargeVideo extends Schema.Component {
  collectionName: 'components_slices_large_videos';
  info: {
    name: 'LargeVideo';
    displayName: 'Large video';
    icon: 'play-circle';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    video: Attribute.Media;
    poster: Attribute.Media;
  };
}

export interface SectionsLeadForm extends Schema.Component {
  collectionName: 'components_sections_lead_forms';
  info: {
    name: 'Lead form';
    displayName: 'Lead form';
    icon: 'at';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    emailPlaceholder: Attribute.String;
    submitButton: Attribute.Component<'links.button'>;
    location: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionsLevel1 extends Schema.Component {
  collectionName: 'components_sections_level_1s';
  info: {
    displayName: 'Level 1';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    Level2: Attribute.Component<'sections.level-2', true>;
  };
}

export interface SectionsLevel2 extends Schema.Component {
  collectionName: 'components_sections_level_2s';
  info: {
    displayName: 'Level 2';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    Level3: Attribute.Component<'sections.level-3', true>;
  };
}

export interface SectionsLevel3 extends Schema.Component {
  collectionName: 'components_sections_level_3s';
  info: {
    displayName: 'Level 3';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    active: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
  };
}

export interface SectionsLogisticsPageForms extends Schema.Component {
  collectionName: 'components_sections_logistics_page_forms';
  info: {
    displayName: 'LogisticsPageForms';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    enable: Attribute.Boolean;
  };
}

export interface SectionsLogistics extends Schema.Component {
  collectionName: 'components_sections_logistics';
  info: {
    displayName: 'Logistics';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    product_collections: Attribute.Relation<
      'sections.logistics',
      'oneToMany',
      'api::logistic.logistic'
    >;
    description: Attribute.Text;
    bgColor: Attribute.String;
    media: Attribute.Component<'shared.media'>;
    subtitle: Attribute.Text;
  };
}

export interface SectionsMarketing extends Schema.Component {
  collectionName: 'components_sections_marketings';
  info: {
    displayName: 'Marketing';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    product_collections: Attribute.Relation<
      'sections.marketing',
      'oneToMany',
      'api::marketing.marketing'
    >;
    bgColor: Attribute.String;
    subtitle: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface SectionsOurBrands extends Schema.Component {
  collectionName: 'components_sections_our_brands';
  info: {
    displayName: 'OurBrands';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    brands: Attribute.Component<'elements.feature', true>;
    variant: Attribute.Enumeration<['primary', 'secondary']> &
      Attribute.DefaultTo<'primary'>;
    bgColor: Attribute.String;
  };
}

export interface SectionsOurServices extends Schema.Component {
  collectionName: 'components_sections_our_services';
  info: {
    displayName: 'Our Services';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Card: Attribute.Component<'shared.card', true>;
  };
}

export interface SectionsOurTeam extends Schema.Component {
  collectionName: 'components_sections_our_teams';
  info: {
    displayName: 'Our Team';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsPackage extends Schema.Component {
  collectionName: 'components_sections_packages';
  info: {
    displayName: 'Package';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    bgColor: Attribute.String;
    enable: Attribute.Boolean;
    PackageOption: Attribute.Component<'shared.package-option', true>;
  };
}

export interface SectionsPartnerCategory extends Schema.Component {
  collectionName: 'components_sections_partner_categories';
  info: {
    displayName: 'Partner Category';
    icon: 'apps';
    description: '';
  };
  attributes: {
    categoryName: Attribute.String & Attribute.Required;
    partners: Attribute.Component<'shared.partner-logo', true> &
      Attribute.Required;
  };
}

export interface SectionsPartners extends Schema.Component {
  collectionName: 'components_sections_partners';
  info: {
    displayName: 'Partners';
    icon: 'command';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    partnerCategories: Attribute.Component<'sections.partner-category', true>;
  };
}

export interface SectionsPlatform extends Schema.Component {
  collectionName: 'components_sections_platforms';
  info: {
    displayName: 'Platform';
    description: '';
  };
  attributes: {
    Heading: Attribute.Component<'sections.heading'>;
    Button: Attribute.Component<'links.button-link', true>;
    PlatformList: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsPostInformation extends Schema.Component {
  collectionName: 'components_sections_post_informations';
  info: {
    displayName: 'PostInformation';
    description: '';
  };
  attributes: {
    header: Attribute.Component<'sections.heading'>;
    Features: Attribute.Component<'elements.post-items', true>;
    columns: Attribute.Enumeration<['threeColumns', 'fourColumns']>;
  };
}

export interface SectionsPowerUpAddons extends Schema.Component {
  collectionName: 'components_sections_power_up_addons';
  info: {
    displayName: 'Power-Up Add-Ons';
    description: 'Add-ons section with integration cards showing pricing and features';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    addOnCards: Attribute.Component<'shared.addon-card', true>;
  };
}

export interface SectionsPricingForm extends Schema.Component {
  collectionName: 'components_sections_pricing_forms';
  info: {
    displayName: 'PricingForm';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    subHeading: Attribute.String;
    description: Attribute.Text;
    buttons: Attribute.Component<'links.button-link'>;
    Bullets: Attribute.Component<'elements.company-bullets', true>;
    FormDetails: Attribute.Component<'elements.feature'>;
  };
}

export interface SectionsPricingPlans extends Schema.Component {
  collectionName: 'components_sections_pricing_plans';
  info: {
    displayName: 'Pricing Plans';
    description: 'Pricing plans section';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String;
    pricingTiers: Attribute.Component<'shared.pricing-tier', true>;
  };
}

export interface SectionsRetailApplicationForm extends Schema.Component {
  collectionName: 'components_sections_retail_application_forms';
  info: {
    displayName: 'RetailApplicationForm';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface SectionsRetail extends Schema.Component {
  collectionName: 'components_sections_retails';
  info: {
    displayName: 'Retail';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    product_collections: Attribute.Relation<
      'sections.retail',
      'oneToMany',
      'api::retail.retail'
    >;
    bgColor: Attribute.String;
    subtitle: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: 'components_sections_rich_texts';
  info: {
    name: 'RichText';
    displayName: 'Rich text';
    icon: 'text-height';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsRoiSection extends Schema.Component {
  collectionName: 'components_sections_roi_sections';
  info: {
    displayName: 'ROI Section';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    KPIS: Attribute.Component<'shared.kpis', true>;
    BrandAchievements: Attribute.Component<'shared.kpis', true>;
  };
}

export interface SectionsScheduleDemo extends Schema.Component {
  collectionName: 'components_sections_schedule_demos';
  info: {
    displayName: 'Schedule Demo';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    calendlyDataUrl: Attribute.String;
  };
}

export interface SectionsServiceTabs extends Schema.Component {
  collectionName: 'components_sections_service_tabs';
  info: {
    displayName: 'Service Tabs';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    heading: Attribute.String;
    services: Attribute.Component<'shared.services', true>;
  };
}

export interface SectionsServices extends Schema.Component {
  collectionName: 'components_sections_pricings';
  info: {
    name: 'Services';
    displayName: 'Featured Services';
    icon: 'dollar-sign';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    service: Attribute.Component<'elements.service', true>;
    heading: Attribute.String;
    description: Attribute.Text;
    variant: Attribute.Enumeration<['primary', 'secondary', 'tertiary']>;
    columns: Attribute.Enumeration<['threeColumn', 'fourColumn']> &
      Attribute.DefaultTo<'threeColumn'>;
  };
}

export interface SectionsSpecialCategories extends Schema.Component {
  collectionName: 'components_sections_special_categories';
  info: {
    displayName: 'Special Categories';
  };
  attributes: {
    Card: Attribute.Component<'shared.card', true>;
  };
}

export interface SectionsSuccessStories extends Schema.Component {
  collectionName: 'components_sections_success_stories';
  info: {
    displayName: 'Success Stories';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    StoryItem: Attribute.Component<'shared.story-item', true>;
  };
}

export interface SectionsTechExpertise extends Schema.Component {
  collectionName: 'components_sections_tech_expertises';
  info: {
    displayName: 'TechExpertise';
    description: '';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String;
    TechTabs: Attribute.Component<'elements.tech-tabs', true>;
  };
}

export interface SectionsTechProducts extends Schema.Component {
  collectionName: 'components_sections_tech_products';
  info: {
    displayName: 'TechProducts';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    bgColor: Attribute.String;
    variant: Attribute.Enumeration<['primary', 'secondary']> &
      Attribute.DefaultTo<'primary'>;
    Button: Attribute.Component<'links.button-link'>;
    Features: Attribute.Component<'sections.features', true>;
  };
}

export interface SectionsTestimonialsGroup extends Schema.Component {
  collectionName: 'components_slices_testimonials_groups';
  info: {
    name: 'TestimonialsGroup';
    displayName: 'Testimonials group';
    icon: 'user-friends';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Testimonial: Attribute.Component<'elements.testimonial', true>;
  };
}

export interface SectionsTestimonialsShop extends Schema.Component {
  collectionName: 'components_sections_testimonials_shop';
  info: {
    displayName: 'Testimonials Shop';
    description: '';
  };
  attributes: {
    Testimonial: Attribute.Component<'elements.testimonial', true>;
  };
}

export interface SectionsZigzagCards extends Schema.Component {
  collectionName: 'components_sections_zigzag_cards';
  info: {
    displayName: 'ZigzagCards';
  };
  attributes: {
    title: Attribute.String;
    service: Attribute.Component<'elements.service', true>;
  };
}

export interface SharedAddonCard extends Schema.Component {
  collectionName: 'components_shared_addon_cards';
  info: {
    displayName: 'Add-On Card';
    description: 'Individual add-on card with icon, title, description, price and CTA';
  };
  attributes: {
    icon: Attribute.Media;
    iconBackgroundColor: Attribute.String;
    title: Attribute.String & Attribute.Required;
    subtitle: Attribute.String;
    description: Attribute.Text;
    price: Attribute.String & Attribute.Required;
    currency: Attribute.String & Attribute.DefaultTo<'$'>;
    priceLabel: Attribute.String & Attribute.DefaultTo<'One-time setup'>;
    button: Attribute.Component<'links.button-link'>;
  };
}

export interface SharedAgentCard extends Schema.Component {
  collectionName: 'components_shared_agent_cards';
  info: {
    displayName: 'Agent-card';
  };
  attributes: {
    tittle: Attribute.String;
    subtittle: Attribute.Text;
    agent: Attribute.Component<'sections.agentlist', true>;
  };
}

export interface SharedBannerSlide extends Schema.Component {
  collectionName: 'components_shared_banner_slides';
  info: {
    displayName: 'BannerSlide';
    description: '';
  };
  attributes: {
    desktopMedia: Attribute.Component<'shared.media'> & Attribute.Required;
    mobileMedia: Attribute.Component<'shared.media'> & Attribute.Required;
    title: Attribute.String;
    link: Attribute.Component<'links.link'>;
  };
}

export interface SharedCard extends Schema.Component {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Card';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    media: Attribute.Media;
    subText: Attribute.String;
  };
}

export interface SharedFaqOption extends Schema.Component {
  collectionName: 'components_shared_faq_options';
  info: {
    displayName: 'faqOption';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface SharedImages extends Schema.Component {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Images';
    icon: 'file-image';
    description: 'Legacy stub - metadata for orphaned database references';
  };
  attributes: {
    files: Attribute.Media;
  };
}

export interface SharedKpis extends Schema.Component {
  collectionName: 'components_elements_kpis';
  info: {
    displayName: 'KPIS';
    description: '';
  };
  attributes: {
    description: Attribute.String;
    KPI: Attribute.Component<'elements.metrics', true>;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
    description: '';
  };
  attributes: {
    file: Attribute.Media;
  };
}

export interface SharedPackageOption extends Schema.Component {
  collectionName: 'components_shared_package_options';
  info: {
    displayName: 'PackageOption';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    PackageRow: Attribute.Component<'shared.package-row', true>;
    Button: Attribute.Component<'links.button-link'>;
  };
}

export interface SharedPackageRow extends Schema.Component {
  collectionName: 'components_shared_package_rows';
  info: {
    displayName: 'PackageRow';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SharedPartnerLogo extends Schema.Component {
  collectionName: 'components_shared_partner_logos';
  info: {
    displayName: 'Partner Logo';
    icon: 'picture';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    logo: Attribute.Media & Attribute.Required;
    website: Attribute.String;
  };
}

export interface SharedPriceOptions extends Schema.Component {
  collectionName: 'components_shared_price_options';
  info: {
    displayName: 'PriceOptions';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    shortDesc: Attribute.String;
    price: Attribute.String;
    billingCycle: Attribute.String;
    billingNote: Attribute.String;
    currency: Attribute.String;
    button: Attribute.Component<'links.button-link'>;
    PriceFeatures: Attribute.Component<'elements.price-features'>;
    PriceTransaction: Attribute.Component<'elements.price-transaction'>;
  };
}

export interface SharedPricingTier extends Schema.Component {
  collectionName: 'components_shared_pricing_tiers';
  info: {
    displayName: 'Pricing Tier';
    description: 'Individual pricing plan card with features, price, and CTA';
  };
  attributes: {
    planName: Attribute.String & Attribute.Required;
    planDescription: Attribute.Text & Attribute.Required;
    price: Attribute.String & Attribute.Required;
    currency: Attribute.String & Attribute.DefaultTo<'$'>;
    billingCycle: Attribute.String & Attribute.DefaultTo<'/ Month'>;
    button: Attribute.Component<'links.button-link'> & Attribute.Required;
    features: Attribute.Component<'elements.pricing-feature-item', true>;
    isFeatured: Attribute.Boolean & Attribute.DefaultTo<false>;
    featuredBadgeText: Attribute.String & Attribute.DefaultTo<'Most Popular'>;
    cardStyle: Attribute.Enumeration<
      ['glass', 'solid-primary', 'solid-white']
    > &
      Attribute.DefaultTo<'glass'>;
  };
}

export interface SharedProductItem extends Schema.Component {
  collectionName: 'components_shared_product_items';
  info: {
    displayName: 'ProductItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    url: Attribute.String;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface SharedRecommendedBlogs extends Schema.Component {
  collectionName: 'components_shared_recommended_blogs';
  info: {
    displayName: 'Recommended Blogs';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    media: Attribute.Media;
    buttons: Attribute.Component<'links.button-link', true>;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    content: Attribute.Blocks;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
  };
}

export interface SharedServices extends Schema.Component {
  collectionName: 'components_shared_services';
  info: {
    displayName: 'services';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    picture: Attribute.Media;
    clientLogo: Attribute.Component<'shared.media', true>;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Attribute.Media;
  };
}

export interface SharedStoryItem extends Schema.Component {
  collectionName: 'components_shared_story_items';
  info: {
    displayName: 'StoryItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    contenttype: Attribute.Enumeration<['caseStudy']>;
    url: Attribute.String;
    logo: Attribute.Component<'shared.media'>;
  };
}

export interface SharedVideoEmbed extends Schema.Component {
  collectionName: 'components_sections_video_embeds';
  info: {
    displayName: 'Video Embed';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.brand': ElementsBrand;
      'elements.brands-category': ElementsBrandsCategory;
      'elements.company-bullets': ElementsCompanyBullets;
      'elements.feature-bullets': ElementsFeatureBullets;
      'elements.feature-column': ElementsFeatureColumn;
      'elements.feature-row': ElementsFeatureRow;
      'elements.feature': ElementsFeature;
      'elements.footer-section': ElementsFooterSection;
      'elements.logos': ElementsLogos;
      'elements.metrics': ElementsMetrics;
      'elements.notification-banner': ElementsNotificationBanner;
      'elements.post-items': ElementsPostItems;
      'elements.price-feature-container': ElementsPriceFeatureContainer;
      'elements.price-feature-options': ElementsPriceFeatureOptions;
      'elements.price-features': ElementsPriceFeatures;
      'elements.price-transaction': ElementsPriceTransaction;
      'elements.pricing-feature-group': ElementsPricingFeatureGroup;
      'elements.pricing-feature-item': ElementsPricingFeatureItem;
      'elements.pricing-feature': ElementsPricingFeature;
      'elements.service': ElementsService;
      'elements.tech-tabs': ElementsTechTabs;
      'elements.testimonial': ElementsTestimonial;
      'elements.transaction-fee': ElementsTransactionFee;
      'layout.address-details': LayoutAddressDetails;
      'layout.footer-menu': LayoutFooterMenu;
      'layout.footer': LayoutFooter;
      'layout.logo': LayoutLogo;
      'layout.navbar': LayoutNavbar;
      'layout.page-header': LayoutPageHeader;
      'layout.sub-menu': LayoutSubMenu;
      'links.button-link': LinksButtonLink;
      'links.button': LinksButton;
      'links.link': LinksLink;
      'links.social-link': LinksSocialLink;
      'menu.dropdown': MenuDropdown;
      'menu.explore-section': MenuExploreSection;
      'menu.link': MenuLink;
      'menu.menu-button': MenuMenuButton;
      'menu.menu-link': MenuMenuLink;
      'menu.navlinks': MenuNavlinks;
      'menu.sub-link-item': MenuSubLinkItem;
      'meta.metadata': MetaMetadata;
      'sections.about-us': SectionsAboutUs;
      'sections.address-section': SectionsAddressSection;
      'sections.agentlist': SectionsAgentlist;
      'sections.banner-slider': SectionsBannerSlider;
      'sections.bottom-actions': SectionsBottomActions;
      'sections.career-form': SectionsCareerForm;
      'sections.ceo-message': SectionsCeoMessage;
      'sections.clients': SectionsClients;
      'sections.collections': SectionsCollections;
      'sections.company': SectionsCompany;
      'sections.contact-form': SectionsContactForm;
      'sections.content-with-image': SectionsContentWithImage;
      'sections.crm-features': SectionsCrmFeatures;
      'sections.crm-pricing-plans': SectionsCrmPricingPlans;
      'sections.cta': SectionsCta;
      'sections.enhanced-pricing-plans': SectionsEnhancedPricingPlans;
      'sections.event-actions': SectionsEventActions;
      'sections.event-gallery-and-video': SectionsEventGalleryAndVideo;
      'sections.event-information': SectionsEventInformation;
      'sections.faq': SectionsFaq;
      'sections.favorite-categories': SectionsFavoriteCategories;
      'sections.feature-list': SectionsFeatureList;
      'sections.featured-products': SectionsFeaturedProducts;
      'sections.features': SectionsFeatures;
      'sections.footer-menu-shop': SectionsFooterMenuShop;
      'sections.footer-shop': SectionsFooterShop;
      'sections.header-links-shop': SectionsHeaderLinksShop;
      'sections.header-shop': SectionsHeaderShop;
      'sections.heading': SectionsHeading;
      'sections.hero-shop': SectionsHeroShop;
      'sections.hero': SectionsHero;
      'sections.homepage-statistics': SectionsHomepageStatistics;
      'sections.implementation-bundles': SectionsImplementationBundles;
      'sections.industries': SectionsIndustries;
      'sections.info-grid': SectionsInfoGrid;
      'sections.innovations': SectionsInnovations;
      'sections.internal-contact-form': SectionsInternalContactForm;
      'sections.key-stats': SectionsKeyStats;
      'sections.large-video': SectionsLargeVideo;
      'sections.lead-form': SectionsLeadForm;
      'sections.level-1': SectionsLevel1;
      'sections.level-2': SectionsLevel2;
      'sections.level-3': SectionsLevel3;
      'sections.logistics-page-forms': SectionsLogisticsPageForms;
      'sections.logistics': SectionsLogistics;
      'sections.marketing': SectionsMarketing;
      'sections.our-brands': SectionsOurBrands;
      'sections.our-services': SectionsOurServices;
      'sections.our-team': SectionsOurTeam;
      'sections.package': SectionsPackage;
      'sections.partner-category': SectionsPartnerCategory;
      'sections.partners': SectionsPartners;
      'sections.platform': SectionsPlatform;
      'sections.post-information': SectionsPostInformation;
      'sections.power-up-addons': SectionsPowerUpAddons;
      'sections.pricing-form': SectionsPricingForm;
      'sections.pricing-plans': SectionsPricingPlans;
      'sections.retail-application-form': SectionsRetailApplicationForm;
      'sections.retail': SectionsRetail;
      'sections.rich-text': SectionsRichText;
      'sections.roi-section': SectionsRoiSection;
      'sections.schedule-demo': SectionsScheduleDemo;
      'sections.service-tabs': SectionsServiceTabs;
      'sections.services': SectionsServices;
      'sections.special-categories': SectionsSpecialCategories;
      'sections.success-stories': SectionsSuccessStories;
      'sections.tech-expertise': SectionsTechExpertise;
      'sections.tech-products': SectionsTechProducts;
      'sections.testimonials-group': SectionsTestimonialsGroup;
      'sections.testimonials-shop': SectionsTestimonialsShop;
      'sections.zigzag-cards': SectionsZigzagCards;
      'shared.addon-card': SharedAddonCard;
      'shared.agent-card': SharedAgentCard;
      'shared.banner-slide': SharedBannerSlide;
      'shared.card': SharedCard;
      'shared.faq-option': SharedFaqOption;
      'shared.images': SharedImages;
      'shared.kpis': SharedKpis;
      'shared.media': SharedMedia;
      'shared.package-option': SharedPackageOption;
      'shared.package-row': SharedPackageRow;
      'shared.partner-logo': SharedPartnerLogo;
      'shared.price-options': SharedPriceOptions;
      'shared.pricing-tier': SharedPricingTier;
      'shared.product-item': SharedProductItem;
      'shared.quote': SharedQuote;
      'shared.recommended-blogs': SharedRecommendedBlogs;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.services': SharedServices;
      'shared.slider': SharedSlider;
      'shared.story-item': SharedStoryItem;
      'shared.video-embed': SharedVideoEmbed;
    }
  }
}
