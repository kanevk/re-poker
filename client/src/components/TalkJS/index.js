import React, { useRef, createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Talk from 'talkjs';

const TalkContext = createContext();

const useTalkContext = () => {
  return useContext(TalkContext);
};

const UserType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  photoUrl: PropTypes.string,
  welcomeMessage: PropTypes.string,
});

const useChatbox = ({ chatId, users, conversationSettings: { photoUrl, subject } = {} }) => {
  const { session, currentChatUser, loading } = useContext(TalkContext);
  console.log(session, currentChatUser, loading);

  return useMemo(() => {
    if (loading) return null;

    const chatUsers = users.map((u) => new Talk.User(u));

    const conversation = session.getOrCreateConversation(chatId);
    [currentChatUser, ...chatUsers].forEach((u) => conversation.setParticipant(u));

    conversation.setAttributes({
      photoUrl: photoUrl || 'https://demo.talkjs.com/img/11.jpg',
      subject: subject || 'Beautiful Steel Preserve for rent!',
    });

    return session.createChatbox(conversation);
  }, [users, loading, session, currentChatUser]);
};

const Chatbox = ({ chatId, users, fixedPosition = 'bottomLeft' }) => {
  const chatWrapperRef = useRef(null);
  const inboxElem = useChatbox({ chatId, users });

  useEffect(() => {
    if (!inboxElem || !chatWrapperRef) return () => {};

    inboxElem.mount(chatWrapperRef.current);

    return () => {
      inboxElem.destroy();
    };
  }, [inboxElem, chatWrapperRef.current]);

  const style = {
    bottomLeft: { position: 'fixed', bottom: '0', left: '0', height: '400px' },
  }[fixedPosition];

  return <div style={style} ref={chatWrapperRef} />;
};

Chatbox.propTypes = {
  chatId: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(UserType).isRequired,
  fixedPosition: PropTypes.string,
};

const TalkProvider = ({ children, currentUser, appId }) => {
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    Talk.ready.then(() => {
      const me = new Talk.User(currentUser);
      setCurrentChatUser(me);
      setSession(new Talk.Session({ appId, me }));
    });
  }, [currentUser, appId]);

  return (
    <TalkContext.Provider value={{ session, currentChatUser, loading: !session }}>
      {children}
    </TalkContext.Provider>
  );
};

TalkProvider.propTypes = {
  children: PropTypes.node.isRequired,
  appId: PropTypes.string,
  currentUser: UserType,
};

export { Chatbox, TalkProvider, useTalkContext };
