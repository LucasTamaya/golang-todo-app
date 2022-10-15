import { Helmet as HelmetStructure } from "react-helmet-async";

interface Props {
  title: string;
  content: string;
  path: string;
}
// component for SEO
const Helmet: React.FC<Props> = ({ title, content, path }) => {
  return (
    <HelmetStructure>
      <title>{title}</title>
      <meta name="description" content={content} />
      <link rel="canonical" href={path} />
    </HelmetStructure>
  );
};

export default Helmet;
