// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// export default function CreatePostCard() {
//   const [postText, setPostText] = useState("");


//   return (
//     <Card className="border border-gray-200 hover:shadow-md transition-shadow p-4">
//       <div className="flex gap-4 items-start">
//         {/* LEFT SIDE - Post As */}
//         <div className="w-1/3">
//           <p className="text-sm font-medium mb-2">Post As</p>
//           <div className="flex items-center gap-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/avatars/mahendra.jpg" />
//               <AvatarFallback>MS</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">Mahendra Seervi</p>
//               <p className="text-sm text-gray-500">kalux@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE - Textarea + Button */}
//         <div className="flex-1">
//         <Textarea
//   placeholder="Okay, let’s do a video chat today"
//   value={postText}
//   onChange={(e) => setPostText(e.target.value)}
//   className="mb-3
//     rounded-lg
//     !border-0
//     !outline-none
//     !ring-0
//     focus:!outline-none
//     focus:!ring-0
//     focus:!border-0
//     focus:!shadow-none
//     !shadow-none
//     px-4 py-3
//     !text-lg
//     md:!text-xl
//     placeholder:text-gray-800 placeholder:text-lg
//     bg-gray-50
//     h-24
//     resize-none
//     overflow-y-auto
//     whitespace-pre-wrap
//     break-all               /* ✅ force break inside long words */
//   "
// />



//           <div className="flex justify-between items-center">
//             <Button
//               variant="ghost"
//               className="text-gray-500 hover:text-gray-700 flex gap-2"
//             >
//               <Paperclip size={16} />
//             </Button>

//             <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6">
//               Post
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }


// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"; // ✅ Import the Input component
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export default function CreatePostCard() {
//   // --- 1. Create separate state for each field ---
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState(""); // Will be a comma-separated string
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePostSubmit = async () => {
//     // Validate that title and content are not empty
//     if (!title.trim() || !content.trim() || isSubmitting) {
//       alert("Please provide a title and content.");
//       return;
//     }

//     setIsSubmitting(true);

//     // IMPORTANT: Replace with your actual auth token
//     const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2NjU5Mjk1LCJpYXQiOjE3NTY2NTIwOTUsImp0aSI6ImI1NDViMTU3N2RkMTQ1MjZhYzJlZjIwZWFmYjY4ZDk5IiwidXNlcl9pZCI6IjkifQ.DPROeERMNsAg2RAhNT6jkzXIp5QICHwh7RmNGHtwuPI";

//     // --- 2. Prepare the payload from the state variables ---
//     const postData = {
//       title: title,
//       content: content,
//       // Convert the comma-separated string of tags into an array of strings
//       tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag), // trim whitespace and remove empty tags
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`,
//         },
//         body: JSON.stringify(postData),
//       });

//       if (response.ok) {
//         alert("Post created successfully!");
//         // Clear all fields after success
//         setTitle("");
//         setContent("");
//         setTags("");
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${JSON.stringify(errorData)}`);
//       }
//     } catch (error) {
//       alert("A network error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="border border-gray-200 hover:shadow-md transition-shadow p-4">
//       <div className="flex gap-4 items-start">
//         {/* LEFT SIDE - Post As */}
//         <div className="w-1/3">
//           {/* ... (this part remains the same) ... */}
//            <p className="text-sm font-medium mb-2">Post As</p>
//            <div className="flex items-center gap-3">
//              <Avatar className="h-10 w-10">
//                <AvatarImage src="/avatars/mahendra.jpg" />
//                <AvatarFallback>MS</AvatarFallback>
//              </Avatar>
//              <div>
//                <p className="font-medium">Mahendra Seervi</p>
//                <p className="text-sm text-gray-500">kalux@gmail.com</p>
//              </div>
//            </div>
//         </div>

//         {/* --- 3. RIGHT SIDE - Updated with new input fields --- */}
//         <div className="flex-1 space-y-3">
//           {/* Title Input */}
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm font-small placeholder:text-gray-500 border-gray-200"
//           />

//           {/* Content Textarea */}
//           <Textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="text-sm bg-gray-50 h-24 resize-none font-small"
//           />

//           {/* Tags Input */}
//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//           />

//           <div className="flex justify-between items-center">
//             <Button
//               variant="ghost"
//               className="text-gray-500 hover:text-gray-700 flex gap-2"
//             >
//               <Paperclip size={16} />
//             </Button>

//             <Button
//               onClick={handlePostSubmit}
//               disabled={isSubmitting || !title.trim() || !content.trim()}
//               className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 disabled:bg-purple-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// import { useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // 1. ADDED: The same helper function to read the token from the cookie
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }

// export default function CreatePostCard() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handlePostSubmit = async () => {
//     if (!title.trim() || !content.trim() || isSubmitting) {
//       alert("Please provide a title and content.");
//       return;
//     }

//     // 2. CHANGED: Retrieve the token dynamically from the cookie
//     const authToken = getCookie('token');

//     // 3. ADDED: A check to make sure the user is logged in
//     if (!authToken) {
//         alert("You must be logged in to create a post.");
//         return;
//     }

//     setIsSubmitting(true);

//     const postData = {
//       title: title,
//       content: content,
//       tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/posts-app/posts/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${authToken}`, // Use the dynamic token
//         },
//         body: JSON.stringify(postData),
//       });

