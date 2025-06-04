import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { groupUsersByAttributes } from "./GroupUtils";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const [groups, setGroups] = useState<{ name: string; members: any[] }[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedGroup, selectedGroup } = useChatStore();
  const { user } = useAuthStore();
  const [activeCount, setActiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    // Fetch total user count
    async function fetchTotal() {
      try {
        const res = await axios.get("/api/users/");
        setTotalCount(res.data.length);
      } catch {
        setTotalCount(0);
      }
    }
    fetchTotal();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const res = await axios.get("/api/users/");
        const grouped = groupUsersByAttributes(res.data);
        setGroups(
          Object.entries(grouped).map(([name, members]) => ({ name, members }))
        );
        if (Object.keys(grouped).length > 0) {
          setSelectedGroup(Object.keys(grouped)[0]);
        }
      } catch (e) {
        setGroups([]);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [setSelectedGroup]);

  return (
    <aside className="flex flex-col w-64 h-full p-4 bg-white border-r">
      <h2 className="flex items-center justify-between mb-4 text-lg font-bold text-blue-700">
        Groups
        <span className="text-xs font-normal text-gray-500">
          {activeCount} online / {totalCount} total
        </span>
      </h2>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="text-gray-400 animate-pulse">Loading groups...</div>
        ) : groups.length === 0 ? (
          <div className="text-sm text-gray-500">No groups found</div>
        ) : (
          <ul>
            {groups.map((group) => (
              <li
                key={group.name}
                className={`p-2 rounded cursor-pointer mb-1 transition ${
                  selectedGroup === group.name
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedGroup(group.name)}
              >
                {group.name}
                <span className="ml-2 text-xs text-gray-400">
                  ({group.members.length})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="w-full py-2 mt-4 text-white transition bg-blue-600 rounded hover:bg-blue-700">
        + Create Group
      </button>
    </aside>
  );
};

export default Sidebar;
