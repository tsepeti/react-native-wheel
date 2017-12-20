import React from 'react';
import PropTypes from 'prop-types';

import ReactNative,{
    requireNativeComponent,
    PanResponder,
} from 'react-native';


let NativeWheelView = requireNativeComponent('RCTWheelView',WheelView);


class WheelView extends React.Component{
    constructor(props) {
        super(props);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onShouldBlockNativeResponder: () => true,
        });
        this.onItemChange = this.onItemChange.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.values !== this.props.values
            ||
            nextProps.isLoop !== this.props.isLoop
            ||
            nextProps.selectedIndex !== this.props.selectedIndex
            ||
            nextProps.itemsVisible !== this.props.itemsVisible
            ||
            nextProps.velocityFling !== this.props.velocityFling
        )
    }

    onItemChange(event) {
        if(this.props.onItemChange){
            this.props.onItemChange(event.nativeEvent.index);
        }
    };

    render(){
        return (
        <NativeWheelView
            {...this.panResponder.panHandlers}
            {...this.props}
            onChange={this.onItemChange}
        />);
    }
};
WheelView.propTypes = {
    onItemChange: PropTypes.func,
    values: PropTypes.array,
    isLoop: PropTypes.bool,
    selectedIndex: PropTypes.number,
    textSize: PropTypes.number,
    itemsVisible: PropTypes.number,
    velocityFling: PropTypes.number,
};
export default WheelView;