//       if (response.ok) {
//         alert("Post created successfully!");
//         setTitle("");
//         setContent("");
//         setTags("");
//         // Optional: You might want to refresh the post list here
//         window.location.reload(); // Simple way to see the new post
//       } else {
//         const errorData = await response.json();
//         alert(`Error: ${JSON.stringify(errorData)}`);
//       }
//     } catch (error) {
//       alert("A network error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="border border-gray-200 hover:shadow-md transition-shadow p-4">
//       <div className="flex gap-4 items-start">
//         {/* LEFT SIDE - Post As (This is still hardcoded, should be updated with real user data) */}
//         <div className="w-1/3">
//           <p className="text-sm font-medium mb-2">Post As</p>
//           <div className="flex items-center gap-3">
//             <Avatar className="h-10 w-10">
//               <AvatarImage src="/avatars/mahendra.jpg" />
//               <AvatarFallback>MS</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="font-medium">Mahendra Seervi</p>
//               <p className="text-sm text-gray-500">kalux@gmail.com</p>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT SIDE - Form */}
//         <div className="flex-1 space-y-3">
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm font-small placeholder:text-gray-500 border-gray-200"
//           />
//           <Textarea
//             placeholder="What's on your mind?"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             className="text-sm bg-gray-50 h-24 resize-none font-small"
//           />
//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//           />
//           <div className="flex justify-between items-center">
//             <Button variant="ghost" className="text-gray-500 hover:text-gray-700 flex gap-2">
//               <Paperclip size={16} />
//             </Button>
//             <Button
//               onClick={handlePostSubmit}
//               disabled={isSubmitting || !title.trim() || !content.trim()}
//               className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 disabled:bg-purple-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
// import { useState, useEffect } from "react";
// // Removed MentionsInput and its CSS as they are unavailable in this environment.

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea"; // Using a standard textarea
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// // The 'import.meta.env' object is not available in this environment.
// // Replace "YOUR_API_BASE_URL_HERE" with your actual API endpoint.
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// // ✅ Cookie helper
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // ✅ API client
// const apiClient = {
//     async request(method, url, data = null, responseType = 'json') {
//         const headers = {};
//         const config = { method, headers };
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }
//         if (data && !(data instanceof FormData)) {
//             headers['Content-Type'] = 'application/json';
//             config.body = JSON.stringify(data);
//         } else if (data instanceof FormData) {
//             config.body = data;
//         }

//         // Handle cases where the base URL might not be set
//         if (!API_BASE_URL || API_BASE_URL === "YOUR_API_BASE_URL_HERE") {
//             const errorMsg = "API_BASE_URL is not configured. Please replace 'YOUR_API_BASE_URL_HERE' in the code.";
//             console.error(errorMsg);
//             throw new Error(errorMsg);
//         }
//         const fullUrl = `${API_BASE_URL}${url}`;

//         try {
//             const response = await fetch(fullUrl, config);
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(errorText || `Request failed with status ${response.status}`);
//             }
//             if (response.status === 204) return null;
//             if (responseType === 'blob') return response.blob();
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: (url) => apiClient.request('GET', url, null, 'json'),
//     getBlob: (url) => apiClient.request('GET', url, null, 'blob'),
//     post: (url, data) => apiClient.request('POST', url, data, 'json'),
// };

// // ✅ Name initials
// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function CreatePostCard({ onPostCreated }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState("");
//   const [userLoading, setUserLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//         const authToken = getCookie('token');
//         if (!authToken) {
//             setUserLoading(false);
//             return;
//         }

//         try {
//             const profileData = await apiClient.get('/api/users-app/profile/me/');
//             setUser(profileData);

//              if (profileData && profileData.avatar_url) {
//           setAvatarSrc(profileData.avatar_url);
//         }



//         } catch (error) {
//             console.error("Failed to load user profile data:", error);
//         } finally {
//             setUserLoading(false);
//         }
//     };

//     fetchUserData();

//     return () => {
//         if (avatarSrc) {
//             URL.revokeObjectURL(avatarSrc);
//         }
//     };
// }, []);

//   // ✅ Submit handler
//   const handlePostSubmit = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please provide a title and content.");
//       return;
//     }

//     const authToken = getCookie("token");
//     if (!authToken) {
//       alert("You must be logged in to create a post.");
//       return;
//     }

//     setIsSubmitting(true);

//     const postData = {
//       title,
//       content,
//       tags: tags
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter((tag) => tag),
//     };

//     try {
//       await apiClient.post("/api/posts-app/posts/", postData);
//       alert("Post created successfully!");
//       setTitle("");
//       setContent("");
//       setTags("");

//       if (onPostCreated) {
//         onPostCreated();
//       }

//     } catch (error) {
//       alert(`Error creating post: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200">
//       <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         {/* Left: user info */}
//         <div className="w-full md:w-1/3">
//           <p className="text-neutral-900 text-xl font-medium font-['General_Sans'] leading-loose mb-2">
//             Post As
//           </p>
//           {userLoading ? (
//             <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={avatarSrc} alt={user.full_name} />
//                 <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-neutral-900 text-sm font-medium font-['Inter'] leading-tight">
//                   {user.full_name}
//                 </p>
//                 <p className="text-neutral-600 text-xs font-normal font-['Inter'] leading-none">
//                   {user.email}
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Please log in to post.</p>
//           )}
//         </div>

//         {/* Right: post form */}
//         <div className="flex-1 space-y-3 w-full">
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm placeholder:text-gray-500 border-gray-200"
//             disabled={!user}
//           />

//          <Textarea
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="What's on your mind?"
//             className="text-sm placeholder:text-gray-500 border-gray-200 min-h-[80px]"
//             disabled={!user}
//           />

//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//             disabled={!user}
//           />

//           <div className="flex justify-between items-center">
//             <Button variant="ghost" className="text-gray-500 hover:text-gray-700 p-2">
//               <Paperclip size={16} />
//             </Button>
//             <Button
//               onClick={handlePostSubmit}
//               disabled={isSubmitting || !title.trim() || !content.trim() || !user}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }




// import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // ✅ Cookie helper
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // ✅ API client
// const apiClient = {
//   async request(method, url, data = null, responseType = "json") {
//     const headers = {};
//     const config = { method, headers };
//     const authToken = getCookie("token");
//     if (authToken) {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
//     if (data && !(data instanceof FormData)) {
//       headers["Content-Type"] = "application/json";
//       config.body = JSON.stringify(data);
//     } else if (data instanceof FormData) {
//       config.body = data;
//     }

