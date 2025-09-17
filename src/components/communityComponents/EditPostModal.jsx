// // src/components/communityComponents/EditPostModal.jsx

// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
// import axios from 'axios';
// import { uploadToCloudinary } from "@/lib/cloudinary";
// import { Paperclip, Image, Video, X } from "lucide-react"

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
// };

// export default function EditPostModal({ open, onOpenChange, post, onPostUpdated }) {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [tags, setTags] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//      const [mediaItems, setMediaItems] = useState([]);
    
//     useEffect(() => {
//         // When the 'post' prop is available, fill the form
//         if (post) {
//             setTitle(post.title || '');
//             setContent(post.content || '');
//             setTags(post.tag_names?.join(', ') || '');
//             setMediaItems(post.media_items?.map(item => ({...item, id: item.id || Math.random() })) || []);
//         }
//     }, [post,open]);

//     const handleFileUpload = async (acceptType) => {
//         const input = document.createElement('input');
//         input.type = 'file';
//         input.accept = acceptType;
//         input.multiple = true;
//         input.onchange = (e) => {
//             const files = Array.from(e.target.files);
//             if (!files.length) return;

//             files.forEach(async (file) => {
//                 const tempId = Date.now() + Math.random();
//                 const media_type = file.type.startsWith("video") ? "video" : "image";
                
//                 // Add a placeholder to the UI immediately
//                 setMediaItems((prev) => [...prev, { id: tempId, url: "", media_type, progress: 0 }]);

//                 try {
//                     const url = await uploadToCloudinary(file, (percent) => {
//                         setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, progress: percent } : m));
//                     });
//                     // Update the item with the final URL from Cloudinary
//                     setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, url, progress: 100 } : m));
//                 } catch (err) {
//                     alert("Upload failed: " + err.message);
//                     setMediaItems((prev) => prev.filter((m) => m.id !== tempId)); // Remove on failure
//                 }
//             });
//         };
//         input.click();
//     };

//     const handleSave = async () => {
//         setIsSubmitting(true);
//         const authToken = getCookie("token");

//         // 5. Update handleSave to send the final media list
//         const formattedMediaItems = mediaItems
//             .filter(item => item.url) // Only include items that have successfully uploaded
//             .map(item => ({ url: item.url, media_type: item.media_type }));

//         const updatedData = {
//             title,
//             content,
//             tags: tags.split(",").map(t => t.trim()).filter(Boolean),
//             media_data: formattedMediaItems, // Add the media data to the payload
//         };

//         try {
//             await axios.put(`${API_BASE_URL}/api/posts-app/posts/${post.slug}/`, updatedData, {
//                 headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' }
//             });
//             alert("Post updated successfully!");
//             if (onPostUpdated) onPostUpdated();
//         } catch (error) {
//             console.error("Failed to update post:", error);
//             alert("Failed to update post.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-[600px] bg-white">
//                 <DialogHeader>
//                     <DialogTitle>Edit Post</DialogTitle>
//                 </DialogHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="space-y-1">
//                         <label htmlFor="title">Title</label>
//                         <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
//                     </div>
//                     <div className="space-y-1">
//                         <label htmlFor="content">Content</label>
//                         <Textarea
//                             id="content"
//                             value={content}
//                             onChange={(e) => setContent(e.target.value)}
//                             className="min-h-[120px]"
//                         />
//                     </div>
//                     <div className="space-y-1">
//                         <label htmlFor="tags">Tags (comma-separated)</label>
//                         <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
//                     </div>
//                     <div className="space-y-2">
//                         <label>Media</label>
//                         <div className="flex gap-2 flex-wrap">
//                             {mediaItems.map((m) => (
//                                 <div key={m.id} className="relative w-24 h-24 rounded border">
//                                     {m.media_type === "image" && m.url && <img src={m.url} alt="Post media" className="w-full h-full object-cover" />}
//                                     {m.media_type === "video" && m.url && <video src={m.url} className="w-full h-full object-cover" />}
//                                     {m.progress < 100 && <div className="flex items-center justify-center h-full text-xs text-gray-500">{m.progress}%</div>}
                                    
//                                     <button
//                                         onClick={() => setMediaItems((prev) => prev.filter((item) => item.id !== m.id))}
//                                         className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/80"
//                                     >
//                                         <X size={12} />
//                                     </button>
//                                 </div>
//                             ))}
//                             {/* Add New Media Button */}
//                             <button
//                                 onClick={() => handleFileUpload('image/*,video/*')}
//                                 className="w-24 h-24 rounded border-2 border-dashed flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600"
//                             >
//                                 <Paperclip size={24} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 <DialogFooter>
//                     <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
//                     <Button onClick={handleSave} disabled={isSubmitting}>
//                         {isSubmitting ? "Saving..." : "Save Changes"}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }




