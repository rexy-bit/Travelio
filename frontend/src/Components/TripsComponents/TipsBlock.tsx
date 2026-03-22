// components/TipsBlock.tsx

import { memo } from "react";
import Icon from "../../Icons/Icon";
import type { TipsBlockData } from "../../Contexts/Types";


type Props = {
  data: TipsBlockData;
};

const TipsBlock = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-[400px] bg-white p-5 rounded-[10px] shadow-2xl mb-10 mt-5 transition-all duration-200 hover:scale-105 max-[450px]:w-[320px]">

      <h3 className="text-xl font-bold flex items-center gap-2">
        <Icon name="Lightbulb" size={25} />
        {data.title}
      </h3>

      <p className="text-sm text-gray-600 mt-5">
        {data.description}
      </p>

      <ul className="flex flex-col gap-3 text-sm text-gray-700 mt-5">
        {data.tips.map((tip, index) => (
          <li key={index} className="flex gap-2">
            <Icon name={tip.icon} size={18} />
            {tip.text}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default memo(TipsBlock);