//     if (!API_BASE_URL) {
//       throw new Error("API_BASE_URL is not configured.");
//     }
//     const fullUrl = `${API_BASE_URL}${url}`;

//     try {
//       const response = await fetch(fullUrl, config);
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || `Request failed: ${response.status}`);
//       }
//       if (response.status === 204) return null;
//       if (responseType === "blob") return response.blob();
//       return response.json();
//     } catch (error) {
//       console.error(`${method} ${fullUrl} failed:`, error);
//       throw error;
//     }
//   },
//   get: (url) => apiClient.request("GET", url),
//   post: (url, data) => apiClient.request("POST", url, data),
// };

// // ✅ Name initials
// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function CreatePostCard({ onPostCreated }) {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState("");
//   const [userLoading, setUserLoading] = useState(true);

//   // ✅ Mentions state
//   const [mentionQuery, setMentionQuery] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const textareaRef = useRef(null);

//   // ✅ Fetch logged-in user
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const authToken = getCookie("token");
//       if (!authToken) {
//         setUserLoading(false);
//         return;
//       }
//       try {
//         const profileData = await apiClient.get("/api/users-app/profile/me/");
//         setUser(profileData);
//         if (profileData?.avatar_url) {
//           setAvatarSrc(profileData.avatar_url);
//         }
//       } catch (error) {
//         console.error("Failed to load user profile:", error);
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // ✅ Detect @ typing
//   const handleContentChange = (e) => {
//     const value = e.target.value;
//     setContent(value);

//     const cursor = e.target.selectionStart;
//     const textBeforeCursor = value.slice(0, cursor);
//     const match = textBeforeCursor.match(/@(\w*)$/); // last @word
//     if (match) {
//       setMentionQuery(match[1]);
//     } else {
//       setMentionQuery("");
//       setShowDropdown(false);
//     }
//   };

//   // ✅ Fetch mention results (debounced)
//   useEffect(() => {
//     if (!mentionQuery) return;
//     const delay = setTimeout(async () => {
//       try {
//         const results = await apiClient.get(
//           `/api/posts-app/users/search/?search=${mentionQuery}`
//         );
//         setMentionResults(results);
//         setShowDropdown(true);
//       } catch (err) {
//         console.error("Mention search failed:", err);
//       }
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [mentionQuery]);

//   // ✅ Insert mention
//   const insertMention = (username) => {
//     const cursor = textareaRef.current.selectionStart;
//     const textBefore = content
//       .slice(0, cursor)
//       .replace(/@\w*$/, `@${username} `);
//     const textAfter = content.slice(cursor);
//     setContent(textBefore + textAfter);
//     setShowDropdown(false);
//     setMentionQuery("");
//     textareaRef.current.focus();
//   };

//   // ✅ Submit handler
//   const handlePostSubmit = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please provide a title and content.");
//       return;
//     }
//     const authToken = getCookie("token");
//     if (!authToken) {
//       alert("You must be logged in to create a post.");
//       return;
//     }
//     setIsSubmitting(true);

//     const postData = {
//       title,
//       content,
//       tags: tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean),
//     };

//     try {
//       await apiClient.post("/api/posts-app/posts/", postData);
//       alert("Post created successfully!");
//       setTitle("");
//       setContent("");
//       setTags("");
//       onPostCreated?.();
//     } catch (error) {
//       alert(`Error creating post: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
//       <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         {/* Left: user info */}
//         <div className="w-full md:w-1/3">
//           <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
//           {userLoading ? (
//             <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={avatarSrc} alt={user.full_name} />
//                 <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-neutral-900 text-sm font-medium">
//                   {user.full_name}
//                 </p>
//                 <p className="text-neutral-600 text-xs">{user.email}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Please log in to post.</p>
//           )}
//         </div>

//         {/* Right: post form */}
//         <div className="flex-1 space-y-3 w-full relative">
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm placeholder:text-gray-500 border-gray-200"
//             disabled={!user}
//           />

//           <div className="relative">
//             <Textarea
//               ref={textareaRef}
//               value={content}
//               onChange={handleContentChange}
//               placeholder="What's on your mind? Use @ to mention someone"
//               className="text-sm placeholder:text-gray-500 border-gray-200 min-h-[80px]"
//               disabled={!user}
//             />

//             {/* Mention dropdown */}
//             {showDropdown && mentionResults.length > 0 && (
//               <div className="absolute bg-white border rounded shadow-md mt-1 w-64 z-50">
//                 {mentionResults.map((u) => (
//                   <div
//                     key={u.id}
//                     className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => insertMention(u.username)}
//                   >
//                     <Avatar className="h-6 w-6">
//                       <AvatarImage src={u.avatar_url} />
//                       <AvatarFallback>{getInitials(u.full_name)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-medium text-blue-600">
//                         @{u.username}
//                       </p>
//                       <p className="text-xs text-gray-500">{u.headline}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//             disabled={!user}
//           />

//           <div className="flex justify-between items-center">
//             <Button
//               variant="ghost"
//               className="text-gray-500 hover:text-gray-700 p-2"
//             >
//               <Paperclip size={16} />
//             </Button>
//             <Button
//               onClick={handlePostSubmit}
//               disabled={
//                 isSubmitting || !title.trim() || !content.trim() || !user
//               }
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }










// import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // ✅ Cookie helper
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // ✅ API client
// const apiClient = {
//   async request(method, url, data = null) {
//     const headers = {};
//     const config = { method, headers };
//     const authToken = getCookie("token");
//     if (authToken) {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
//     if (data && !(data instanceof FormData)) {
//       headers["Content-Type"] = "application/json";
//       config.body = JSON.stringify(data);
//     } else if (data instanceof FormData) {
//       config.body = data;
//     }

//     const fullUrl = `${API_BASE_URL}${url}`;
//     const response = await fetch(fullUrl, config);
//     if (!response.ok) throw new Error(await response.text());
//     return response.json();
//   },
//   get: (url) => apiClient.request("GET", url),
//   post: (url, data) => apiClient.request("POST", url, data),
// };

