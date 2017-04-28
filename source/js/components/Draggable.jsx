import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  containerWidth: PropTypes.number,
  containerHeight: PropTypes.number,
};

const defaultState = {
  top: 0,
  left: 0,
  dragging: false,
};

class Draggable extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };

    this.startDragging = ::this.startDragging;
    this.stopDragging = ::this.stopDragging;
    this.move = ::this.move;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dragging && !prevState.dragging) {
      window.addEventListener('mouseup', this.stopDragging);
      window.addEventListener('mousemove', this.move);
    }
  }

  componentWillUnmount() {
    this.stopDragging(); 
  }

  move({ clientX, clientY }) {
    const deltaX = clientX - this.mouseStart.left;
    const deltaY = clientY - this.mouseStart.top;

    let top = this.draggableItemStart.top + deltaY;
    let left = this.draggableItemStart.left + deltaX;

    const { containerWidth, containerHeight } = this.props;

    if (containerWidth != null) {
      const maxLeft = containerWidth - this.draggableItem.clientWidth;
      left = Math.min(maxLeft, left);
    }

    if (containerHeight != null) {
      const maxTop = containerHeight - this.draggableItem.clientHeight;
      top = Math.min(maxTop, top);
    }

    top = Math.max(top, 0);
    left = Math.max(left, 0);

    this.setState({ top, left });
  }

  startDragging(e) {
    this.setState({ dragging: true });
    this.mouseStart = {
      left: e.clientX,
      top: e.clientY,
    };

    const { left, top } = this.state;

    this.draggableItemStart = { left, top };
  }

  stopDragging() {
    this.setState({ dragging: false });
    window.removeEventListener('mouseup', this.stopDragging);
    window.removeEventListener('mousemove', this.move);
  }

  render() {
    const child = React.Children.only(this.props.children);
    const { top, left, dragging } = this.state;

    const style = {
      ...child.props.style,
      top,
      left,
    };

    return React.cloneElement(
      child,
      {
        ref: draggableItem => this.draggableItem = draggableItem,
        style,
        onMouseDown: this.startDragging,
      }
    );
  }
}

Draggable.propTypes = propTypes;

export default Draggable;
