import React from "react";

interface ChatHeaderProps {
  groupName: string;
  membersCount?: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ groupName, membersCount }) => (
  <div className="flex items-center justify-between px-4 py-2 border-b bg-white rounded-t-lg">
    <div>
      <h2 className="text-lg font-semibold text-blue-700">{groupName}</h2>
      {membersCount !== undefined && (
        <span className="text-xs text-gray-500">{membersCount} members</span>
      )}
    </div>
    <span className="text-xs text-gray-400">Group Chat</span>
  </div>
);

export default ChatHeader;
