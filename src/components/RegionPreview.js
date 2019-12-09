import React from 'react';
import './Region.css';

const RegionPreview = props => {
  const region = props.region;
  const title = props.title;
  const type = 'region-' + region.type;

  return (
    <div className="region-preview">
      <div className={type}>
        <a to={`region/${region._id}`} className="preview-link">
          <h3>{title}</h3>
        </a>
        <div className="region-info">
          {region.race && <span>{region.peasants} peasants ({region.race}),</span>} ${region.silver}
        </div>
      </div>
    </div>
  );
}

export default RegionPreview;
