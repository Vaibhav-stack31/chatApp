import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();


    useEffect(() => {
        getUsers()
    }, [getUsers])

    return (
        isUsersLoading ? (<div className="flex w-52 flex-col gap-6 p-6">
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                </div>
            </div>
        </div>) :
            (<aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
                <div className="border-b border-base-300 w-full p-5">
                    <div className="flex items-center gap-2">
                        <Users className="size-6" />
                        <span className="font-medium hidden lg:block">Contacts</span>
                    </div>
                </div>
                <div className="overflow-y-auto w-full py-3">
                    {users.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}
                            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePic || "/avatar.png"}
                                    alt={user.name}
                                    className="size-12 object-cover rounded-full"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span
                                        className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                                    />
                                )}
                            </div>

                            {/* User info - only visible on larger screens */}
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className="text-sm text-zinc-400">
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>
                        </button>
                    ))}

                    {users.length === 0 && (
                        <div className="text-center text-zinc-500 py-4">No online users</div>
                    )}
                </div>
            </aside>)

    );
}

export default Sidebar;

// import React, { useEffect, useState } from 'react';
// import { useChatStore } from '../store/useChatStore';
// import { Users, Plus, X } from 'lucide-react';
// import { useAuthStore } from '../store/useAuthStore';

// const Sidebar = () => {
//     const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
//     const { onlineUsers } = useAuthStore();
//     const [showModal, setShowModal] = useState(false);
//     const [selectedUsers, setSelectedUsers] = useState([]);

//     useEffect(() => {
//         getUsers();
//     }, [getUsers]);

//     const handleUserSelect = (user) => {
//         const alreadySelected = selectedUsers.some(u => u._id === user._id);
//         if (!alreadySelected) {
//             setSelectedUsers(prev => [...prev, user]);
//         }
//         setShowModal(false);
//         setSelectedUser(user); // Optionally update selectedUser in store
//     };

//     const removeUser = (userId) => {
//         setSelectedUsers(prev => prev.filter(u => u._id !== userId));
//     };

//     return isUsersLoading ? (
//         <div className="flex w-52 flex-col gap-6 p-6">
//             {/* Loading skeletons if needed */}
//         </div>
//     ) : (
//         <>
//             <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//                 <div className="border-b border-base-300 w-full p-5">
//                     <div className="flex items-center gap-2 justify-between">
//                         <div className="flex items-center gap-2">
//                             <Users className="size-6" />
//                             <span className="font-medium hidden lg:block">Contacts</span>
//                         </div>
//                         <button onClick={() => setShowModal(true)} className="text-zinc-500 hover:text-primary transition">
//                             <Plus />
//                         </button>
//                     </div>
//                 </div>
//                 <div className="overflow-y-auto w-full py-3">
//                     {selectedUsers.map(user => (
//                         <div
//                             key={user._id}
//                             className={`w-full p-3 flex items-center gap-3 justify-between hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? 'bg-base-300 ring-1 ring-base-300' : ''
//                                 }`}
//                         >
//                             <button
//                                 onClick={() => setSelectedUser(user)}
//                                 className="flex items-center gap-3 w-full text-left"
//                             >
//                                 <div className="relative mx-auto lg:mx-0">
//                                     <img
//                                         src={user.profilePic || "/avatar.png"}
//                                         alt={user.fullName}
//                                         className="size-12 object-cover rounded-full"
//                                     />
//                                     {onlineUsers.includes(user._id) && (
//                                         <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
//                                     )}
//                                 </div>
//                                 <div className="hidden lg:block text-left min-w-0">
//                                     <div className="font-medium truncate">{user.fullName}</div>
//                                     <div className="text-sm text-zinc-400">
//                                         {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//                                     </div>
//                                 </div>
//                             </button>
//                             <button onClick={() => removeUser(user._id)} className="text-zinc-400 hover:text-red-500">
//                                 <X size={16} />
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             </aside>

//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//                     <div className="bg-white rounded-xl p-6 w-[90%] max-w-md space-y-4 relative">
//                         <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-zinc-500 hover:text-black">
//                             <X />
//                         </button>
//                         <h2 className="text-xl font-semibold mb-2">Select a User</h2>
//                         <div className="space-y-3 max-h-80 overflow-y-auto">
//                             {users.map((user) => (
//                                 <button
//                                     key={user._id}
//                                     onClick={() => handleUserSelect(user)}
//                                     className="w-full flex items-center gap-3 p-2 rounded hover:bg-zinc-100 transition"
//                                 >
//                                     <img src={user.profilePic || "/avatar.png"} className="w-10 h-10 rounded-full" alt={user.fullName} />
//                                     <div className="text-left">
//                                         <div className="font-medium">{user.fullName}</div>
//                                         <div className="text-sm text-zinc-500">{onlineUsers.includes(user._id) ? "Online" : "Offline"}</div>
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Sidebar;
