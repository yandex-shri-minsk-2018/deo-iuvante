import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchMessages, sendMessage } from '../actions/messages';
import { fetchUser, fetchUsers } from '../actions/users';

import Chat from '../components/Chat/Chat';
import { markAllUnreadMessages } from '../actions/rooms';

class RoomMessages extends Component {
  componentDidMount() {
    this.props.fetchMessages(this.props.roomId);
    this.props.fetchUsers();
  }

  componentDidUpdate() {
    this.clearTimeout();

    this.timeout = setTimeout(() => this.props.readMessages(this.props.roomId), 500);
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    // eslint-disable-next-line no-unused-expressions
    this.timeout && clearTimeout(this.timeout);
  }

  render() {
    return (
      <Chat
        messages={this.props.messages}
        currentUserId={this.props.currentUserId}
        sendMessage={this.props.sendMessage}
        roomId={this.props.roomId}
        isFetchingMessages={this.props.isFetchingMessages}
        users={this.props.users}
      />
    );
  }
}

const mapStateToProps = (state, { roomId }) => {
  const messages =
    state.rooms.byId[roomId].messages
      .map(messageId => state.messages.byId[messageId])
      .filter(message => typeof message !== 'undefined');

  return {
    messages,
    currentUserId: state.currentUser.data._id,
    users: state.users,
    isFetchingMessages: false,
  };
};

const mapDispatchToProps = dispatch => ({
  sendMessage: (roomId, message) => dispatch(sendMessage(roomId, message)),
  fetchMessages: roomId => dispatch(fetchMessages(roomId)),
  fetchUser: _id => dispatch(fetchUser(_id)),
  readMessages: roomId => dispatch(markAllUnreadMessages(roomId)),
  fetchUsers: filter => dispatch(fetchUsers(filter)),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomMessages);

RoomMessages.defaultProps = {
  isFetchingMessages: false,
  messages: [],
};

RoomMessages.propTypes = {
  fetchMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  roomId: PropTypes.string.isRequired,
  currentUserId: PropTypes.string.isRequired,
  readMessages: PropTypes.func.isRequired,
  isFetchingMessages: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.object),
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchUsers: PropTypes.func.isRequired,
};
