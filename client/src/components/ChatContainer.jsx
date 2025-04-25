// import React, { useEffect, useRef } from 'react';
// import { useChatStore } from '../store/useChatStore';
// import ChatHeader from './ChatHeader';
// import MessageInput from './MessageInput';
// import MessageSkeleton from './skeleton/MessageSkeleton';
// import { useAuthStore } from '../store/useAuthStore';
// import { formatMessageTime } from '../lib/utils';

// const ChatContainer = () => {
//   const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unsubscribeFromMessage } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null)
//   useEffect(() => {
//     getMessages(selectedUser._id)

//     subscribeToMessage();

//     return () => unsubscribeFromMessage();
//   }, [selectedUser._id, getMessages])

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   if (isMessagesLoading) return <div>
//     <ChatHeader />
//     <MessageSkeleton />
//     <MessageInput />
//   </div>
//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// }

// export default ChatContainer;
import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeleton/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import { X, Download } from 'lucide-react';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unsubscribeFromMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessage();
    return () => unsubscribeFromMessage();
  }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = (e) => {
    // Close only if click is outside the image or on the backdrop
    if (!e.target.closest('.modal-content')) {
      setSelectedImage(null);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(selectedImage, { mode: 'cors' });
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `attachment-${Date.now()}.jpg`; // or .png depending on file type
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url); // clean up
    } catch (error) {
      console.error("Download failed:", error);
    }
  };



  if (isMessagesLoading) return (
    <div>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col overflow-auto relative">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => handleImageClick(message.image)}
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="absolute inset-0 bg-black/20 flex items-center justify-center z-50"
          onClick={closeModal}
          ref={modalRef}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top-right action buttons */}
            <div className="absolute top-2 right-2 flex gap-2 z-10">
              <button
                onClick={handleDownload}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white shadow cursor-pointer"
                title="Download"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 text-white shadow cursor-pointer"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Image */}
            <img
              src={selectedImage}
              alt="Full size attachment"
              className="rounded-md border border-gray-700 object-contain w-full h-full max-h-[80vh] max-w-full"
            />
          </div>
        </div>
      )}


      <MessageInput />
    </div>
  );
};

export default ChatContainer;