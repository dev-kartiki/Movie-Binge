import { Helmet } from "react-helmet";

const SEO = ({ title, description }) => (
  <Helmet>
    {/* 
      Set the document title for the page, which appears in the browser tab 
      and helps search engines understand the content of the page.
    */}
    <title>{title}</title>

    {/* 
      Provide a meta description for the page, which may be used by search engines 
      as the summary of the page in search results.
    */}
    <meta name="description" content={description} />

    {/* 
      Open Graph meta tags for social media sharing, ensuring that the correct 
      title and description are displayed when the page is shared on social platforms.
    */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />

    {/* 
      Additional meta tags for accessibility and SEO can be added here, 
      such as language settings, viewport, and more.
    */}
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
  </Helmet>
);

export default SEO;
