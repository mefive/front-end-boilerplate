import React, { Component } from 'react';

import 'styles/components/scrollable.scss';

const defaultState = {
  scrollTop: 0,
  scrollHeight: 0,
  thumbSize: 0,
  thumbOffset: 0,
};

class Scrollable extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
    this.onWheel = ::this.onWheel;
  }

  componentDidMount() {
    this.setState({
      ...defaultState,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { scrollTop } = this.state;
    const { wrapper } = this;

    if (prevState.scrollTop !== scrollTop) {
      wrapper.scrollTop = scrollTop;
      this.syncThumb();
    }
    else {
      const { scrollHeight } = wrapper;

      if (scrollHeight !== this.state.scrollHeight) {
        this.setState({ scrollHeight });
        this.syncThumb();
      }
    }
  }

  onWheel(e) {
    const { deltaY } = e;
    const { wrapper } = this;

    const max = wrapper.scrollHeight - this.props.height;
    const min = 0;

    let scrollTop = wrapper.scrollTop + deltaY;

    scrollTop = Math.max(scrollTop, min);
    scrollTop = Math.min(scrollTop, max);

    if (scrollTop > min & scrollTop < max) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.setState({ scrollTop });
  }

  syncThumb() {
    const ratio = this.getRatio();

    const thumbSize = this.props.height * ratio;
    const thumbOffset = this.state.scrollTop * ratio;

    this.setState({ thumbSize, thumbOffset });
  }

  getRatio() {
    const { wrapper } = this;
    const { height } = this.props;

    return height / wrapper.scrollHeight;
  }

  render() {
    return (
      <div className="scrollable">
        <div
          className="scrollable-wrapper"
          ref={wrapper => this.wrapper = wrapper}
          style={{
            height: this.props.height
          }}
          onWheel={this.onWheel}
        >
          {this.props.children}
        </div>

        {this.state.thumbSize < this.props.height && (
          <div className="scrollable-track">
            <div
              className="scrollable-thumb"
              style={{
                height: this.state.thumbSize,
                top: this.state.thumbOffset,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Scrollable;
