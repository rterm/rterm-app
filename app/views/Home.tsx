import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import './Home.scss';

interface PropsType {}

class Home extends React.Component<PropsType> {
  render() {
    return (
      <div className="home">
        <Button variant="outlined" color="primary">
          Primary
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {};
}

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
