import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRoom } from '../actions/rooms';

import ChatLayout from '../components/ChatLayout/ChatLayout';

class Room extends Component {
  componentDidMount() {
    const { room, match } = this.props;

    if (!room) this.props.fetchRoom(match.params.id);
  }

  render() {
    const { room } = this.props;

    if (room) {
      return (
        <ChatLayout
          chatName={room.name}
          roomId={room._id}
          chatNameAvatar={room.name}
        />
      );
    }

    return (
      <ChatLayout
        roomIsFetching
        roomId={this.props.match.params.id}
      />
    );
  }
}

const mapStateToProps = (state, { match }) => ({
  room: state.rooms.byId[match.params.id],
});

export default connect(mapStateToProps, { fetchRoom })(Room);

Room.propTypes = {
  fetchRoom: PropTypes.func.isRequired,
  room: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
