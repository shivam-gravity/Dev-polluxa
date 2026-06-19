const KPI = ({ kpis }) => {
  return (
    <div className="bg-white pt-12">
      {kpis?.description && (
        <p className="text-base md:text-lg text-[#333] text-center">
          {kpis?.description}
        </p>
      )}

      <div className="grid grid-cols-auto-fit grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-between">
        {kpis?.KPI?.length > 0 &&
          kpis?.KPI?.map((item) => (
            <div
              key={item?.id}
              className="flex flex-col items-center justify-center p-2 shadow-sm bg-[#F9F9F9] aspect-square"
            >
              {item?.metric && (
                <span className="text-5xl md:text-6xl font-semibold text-[#003464]">
                  {item?.metric}
                  {item?.metricSuffix && (
                    <span className="text-3xl md:text-5xl text-[#003464] ml-1">
                      {item?.metricSuffix}
                    </span>
                  )}
                </span>
              )}
              {item?.description && (
                <span className="text-base md:text-xl text-[#333] text-center">
                  {item?.description}
                </span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default KPI;