// // ✅ Name initials
// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function CreatePostCard({ onPostCreated }) {
//   const [title, setTitle] = useState("");
//   const [rawContent, setRawContent] = useState(""); // plain text for API
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState("");
//   const [userLoading, setUserLoading] = useState(true);

//   // Mentions
//   const [mentionQuery, setMentionQuery] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const editorRef = useRef(null);

//   // ✅ Fetch logged-in user
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const authToken = getCookie("token");
//       if (!authToken) {
//         setUserLoading(false);
//         return;
//       }
//       try {
//         const profileData = await apiClient.get("/api/users-app/profile/me/");
//         setUser(profileData);
//         if (profileData?.avatar_url) setAvatarSrc(profileData.avatar_url);
//       } catch (error) {
//         console.error("Failed to load user profile:", error);
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // ✅ Detect @ typing
//   const handleInput = (e) => {
//     const text = e.target.innerText;
//     setRawContent(text);

//     const sel = window.getSelection();
//     const cursorPos = sel.focusOffset;
//     const beforeCursor = text.slice(0, cursorPos);
//     const match = beforeCursor.match(/@(\w*)$/);
//     if (match) {
//       setMentionQuery(match[1]);
//     } else {
//       setMentionQuery("");
//       setShowDropdown(false);
//     }
//   };

//   // ✅ Fetch mention results
//   useEffect(() => {
//     if (!mentionQuery) return;
//     const delay = setTimeout(async () => {
//       try {
//         const results = await apiClient.get(
//           `/api/posts-app/users/search/?search=${mentionQuery}`
//         );
//         setMentionResults(results);
//         setShowDropdown(true);
//       } catch (err) {
//         console.error("Mention search failed:", err);
//       }
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [mentionQuery]);

//   // ✅ Insert mention with blue highlight
//   const insertMention = (username, fullName) => {
//     const sel = window.getSelection();
//     const range = sel.getRangeAt(0);
//     range.deleteContents();

//     const span = document.createElement("span");
//     span.textContent = `@${fullName} `;
//     span.className = "text-blue-600 font-medium";
//     range.insertNode(span);

//     range.setStartAfter(span);
//     range.setEndAfter(span);
//     sel.removeAllRanges();
//     sel.addRange(range);

//     setShowDropdown(false);
//     setMentionQuery("");

//     setRawContent(editorRef.current.innerText);
//     editorRef.current.focus();
//   };

//   // ✅ Submit handler
//   const handlePostSubmit = async () => {
//     if (!title.trim() || !rawContent.trim()) {
//       alert("Please provide a title and content.");
//       return;
//     }
//     const authToken = getCookie("token");
//     if (!authToken) {
//       alert("You must be logged in to create a post.");
//       return;
//     }
//     setIsSubmitting(true);

//     const postData = {
//       title,
//       content: rawContent, // plain text for backend
//       tags: tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean),
//     };

//     try {
//       await apiClient.post("/api/posts-app/posts/", postData);
//       alert("Post created successfully!");
//       setTitle("");
//       setRawContent("");
//       setTags("");
//       editorRef.current.innerHTML = ""; // clear editor
//       onPostCreated?.();
//     } catch (error) {
//       alert(`Error creating post: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
//       <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         {/* Left: user info */}
//         <div className="w-full md:w-1/3">
//           <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
//           {userLoading ? (
//             <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={avatarSrc} alt={user.full_name} />
//                 <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-neutral-900 text-sm font-medium">
//                   {user.full_name}
//                 </p>
//                 <p className="text-neutral-600 text-xs">{user.email}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Please log in to post.</p>
//           )}
//         </div>

//         {/* Right: post form */}
//         <div className="flex-1 space-y-3 w-full relative">
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm placeholder:text-gray-500 border-gray-200"
//             disabled={!user}
//           />

//           {/* Rich text editor */}
//           <div className="relative">
//             <div
//               ref={editorRef}
//               contentEditable
//               onInput={handleInput}
//               className="min-h-[80px] border border-gray-200 rounded-md p-2 text-sm placeholder-gray-500 focus:outline-none"
//               data-placeholder="What's on your mind? Use @ to mention someone"
//             ></div>

//             {/* Mention dropdown */}
//             {showDropdown && mentionResults.length > 0 && (
//               <div className="absolute bg-white border rounded shadow-md mt-1 w-64 z-50">
//                 {mentionResults.map((u) => (
//                   <div
//                     key={u.id}
//                     className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => insertMention(u.username, u.full_name)} // 👈 fullname bhi pass
//                   >
//                     <Avatar className="h-6 w-6">
//                       <AvatarImage src={u.avatar_url} />
//                       <AvatarFallback>{getInitials(u.full_name)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-medium text-blue-600">@{u.username}</p>
//                       <p className="text-xs text-gray-500">{u.full_name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//           </div>

//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//             disabled={!user}
//           />

//           <div className="flex justify-between items-center">
//             <Button
//               variant="ghost"
//               className="text-gray-500 hover:text-gray-700 p-2"
//             >
//               <Paperclip size={16} />
//             </Button>
//             <Button
//               onClick={handlePostSubmit}
//               disabled={
//                 isSubmitting || !title.trim() || !rawContent.trim() || !user
//               }
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }





// import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// // ✅ Cookie helper
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // ✅ API client
// const apiClient = {
//   async request(method, url, data = null) {
//     const headers = {};
//     const config = { method, headers };
//     const authToken = getCookie("token");
//     if (authToken) {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
//     if (data && !(data instanceof FormData)) {
//       headers["Content-Type"] = "application/json";
//       config.body = JSON.stringify(data);
//     } else if (data instanceof FormData) {
//       config.body = data;
//     }

