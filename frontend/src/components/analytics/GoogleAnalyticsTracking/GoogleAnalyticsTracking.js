import Script from "next/script";
const GoogleAnalyticsTracking = () => {
  return (
    <>
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-ZDBPPRWMHP');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalyticsTracking;
