import { Scale, Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const Rating = ({
  value = 0, //currentrating =2
  onRatingChange,
  disabled = false, //login pannatha kuthukanum appadina true va change pannanum
  showValue = true, //true va irutha rating value kathanum illana false nu vachikalam
}) => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(value); // 2 //value va rating la setpanrom
  useEffect(() => {
    setRating(value);
  }, [value]);

  const handlleClick = (star) => {
    if (disabled) return;
    setRating(star);
    onRatingChange?.(star);
  };
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = hover ? star <= hover : star <= rating;
          //entha contition load aagum podu mattum work aagum
          //eppa backend la 2 rating irutha web load aagum poduthu 2 rating mattum fill aairukum
          //  0  => -  :1<=2 => True
          //  0  => -  :2<=2 => True
          //  0  => -  :3<=2 => False
          //  0  => -  :4<=2 => False
          //  0  => -  :5<=2 => False

          return (
            <Star
              key={star}
              size={18}
              className={`"transition-all duration-200 
              ${filled ? "fill-amber-400 text-amber-400" : "text-gray-300"} 
              ${disabled ? "cursor-default" : "cursor-pointer hover:Scale-125"}`}
              onMouseEnter={() => !disabled && setHover(star)} //3 => 2<=3 : - => true 3rd star fill aagum
              onMouseLeave={() => !disabled && setHover(0)}
              onClick={() => handlleClick(star)}
            />
          );
        })}
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-gray-500">{value}/5</span>
      )}
    </div>
    //user rating name ma values la store pannithom
    // <Rating value={rating} onRatingChange={(r) => setRating(r)} />
  );
};

export default Rating;
