import React from "react";
import { Button } from "react-bootstrap";

class Text extends React.Component {
  constructor() {
    super();
    this.state = {
      height: "3.3em"
    };
  }

  countLines = () => {
    let height = this.testComp.offsetHeight;
    if ((height - 2) / 16 > 3.3) {
      this.setState({ showButton: true });
    }
  };

  showHidePara = () => {
    if (this.state.height === "auto") {
      this.setState({ height: "3.3em" });
    } else {
      this.setState({ height: "auto" });
    }
  };

  componentDidMount() {
    this.countLines();
  }

  render() {
    return (
      <div>
        <div
          className="parent"
          style={{ height: this.state.height, overflow: "hidden" }}
        >
          <div
            className="content"
            ref={c => (this.testComp = c)}
            style={{ height: "auto" }}
          >
            {this.props.children}
          </div>
        </div>
        {this.state.showButton ? (
          <Button onClick={this.showHidePara} variant="link" className="p-1">
            Read more{" "}
          </Button>
        ) : null}
      </div>
    );
  }
}

export default Text;
