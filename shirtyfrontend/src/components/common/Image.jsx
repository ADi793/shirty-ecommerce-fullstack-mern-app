import React from 'react';
import { getProductImageUrl } from "../../utils/image";


function Image({data, value}) {
    return (
        <img
        src={getProductImageUrl(data._id)}
        alt={value}
        className="img-fluid"
      />
    );
}

export default Image;