//     const fullUrl = `${API_BASE_URL}${url}`;
//     const response = await fetch(fullUrl, config);
//     if (!response.ok) throw new Error(await response.text());
//     return response.json();
//   },
//   get: (url) => apiClient.request("GET", url),
//   post: (url, data) => apiClient.request("POST", url, data),
// };

// // ✅ Name initials
// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function CreatePostCard({ onPostCreated }) {
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState("");
//   const [userLoading, setUserLoading] = useState(true);

//   // Mentions
//   const [mentionQuery, setMentionQuery] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState(null);

//   const editorRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const isInsertingMention = useRef(false); // <-- 1. ADDED a ref for the flag

//   // ✅ Fetch logged-in user
//   useEffect(() => {
//     const fetchUserData = async () => {
//       const authToken = getCookie("token");
//       if (!authToken) {
//         setUserLoading(false);
//         return;
//       }
//       try {
//         const profileData = await apiClient.get("/api/users-app/profile/me/");
//         setUser(profileData);
//         if (profileData?.avatar_url) setAvatarSrc(profileData.avatar_url);
//       } catch (error) {
//         console.error("Failed to load user profile:", error);
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   // ✅ Save cursor position before dropdown interaction
//   const saveCursorPosition = () => {
//     const sel = window.getSelection();
//     if (sel.rangeCount > 0) {
//       setCursorPosition(sel.getRangeAt(0).cloneRange());
//     }
//   };

//   // ✅ Restore cursor position
//   const restoreCursorPosition = () => {
//     if (cursorPosition) {
//       const sel = window.getSelection();
//       sel.removeAllRanges();
//       sel.addRange(cursorPosition);
//     }
//   };

//   // ✅ Detect @ typing
//   const handleInput = (e) => {
//     if (isInsertingMention.current) return; // <-- 2. UPDATED: Add guard clause

//     const sel = window.getSelection();
//     if (sel.rangeCount === 0) return;

//     const range = sel.getRangeAt(0);
//     const textNode = range.startContainer;
//     const offset = range.startOffset;

//     let beforeCursor = "";
//     if (textNode.nodeType === Node.TEXT_NODE) {
//       beforeCursor = textNode.textContent.slice(0, offset);
//     } else {
//       const tempRange = document.createRange();
//       tempRange.selectNodeContents(editorRef.current);
//       tempRange.setEnd(range.startContainer, range.startOffset);
//       beforeCursor = tempRange.toString();
//     }
    
//     const match = beforeCursor.match(/@(\w*)$/);
//     if (match) {
//       setMentionQuery(match[1]);
//       saveCursorPosition();
//     } else {
//       setMentionQuery("");
//       setShowDropdown(false);
//     }
//   };

//   // ✅ Fetch mention results
//   useEffect(() => {
//     if (!mentionQuery && mentionQuery !== "") return;
    
//     const delay = setTimeout(async () => {
//       try {
//         const results = await apiClient.get(
//           `/api/posts-app/users/search/?search=${mentionQuery}`
//         );
//         setMentionResults(results);
//         setShowDropdown(results.length > 0);
//       } catch (err) {
//         console.error("Mention search failed:", err);
//       }
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [mentionQuery]);

//   // ✅ Insert mention with blue highlight -- FULLY UPDATED FUNCTION
//   const insertMention = (username, fullName) => {
//     isInsertingMention.current = true; // Set the flag

//     restoreCursorPosition();
    
//     const sel = window.getSelection();
//     if (sel.rangeCount === 0) {
//       isInsertingMention.current = false; // Reset on early return
//       return;
//     }
    
//     const range = sel.getRangeAt(0);
    
//     const textNode = range.startContainer;
//     if (textNode.nodeType === Node.TEXT_NODE) {
//       const text = textNode.textContent;
//       const offset = range.startOffset;
//       const beforeText = text.slice(0, offset);
//       const atIndex = beforeText.lastIndexOf('@');
      
//       if (atIndex !== -1) {
//         range.setStart(textNode, atIndex);
//         range.setEnd(textNode, offset);
//         range.deleteContents();
//       }
//     }
    
//     const span = document.createElement("span");
//     span.textContent = `@${fullName}`;
//     span.style.color = "#2563eb";
//     span.style.fontWeight = "500";
//     span.setAttribute("data-mention", "true");
//     span.setAttribute("data-username", username);
//     span.setAttribute("data-fullname", fullName);
    
//     range.insertNode(span);
    
//     const space = document.createTextNode("\u00A0"); // Use non-breaking space
//     range.setStartAfter(span);
//     range.collapse(true);
//     range.insertNode(space);
    
//     range.setStartAfter(space);
//     range.collapse(true);
    
//     sel.removeAllRanges();
//     sel.addRange(range);
    
//     setShowDropdown(false);
//     setMentionQuery("");
//     setCursorPosition(null);
//     editorRef.current.focus();

//     setTimeout(() => {
//       isInsertingMention.current = false; // Reset the flag after event queue
//     }, 0);
//   };

//   // ✅ Get plain text with mentions preserved
//   const getContentWithMentions = () => {
//     // This function can be simplified
//     return editorRef.current?.innerText || "";
//   };

//   // ✅ Submit handler
//   const handlePostSubmit = async () => {
//     const plainContent = getContentWithMentions();
    
//     if (!title.trim() || !plainContent.trim()) {
//       alert("Please provide a title and content.");
//       return;
//     }
//     const authToken = getCookie("token");
//     if (!authToken) {
//       alert("You must be logged in to create a post.");
//       return;
//     }
//     setIsSubmitting(true);
    
//     const postData = {
//       title,
//       content: plainContent, // Send plain text to backend
//       tags: tags
//         .split(",")
//         .map((t) => t.trim())
//         .filter(Boolean),
//     };

