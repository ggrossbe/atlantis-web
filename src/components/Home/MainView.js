import RegionList from '../RegionList';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  report: state.home.report
});

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

        <li className="nav-item">
          <a
            href=""
            className="nav-link active">
            Regions
          </a>
        </li>

        </ul>
      </div>

      { props.report && props.report.regions && <RegionList
          regions={props.report.regions}
        />
      }
    </div>
  );
};

export default connect(mapStateToProps, () => ({}))(MainView);
