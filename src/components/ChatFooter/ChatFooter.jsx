import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '../IconButton/IconButton';
import MessageInput from '../MessageInput/MessageInput';

import styles from './ChatFooter.module.css';

class ChatFooter extends React.PureComponent {
  render() {
    const {
      sendMessage, className,
    } = this.props;

    return (
      <div className={`${styles.footer} ${className}`}>
        <MessageInput
          sendMessage={sendMessage}
          className={styles.messageInput}
          roomId={this.props.roomId}
        />
        <IconButton
          onClick={sendMessage}
          icon={{
            color: '#a9d18b',
            glyph: 'send',
          }}
        />
      </div>
    );
  }
}

ChatFooter.propTypes = {
  // handleAttachment: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  // handleVoice: PropTypes.func.isRequired,
  className: PropTypes.string,
  roomId: PropTypes.string.isRequired,
};
ChatFooter.defaultProps = {
  className: '',
};

export default ChatFooter;
