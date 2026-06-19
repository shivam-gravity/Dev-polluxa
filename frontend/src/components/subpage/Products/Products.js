import cx from "classnames";
import { Typography, Card } from "@/components/ui";

const Products = (props) => {
  const { data } = props;
  const { product_collections, title, description, bgColor } = data;

  return (
    <section
      className={cx(`py-10 md:py-20`, {
        "bg-gradient-to-r from-[#0774F5] to-[#123EAF]": !bgColor,
      })}
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-custom px-5 md:px-0">
        <div className="text-center">
          <Typography
            variant={`${bgColor ? "gradient" : "heading2"}`}
            className={cx(``, {
              "text-white font-bold": !bgColor,
            })}
          >
            {title}
          </Typography>
        </div>

        {description && (
          <Typography
            variant="heading1"
            className={`md:w-[800px] mx-auto text-center`}
          >
            <span
              className={cx(``, {
                "text-white": !bgColor,
              })}
            >
              {description}
            </span>
          </Typography>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 py-10">
          {product_collections?.data?.map((item) => {
            const attributes = item?.attributes;
            return (
              <Card
                key={item?.id}
                title={attributes?.title}
                url={attributes.slug}
                subtitle={attributes?.subtitle}
                image={attributes?.media?.file?.data?.attributes}
                description={attributes?.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
