import React, { Component } from "react";

import DetailQuestionContainer from "../containers/DetailQuestionContainer";

class DetailPage extends Component {
  render() {
    return <DetailQuestionContainer id={this.props.match.params.id} />;
  }
}

export default DetailPage;