import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// ✅ ADDED: Avatar components for the mention dropdown
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// ❌ REMOVED: Textarea is no longer needed
// import { Textarea } from "@/components/ui/textarea"; 
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Paperclip, X } from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ ADDED: Cookie helper from CreatePostCard
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

// ✅ ADDED: API client from CreatePostCard for fetching mention results
const apiClient = {
    async request(method, url, data = null) {
        const headers = {};
        const config = { method, headers };
        const authToken = getCookie("token");
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }
        if (data) {
            headers["Content-Type"] = "application/json";
            config.body = JSON.stringify(data);
        }

        const fullUrl = `${API_BASE_URL}${url}`;
        const response = await fetch(fullUrl, config);
        if (!response.ok) throw new Error(await response.text());
        return response.json();
    },
    get: (url) => apiClient.request("GET", url),
};

// ✅ ADDED: Name initials helper for avatar fallbacks
const getInitials = (name = "") =>
    name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();


export default function EditPostModal({ open, onOpenChange, post, onPostUpdated }) {
    const [title, setTitle] = useState('');
    // ❌ REMOVED: Simple content state is replaced by the editor ref
    // const [content, setContent] = useState(''); 
    const [tags, setTags] = useState('');
    const [mediaItems, setMediaItems] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ ADDED: All state and refs required for the mention functionality
    const [mentionQuery, setMentionQuery] = useState("");
    const [mentionResults, setMentionResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(null);
    const [mentionedUsers, setMentionedUsers] = useState([]);
    
    const editorRef = useRef(null);
    const dropdownRef = useRef(null);
    const isInsertingMention = useRef(false);

    // ✅ ADDED: Effect to initialize the editor with post content and mentions
 useEffect(() => {
    // When the modal opens and we have a post...
    if (open && post) {
        // We set the simple fields immediately
        setTitle(post.title || '');
        setTags(post.tag_names?.join(', ') || '');
        setMediaItems(post.media_items?.map(item => ({...item, id: item.id || Date.now() + Math.random() })) || []);
        setMentionedUsers(post.mentions || []);

        // ✅ FIX: Use setTimeout to wait for the editor div to be ready
        const timer = setTimeout(() => {
            // Double-check that the ref exists before we use it
            if (editorRef.current) {
                let initialHtml = post.content || '';
                
                if (post.mentions && post.mentions.length > 0) {
                    post.mentions.forEach(mention => {
                        const regex = new RegExp(`@${mention.username}\\b`, 'g');
                        initialHtml = initialHtml.replace(regex, 
                            `<span style="color:#2563eb; font-weight:500;" data-mention="true" data-username="${mention.username}" data-fullname="${mention.full_name}">@${mention.full_name}</span>`
                        );
                    });
                }
                
                editorRef.current.innerHTML = initialHtml;
            }
        }, 0); // A delay of 0ms is enough to push this to the end of the execution queue.

        // Return a cleanup function to clear the timer if the component unmounts
        return () => clearTimeout(timer);
    } 
    // This cleanup part is still useful
    else if (!open && editorRef.current) {
        editorRef.current.innerHTML = '';
    }
}, [post, open]); // Rerun when modal is opened or post data changes

    // ✅ ADDED: All helper functions for cursor management and input handling
    const saveCursorPosition = () => {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            setCursorPosition(sel.getRangeAt(0).cloneRange());
        }
    };

    const restoreCursorPosition = () => {
        if (cursorPosition) {
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(cursorPosition);
        }
    };

    const getBeforeCursorText = () => {
        const sel = window.getSelection();
        if (sel.rangeCount === 0) return "";
        const range = sel.getRangeAt(0);
        const textNode = range.startContainer;
        const offset = range.startOffset;
        return textNode.nodeType === Node.TEXT_NODE ? textNode.textContent.slice(0, offset) : "";
    };

    const handleInput = () => {
        if (isInsertingMention.current) return;
        const beforeCursor = getBeforeCursorText();
        const match = beforeCursor.match(/@([\w\s]*)$/);
        if (match) {
            setMentionQuery(match[1]);
            saveCursorPosition();
        } else {
            setShowDropdown(false);
        }
    };
    
    // ✅ ADDED: Effect for fetching mention search results
    useEffect(() => {
        if (mentionQuery === "") {
            setShowDropdown(false);
            return;
        }
        const delay = setTimeout(async () => {
            try {
                const results = await apiClient.get(`/api/posts-app/users/search/?search=${mentionQuery}`);
                setMentionResults(results);
                setShowDropdown(results.length > 0);
            } catch (err) {
                console.error("Mention search failed:", err);
            }
        }, 300);
        return () => clearTimeout(delay);
    }, [mentionQuery]);

    // ✅ ADDED: Function to insert the mention span into the editor
    const insertMention = (username, fullName) => {
        setMentionedUsers(prev => {
            if (!prev.some(user => user.username === username)) {
                return [...prev, { username, fullName }];
            }
            return prev;
        });

        isInsertingMention.current = true;
        restoreCursorPosition();
        const sel = window.getSelection();
        if (sel.rangeCount === 0) {
            isInsertingMention.current = false;
            return;
        }

        const range = sel.getRangeAt(0);
        const textNode = range.startContainer;
        if (textNode.nodeType === Node.TEXT_NODE) {
            const atIndex = textNode.textContent.slice(0, range.startOffset).lastIndexOf('@');
            if (atIndex !== -1) {
                range.setStart(textNode, atIndex);
                range.deleteContents();
            }
        }

        const span = document.createElement("span");
        span.textContent = `@${fullName}`;
        span.style.color = "#2563eb";
        span.style.fontWeight = "500";
        span.setAttribute("data-mention", "true");
        span.setAttribute("data-username", username);
        span.setAttribute("data-fullname", fullName);
        range.insertNode(span);

        const space = document.createTextNode("\u00A0");
        range.setStartAfter(span);
        range.collapse(true);
        range.insertNode(space);
        range.setStartAfter(space);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        setShowDropdown(false);
        setMentionQuery("");
        editorRef.current.focus();

        setTimeout(() => { isInsertingMention.current = false; }, 10);
    };

    // ✅ ADDED: Function to convert rich content back to plain text for the backend
    const getContentForBackend = () => {
        if (!editorRef.current) return "";
        let contentString = "";
        editorRef.current.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                contentString += node.textContent;
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.getAttribute('data-mention') === 'true') {
                    contentString += `@${node.getAttribute('data-username')}`;
                } else {
                    contentString += node.textContent;
                }
            }
        });
        return contentString.replace(/\u00A0/g, ' ');
    };

    // File upload logic remains the same...
    // const handleFileUpload = async (acceptType) => {
    //     const input = document.createElement('input');
    //     input.type = 'file';
    //     input.accept = acceptType;
    //     input.multiple = true;
    //     input.onchange = (e) => {
    //         const files = Array.from(e.target.files);
    //         if (!files.length) return;
    //         files.forEach(async (file) => {
    //             const tempId = Date.now() + Math.random();
    //             const media_type = file.type.startsWith("video") ? "video" : "image";
    //             setMediaItems((prev) => [...prev, { id: tempId, url: "", media_type, progress: 0 }]);
    //             try {
    //                 const url = await uploadToCloudinary(file, (percent) => {
    //                     setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, progress: percent } : m));
    //                 });
    //                 setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, url, progress: 100 } : m));
    //             } catch (err) {
    //                 alert("Upload failed: " + err.message);
    //                 setMediaItems((prev) => prev.filter((m) => m.id !== tempId));
    //             }
    //         });
    //     };
    //     input.click();
    // };
    const handleFileUpload = async (acceptType) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptType;
    input.multiple = true;

    input.onchange = (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        // --- ✅ 1. CHECK TOTAL ITEM LIMIT ---
        const MAX_TOTAL_ITEMS = 6;
        if (mediaItems.length + files.length > MAX_TOTAL_ITEMS) {
            alert(`You can only upload a maximum of ${MAX_TOTAL_ITEMS} photos and videos in total.`);
            return; // Stop the function
        }

        // --- ✅ 2. CHECK VIDEO FILE SIZE ---
        const MAX_VIDEO_SIZE_MB = 10;
        const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;
        
        const validFiles = [];
        const oversizedFiles = [];

        // Separate valid files from oversized ones
        for (const file of files) {
            if (file.type.startsWith("video") && file.size > MAX_VIDEO_SIZE_BYTES) {
                oversizedFiles.push(file.name);
            } else {
                validFiles.push(file);
            }
        }

        // --- ✅ 3. SHOW ERROR FOR LARGE VIDEOS ---
        if (oversizedFiles.length > 0) {
            alert(`The following videos are larger than ${MAX_VIDEO_SIZE_MB}MB and will not be uploaded:\n- ${oversizedFiles.join("\n- ")}`);
        }

        if (!validFiles.length) return;

        // --- ✅ 4. UPLOAD ONLY THE VALID FILES ---
        validFiles.forEach(async (file) => {
            const tempId = Date.now() + Math.random();
            const media_type = file.type.startsWith("video") ? "video" : "image";
            
            setMediaItems((prev) => [...prev, { id: tempId, url: "", media_type, progress: 0 }]);
            
            try {
                const url = await uploadToCloudinary(file, (percent) => {
                    setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, progress: percent } : m));
                });
                setMediaItems((prev) => prev.map((m) => m.id === tempId ? { ...m, url, progress: 100 } : m));
            } catch (err) {
                alert("Upload failed: " + err.message);
                setMediaItems((prev) => prev.filter((m) => m.id !== tempId));
            }
        });
    };

    input.click();
};

    // 🔄 MODIFIED: handleSave to use the new content format
    const handleSave = async () => {
        setIsSubmitting(true);
        const authToken = getCookie("token");

        // Get content from the contentEditable div
        const contentForBackend = getContentForBackend();

        const formattedMediaItems = mediaItems
            .filter(item => item.url)
            .map(item => ({ url: item.url, media_type: item.media_type }));
        
        const mentionedUsernames = mentionedUsers.map(user => user.username);

        const updatedData = {
            title,
            content: contentForBackend,
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            mentions: mentionedUsernames, // Add mentions to the payload
            media_data: formattedMediaItems,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/${post.slug}/`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${authToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });
            if (!response.ok) {
                 const errorData = await response.json();
                 throw new Error(JSON.stringify(errorData));
            }
            alert("Post updated successfully!");
            onPostUpdated?.();
            onOpenChange(false);
        } catch (error) {
            console.error("Failed to update post:", error);
            alert(`Failed to update post: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] flex flex-col bg-white ">
                <DialogHeader className={"flex-shrink-0 px-6 pt-6"}>
                    <DialogTitle>Edit Post</DialogTitle>
                </DialogHeader>
                <div className=" flex-1 overflow-y-auto  custom-scrollbar">
                    <div className="space-y-6">
                        <label htmlFor="title">Title</label>
                        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="" />
                    </div>

                    {/* 🔄 MODIFIED: Replaced Textarea with contentEditable div */}
                    <div className="space-y-6">
                        <label>Content</label>
                        <div
                            ref={editorRef}
                            contentEditable={true}
                            onInput={handleInput}
className="min-h-[120px] max-h-48 w-full rounded-md border-2 border-black p-2 text-sm focus:outline-none break-words overflow-y-auto"                            data-placeholder="What's on your mind? Use @ to mention someone"
                            onPaste={(e) => {
                                e.preventDefault();
                                const text = e.clipboardData.getData('text/plain');
                                document.execCommand('insertText', false, text);
                            }}
                        ></div>
                        
                        {showDropdown && mentionResults.length > 0 && (
                            <div ref={dropdownRef} className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-64 max-h-48 overflow-y-auto z-50">
                                {mentionResults.map((u) => (
                                    <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            insertMention(u.username, u.full_name);
                                        }}>
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={u.avatar_url} />
                                            <AvatarFallback className="text-xs">{getInitials(u.full_name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            {/* <p className="text-sm font-medium">@{u.username}</p> */}
                                            <p className="text-xs text-gray-500">{u.full_name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-1">
                        <label htmlFor="tags">Tags (comma-separated)</label>
                        <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </div>

                    {/* Media section remains the same */}
                    <div className="space-y-2">
                        <label>Media</label>
                        <div className="flex gap-2 flex-wrap">
                            {mediaItems.map((m) => (
                                <div key={m.id} className="relative w-24 h-24 rounded border">
                                    {m.media_type === "image" && m.url && <img src={m.url} alt="Post media" className="w-full h-full object-cover" />}
                                    {m.media_type === "video" && m.url && <video src={m.url} className="w-full h-full object-cover" />}
                                    {m.progress < 100 && !m.url && <div className="flex items-center justify-center h-full text-xs text-gray-500">{m.progress}%</div>}
                                    <button
                                        onClick={() => setMediaItems((prev) => prev.filter((item) => item.id !== m.id))}
                                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-black/80"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => handleFileUpload('image/*,video/*')}
                                className="w-24 h-24 rounded border-2 border-dashed flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                            >
                                <Paperclip size={24} />
                            </button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-shrink-0 px-6 pb-6 border-t pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}