//     try {
//       await apiClient.post("/api/posts-app/posts/", postData);
//       alert("Post created successfully!");
//       setTitle("");
//       setTags("");
//       if (editorRef.current) editorRef.current.innerHTML = "";
//       onPostCreated?.();
//     } catch (error) {
//       alert(`Error creating post: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
//           editorRef.current && !editorRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
//       <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         {/* Left: user info */}
//         <div className="w-full md:w-1/3">
//           <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
//           {userLoading ? (
//             <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={avatarSrc} alt={user.full_name} />
//                 <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-neutral-900 text-sm font-medium">
//                   {user.full_name}
//                 </p>
//                 <p className="text-neutral-600 text-xs">{user.email}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Please log in to post.</p>
//           )}
//         </div>

//         {/* Right: post form */}
//         <div className="flex-1 space-y-3 w-full relative">
//           <Input
//             type="text"
//             placeholder="Post Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="text-sm placeholder:text-gray-500 border-gray-200"
//             disabled={!user}
//           />

//           {/* Rich text editor */}
//           <div className="relative">
//             {/* ✅ Corrected Rich Text Editor Div */}
// <div
//     ref={editorRef}
//     contentEditable={!!user}
//     onInput={handleInput}
//     onClick={handleClick}
//     // The className is the only part that's changed
//     className="min-h-[80px] w-full rounded-md border border-gray-200 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:pointer-events-none empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)]"
//     data-placeholder="What's on your mind? Use @ to mention someone"
//     onPaste={(e) => {
//         e.preventDefault();
//         const text = e.clipboardData.getData('text/plain');
//         document.execCommand('insertText', false, text);
//     }}
// ></div>

//             {/* Mention dropdown */}
//             {showDropdown && mentionResults.length > 0 && (
//               <div 
//                 ref={dropdownRef}
//                 className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-64 max-h-48 overflow-y-auto z-50"
//               >
//                 {mentionResults.map((u) => (
//                   <div
//                     key={u.id}
//                     className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
//                     onMouseDown={(e) => {
//                       e.preventDefault(); // Prevent focus loss
//                       insertMention(u.username, u.full_name);
//                     }}
//                   >
//                     <Avatar className="h-6 w-6">
//                       <AvatarImage src={u.avatar_url} />
//                       <AvatarFallback className="text-xs">{getInitials(u.full_name)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-medium">@{u.username}</p>
//                       <p className="text-xs text-gray-500">{u.full_name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <Input
//             type="text"
//             placeholder="Tags (e.g., django, react, news)"
//             value={tags}
//             onChange={(e) => setTags(e.target.value)}
//             className="text-sm border-gray-200"
//             disabled={!user}
//           />

//           <div className="flex justify-between items-center">
//             <Button
//               variant="ghost"
//               className="text-gray-500 hover:text-gray-700 p-2"
//             >
//               <Paperclip size={16} />
//             </Button>
//             <Button
//               onClick={handlePostSubmit}
//               disabled={
//                 isSubmitting || !title.trim() || !editorRef.current?.textContent?.trim() || !user
//               }
//               className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300"
//             >
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// import { useState, useEffect, useRef } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Paperclip } from "lucide-react";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

// // Cookie helper
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // API client
// const apiClient = {
//   async request(method, url, data = null) {
//     const headers = {};
//     const config = { method, headers };
//     const authToken = getCookie("token");
//     if (authToken) {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
//     if (data && !(data instanceof FormData)) {
//       headers["Content-Type"] = "application/json";
//       config.body = JSON.stringify(data);
//     } else if (data instanceof FormData) {
//       config.body = data;
//     }

//     const fullUrl = `${API_BASE_URL}${url}`;
//     const response = await fetch(fullUrl, config);
//     if (!response.ok) throw new Error(await response.text());
//     return response.json();
//   },
//   get: (url) => apiClient.request("GET", url),
//   post: (url, data) => apiClient.request("POST", url, data),
// };

// // Name initials
// const getInitials = (name = "") =>
//   name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();

// export default function CreatePostCard({ onPostCreated }) {
//   const [title, setTitle] = useState("");
//   const [tags, setTags] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [user, setUser] = useState(null);
//   const [avatarSrc, setAvatarSrc] = useState("");
//   const [userLoading, setUserLoading] = useState(true);
//   const [mentionQuery, setMentionQuery] = useState("");
//   const [mentionResults, setMentionResults] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [cursorPosition, setCursorPosition] = useState(null);
//   const [mentionedUsers, setMentionedUsers] = useState([]);
//   const editorRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const isInsertingMention = useRef(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const authToken = getCookie("token");
//       if (!authToken) {
//         setUserLoading(false);
//         return;
//       }
//       try {
//         const profileData = await apiClient.get("/api/users-app/profile/me/");
//         setUser(profileData);
//         if (profileData?.avatar_url) setAvatarSrc(profileData.avatar_url);
//       } catch (error) {
//         console.error("Failed to load user profile:", error);
//       } finally {
//         setUserLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const saveCursorPosition = () => {
//     const sel = window.getSelection();
//     if (sel.rangeCount > 0) {
//       setCursorPosition(sel.getRangeAt(0).cloneRange());
//     }
//   };

//   const restoreCursorPosition = () => {
//     if (cursorPosition) {
//       const sel = window.getSelection();
//       sel.removeAllRanges();
//       sel.addRange(cursorPosition);
//     }
//   };

//   const getBeforeCursorText = () => {
//     const sel = window.getSelection();
//     if (sel.rangeCount === 0) return "";
  
//     const range = sel.getRangeAt(0);
//     const textNode = range.startContainer;
//     const offset = range.startOffset;
  
//     if (textNode.nodeType === Node.TEXT_NODE) {
//       return textNode.textContent.slice(0, offset);
//     }
//     return "";
//   };
  
//   const handleInput = () => {
//     if (isInsertingMention.current) return;
    
//     const beforeCursor = getBeforeCursorText();
//     const match = beforeCursor.match(/@(\w*)$/);
//     if (match) {
//       setMentionQuery(match[1]);
//       saveCursorPosition();
//     } else {
//       setShowDropdown(false);
//     }
//   };

