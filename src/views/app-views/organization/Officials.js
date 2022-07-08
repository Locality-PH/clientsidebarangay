import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { barangayOfficialsData } from "./BarangayData";
import AvatarStatus from "components/shared-components/AvatarStatus";

const Officials = () => {
  const [officials, setOfficials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOfficials(barangayOfficialsData);
    setIsLoading(false);
  }, [officials]);

  return (
    <>
      <Card title="Barangay Officials 2019-2021" loading={isLoading}>
        {officials.map((result, i) => {
          return (
            <div
              className={`${i === officials.length - 1 ? "" : "mb-4"}`}
              key={`connection-${i}`}
            >
              <AvatarStatus
                src={result.img}
                name={result.name}
                subTitle={result.title}
              />
            </div>
          );
        })}
      </Card>
    </>
  );
};

export default Officials;
