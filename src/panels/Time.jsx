import React, {Component} from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import moment from 'moment';


class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moment: this.getCurrentMoment(props)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: this.getCurrentMoment(props)
    });
  }

  getCurrentMoment = (props) => {
    const {range, rangeAt} = props;
    let result = props.moment;

    if (result) {
      if (range) {
        result = result[rangeAt] || moment().hours(0).minutes(0);
      }
    } else {
      result = moment().hours(0).minutes(0);
    }

    return result;
  }

  handleChange = (type, value) => {
    const {onChange, range, rangeAt} = this.props;
    const _moment = this.state.moment.clone();
    let selected = this.props.moment;

    _moment[type](value);

    if (range) {
      const copyed = selected ? Object.assign(selected, {}) : {};

      copyed[rangeAt] = _moment;
    } else {
      selected = _moment;
    }

    this.setState({
      moment: _moment
    });
    onChange && onChange(selected);
  }

  render() {
    const _moment = this.state.moment;
    const {style, minHour = 0, maxHour = 23, minMin = 0, maxMin = 59} = this.props;

    return (
      <div style={style}>
        <div className="time">
          <div className="show-time">
            <span className="text">{_moment.format('HH')}</span>
            <span className="separater">:</span>
            <span className="text">{_moment.format('mm')}</span>
          </div>
          <div className="sliders">
            <span className="slider-text">Hours:</span>
            <Slider min={minHour} max={maxHour} defaultValue={_moment.hour()} value={_moment.hour()} onChange={this.handleChange.bind(this, 'hours')} />
            <span className="slider-text">Minutes:</span>
            <Slider min={minMin} max={maxMin} defaultValue={_moment.minute()} value={_moment.minute()} onChange={this.handleChange.bind(this, 'minutes')} />
          </div>
        </div>
      </div>
    );
  }
}


export default Time;