//   const checkAndCloseDropdown = () => {
//     const beforeCursor = getBeforeCursorText();
//     const match = beforeCursor.match(/@(\w*)$/);
//     if (!match) {
//       setShowDropdown(false);
//     }
//   };
  
//   const handleClick = () => {
//     checkAndCloseDropdown();
//   };

//   // ✅ NEW FUNCTION TO HANDLE KEYBOARD
//   const handleKeyDown = (e) => {
//     if (!showDropdown) return;

//     const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
//     if (e.key === 'Escape') {
//       setShowDropdown(false);
//       e.preventDefault();
//     } else if (navigationKeys.includes(e.key)) {
//       // Check after a tiny delay to allow the cursor to move
//       setTimeout(checkAndCloseDropdown, 0);
//     }
//   };

//   useEffect(() => {
//     if (mentionQuery === null || mentionQuery === undefined) return;
//     if (mentionQuery === "") {
//         setShowDropdown(false);
//         return;
//     }
//     const delay = setTimeout(async () => {
//       try {
//         const results = await apiClient.get(`/api/posts-app/users/search/?search=${mentionQuery}`);
//         setMentionResults(results);
//         setShowDropdown(results.length > 0);
//       } catch (err) {
//         console.error("Mention search failed:", err);
//       }
//     }, 300);
//     return () => clearTimeout(delay);
//   }, [mentionQuery]);

//   const insertMention = (username, fullName) => {
//     setMentionedUsers(prevUsers => [...prevUsers, { username, fullName }]);
//     isInsertingMention.current = true;
//     restoreCursorPosition();
    
//     const sel = window.getSelection();
//     if (sel.rangeCount === 0) {
//       isInsertingMention.current = false;
//       return;
//     }
    
//     const range = sel.getRangeAt(0);
//     const textNode = range.startContainer;
//     if (textNode.nodeType === Node.TEXT_NODE) {
//       const atIndex = textNode.textContent.slice(0, range.startOffset).lastIndexOf('@');
//       if (atIndex !== -1) {
//         range.setStart(textNode, atIndex);
//         range.deleteContents();
//       }
//     }
    
//     const span = document.createElement("span");
//     span.textContent = `@${fullName}`;
//     span.style.color = "#2563eb";
//     span.style.fontWeight = "500";
//     span.setAttribute("data-mention", "true");
//     span.setAttribute("data-username", username);
//     span.setAttribute("data-fullname", fullName);
    
//     range.insertNode(span);
    
//     const space = document.createTextNode("\u00A0");
//     range.setStartAfter(span);
//     range.collapse(true);
//     range.insertNode(space);
    
//     range.setStartAfter(space);
//     range.collapse(true);
//     sel.removeAllRanges();
//     sel.addRange(range);
    
//     setShowDropdown(false);
//     setMentionQuery("");
//     editorRef.current.focus();

//     setTimeout(() => {
//       isInsertingMention.current = false;
//     }, 10);
//   };

//   const handlePostSubmit = async () => {
//     const plainContent = editorRef.current?.innerText || "";
//     if (!title.trim() || !plainContent.trim()) {
//       alert("Please provide a title and content.");
//       return;
//     }
//     setIsSubmitting(true);
//     const mentionedUsernames = mentionedUsers.map(user => user.username);
//     const postData = {
//       title,
//       content: plainContent,
//       tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
//        mentions: mentionedUsernames,
//     };
//     try {
//       await apiClient.post("/api/posts-app/posts/", postData);
//       setTitle("");
//       setTags("");
//       if (editorRef.current) editorRef.current.innerHTML = "";
//       setMentionedUsers([]); 
//       onPostCreated?.();
//     } catch (error) {
//       alert(`Error creating post: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
//           editorRef.current && !editorRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
//       <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
//         <div className="w-full md:w-1/3">
//           <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
//           {userLoading ? (
//             <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src={avatarSrc} alt={user.full_name} />
//                 <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-neutral-900 text-sm font-medium">{user.full_name}</p>
//                 <p className="text-neutral-600 text-xs">{user.email}</p>
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-500">Please log in to post.</p>
//           )}
//         </div>
//         <div className="flex-1 space-y-3 w-full relative">
//           <Input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-sm placeholder:text-gray-500 border-gray-200" disabled={!user} />
//           <div className="relative">
//             <div
//               ref={editorRef}
//               contentEditable={!!user}
//               onInput={handleInput}
//               onClick={handleClick}
//               onKeyDown={handleKeyDown} // ✅ ADDED onKeyDown HANDLER
//               className="min-h-[80px] w-full rounded-md border border-gray-200 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:pointer-events-none empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)]"
//               data-placeholder="What's on your mind? Use @ to mention someone"
//               onPaste={(e) => {
//                   e.preventDefault();
//                   const text = e.clipboardData.getData('text/plain');
//                   document.execCommand('insertText', false, text);
//               }}
//             ></div>
//             {showDropdown && mentionResults.length > 0 && (
//               <div ref={dropdownRef} className="absolute bg-white border border-gray-200 rounded-lg shadow-lg mt-1 w-64 max-h-48 overflow-y-auto z-50">
//                 {mentionResults.map((u) => (
//                   <div key={u.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer transition-colors"
//                     onMouseDown={(e) => {
//                       e.preventDefault();
//                       insertMention(u.username, u.full_name);
//                     }}>
//                     <Avatar className="h-6 w-6">
//                       <AvatarImage src={u.avatar_url} />
//                       <AvatarFallback className="text-xs">{getInitials(u.full_name)}</AvatarFallback>
//                     </Avatar>
//                     <div>
//                       <p className="text-sm font-medium">@{u.username}</p>
//                       <p className="text-xs text-gray-500">{u.full_name}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <Input type="text" placeholder="Tags (e.g., django, react, news)" value={tags} onChange={(e) => setTags(e.target.value)} className="text-sm border-gray-200" disabled={!user} />
//           <div className="flex justify-between items-center">
//             <Button variant="ghost" className="text-gray-500 hover:text-gray-700 p-2"><Paperclip size={16} /></Button>
//             <Button onClick={handlePostSubmit} disabled={isSubmitting || !title.trim() || !editorRef.current?.textContent?.trim() || !user} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300">
//               {isSubmitting ? "Posting..." : "Post"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }



