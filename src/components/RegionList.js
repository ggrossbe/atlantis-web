import React from 'react';
import RegionPreview from './RegionPreview';

const RegionList = props => {
  if ((!props.regions)) {
    return (
      <div className="region-preview">Loading...</div>
    );
  }

  if (props.regions.length === 0) {
    return (
      <div className="region-preview">
        No regions are here... yet.
      </div>
    );
  }

  return (
    <div>
    {
      // key={region.plane ? region.plane + "-" : "" + region.x + "-" region.y}
      props.regions.map(region => {
        return (
          <RegionPreview region={region}
            title={region.type + "("
              + (region.plane ? region.plane + ", " : "")
              + region.x + ", " + region.y + ") in " + region.area
              + (region.cityName ? ", contains " + region.cityName + "[" + region.cityType + "]" : "")}
          />
        );
      })
    }
    </div>
  );
};

export default RegionList;
