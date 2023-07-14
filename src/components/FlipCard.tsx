import React, { ReactNode } from "react";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
};

const FlipCard: React.FC<FlipCardProps> = ({ front, back }) => {
  return (
    <div className="w-[300px] lg:w-[400px] h-[350px] bg-transparent cursor-pointer group perspective">
      <div className="relative preserve-3d group-hover:my-rotate-y-180 w-full h-full duration-700">
        <div className="absolute backface-hidden w-full h-full">{front}</div>
        <div className="absolute my-rotate-y-180 backface-hidden w-full h-full overflow-hidden">
          {back}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