import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

// Cookie helper
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// API client
const apiClient = {
  async request(method, url, data = null) {
    const headers = {};
    const config = { method, headers };
    const authToken = getCookie("token");
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    if (data && !(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data);
    } else if (data instanceof FormData) {
      config.body = data;
    }

    const fullUrl = `${API_BASE_URL}${url}`;
    const response = await fetch(fullUrl, config);
    if (!response.ok) throw new Error(await response.text());
    return response.json();
  },
  get: (url) => apiClient.request("GET", url),
  post: (url, data) => apiClient.request("POST", url, data),
};

// Name initials
const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export default function CreatePostCard({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [avatarSrc, setAvatarSrc] = useState("");
  const [userLoading, setUserLoading] = useState(true);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionResults, setMentionResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(null);
  const [mentionedUsers, setMentionedUsers] = useState([]);

  const editorRef = useRef(null);
  const dropdownRef = useRef(null);
  const isInsertingMention = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = getCookie("token");
      if (!authToken) {
        setUserLoading(false);
        return;
      }
      try {
        const profileData = await apiClient.get("/api/users-app/profile/me/");
        setUser(profileData);
        if (profileData?.avatar_url) setAvatarSrc(profileData.avatar_url);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUserData();
  }, []);

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
    if (textNode.nodeType === Node.TEXT_NODE) {
      return textNode.textContent.slice(0, offset);
    }
    return "";
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

  const checkAndCloseDropdown = () => {
    const beforeCursor = getBeforeCursorText();
    const match = beforeCursor.match(/@([\w\s]*)$/);
    if (!match) {
      setShowDropdown(false);
    }
  };
  
  const handleClick = () => {
    checkAndCloseDropdown();
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
    if (e.key === 'Escape') {
      setShowDropdown(false);
      e.preventDefault();
    } else if (navigationKeys.includes(e.key)) {
      setTimeout(checkAndCloseDropdown, 0);
    }
  };

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

  const insertMention = (username, fullName) => {
    setMentionedUsers(prevUsers => {
      if (!prevUsers.some(user => user.username === username)) {
        return [...prevUsers, { username, fullName }];
      }
      return prevUsers;
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
      const text = textNode.textContent;
      const atIndex = text.slice(0, range.startOffset).lastIndexOf('@');
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

    setTimeout(() => {
      isInsertingMention.current = false;
    }, 10);
  };

  // ✅ THIS IS THE FUNCTION THAT CREATES THE CORRECT CONTENT FOR THE BACKEND
  const getContentForBackend = () => {
    if (!editorRef.current) return "";

    let contentString = "";
    const nodes = editorRef.current.childNodes;

    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        contentString += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.getAttribute('data-mention') === 'true') {
          const username = node.getAttribute('data-username');
          contentString += `@${username}`;
        } else {
          contentString += node.textContent;
        }
      }
    });
    return contentString.replace(/\u00A0/g, ' ');
  };

  // ✅ THIS FUNCTION NOW USES getContentForBackend
  const handlePostSubmit = async () => {
    const contentForBackend = getContentForBackend();
    
    if (!title.trim() || !contentForBackend.trim()) {
      alert("Please provide a title and content.");
      return;
    }
    setIsSubmitting(true);

    const mentionedUsernames = mentionedUsers.map(user => user.username);

    const postData = {
      title,
      content: contentForBackend, // Use the translated content
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      mentions: mentionedUsernames,
    };

    try {
      await apiClient.post("/api/posts-app/posts/", postData);
      setTitle("");
      setTags("");
      if (editorRef.current) editorRef.current.innerHTML = "";
      setMentionedUsers([]);
      onPostCreated?.();
    } catch (error) {
      alert(`Error creating post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          editorRef.current && !editorRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card className="bg-white rounded-lg p-4 outline-1 outline-neutral-200 relative">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
        <div className="w-full md:w-1/3">
          <p className="text-neutral-900 text-xl font-medium mb-2">Post As</p>
          {userLoading ? (
            <div className="h-10 animate-pulse bg-gray-200 rounded-md w-full"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarSrc} alt={user.full_name} />
                <AvatarFallback>{getInitials(user.full_name)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-neutral-900 text-sm font-medium">{user.full_name}</p>
                <p className="text-neutral-600 text-xs">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Please log in to post.</p>
          )}
        </div>
        <div className="flex-1 space-y-3 w-full relative">
          <Input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} className="text-sm placeholder:text-gray-500 border-gray-200 whitespace-pre-wrap break-words break-all overflow-hidden" disabled={!user} />
          <div className="relative">
            <div
              ref={editorRef}
              contentEditable={!!user}
              onInput={handleInput}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              className="min-h-[80px] w-full rounded-md border border-gray-200 p-2 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 empty:before:pointer-events-none empty:before:text-gray-500 empty:before:content-[attr(data-placeholder)] whitespace-pre-wrap break-words break-all overflow-hidden"
              data-placeholder="What's on your mind? Use @ to mention someone"
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
                      <p className="text-sm font-medium">@{u.username}</p>
                      <p className="text-xs text-gray-500">{u.full_name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Input type="text" placeholder="Tags (e.g., django, react, news)" value={tags} onChange={(e) => setTags(e.target.value)} className="text-sm border-gray-200" disabled={!user} />
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700 p-2"><Paperclip size={16} /></Button>
            <Button onClick={handlePostSubmit} disabled={isSubmitting || !title.trim() || !editorRef.current?.textContent?.trim() || !user} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-1 h-auto text-sm disabled:bg-indigo-300">
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}