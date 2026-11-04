import { useState } from "react";
import rat from "../../assets/images/rat.png";

// Falls back to the faded logo when the product image is missing or broken.
const ProductImage = ({ src, alt = "", className = "", ...props }) => {
  const [failedSrc, setFailedSrc] = useState(null);
  if (!src || failedSrc === src) {
    return (
      <img
        src={rat}
        alt={alt}
        className={`${className} opacity-20 grayscale`}
        {...props}
      />
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailedSrc(src)}
      className={className}
      {...props}
    />
  );
};

export default ProductImage;
