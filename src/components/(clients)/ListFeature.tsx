import Feature from "./Feature";

const ListFeature = () => {
  const features = [
    {
      title: "Search Data",
      desc: "Don’t worry if your data is very large, the Data Warehoue provides a search engine, which is useful for making it easier to find data effectively saving time.",
    },
    {
      title: "24 Hours Access",
      desc: "Access is given 24 hours a full morning to night and meet again in the morning, giving you comfort when you need data when urgent.",
    },
    {
      title: "Print Out",
      desc: "Print out service gives you convenience if someday you need print data, just edit it all and just print it.",
    },
    {
      title: "Security Code",
      desc: "Data Security is one of our best facilities. Allows for your files to be safer. The file can be secured with a code or password that you created, so only you can open the file.",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-12">
      {features?.map((feature, index) => (
        <Feature
          key={feature.title}
          background={`feature${index + 1}.png`}
          image={`image${index + 1}.png`}
          title={feature.title}
          desc={feature.desc}
        />
      ))}
    </div>
  );
};

export default ListFeature;
