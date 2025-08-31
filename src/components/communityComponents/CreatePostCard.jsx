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

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Paperclip } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. ADDED: The same helper function to read the token from the cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export default function CreatePostCard() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostSubmit = async () => {
    if (!title.trim() || !content.trim() || isSubmitting) {
      alert("Please provide a title and content.");
      return;
    }

    // 2. CHANGED: Retrieve the token dynamically from the cookie
    const authToken = getCookie('token');

    // 3. ADDED: A check to make sure the user is logged in
    if (!authToken) {
        alert("You must be logged in to create a post.");
        return;
    }

    setIsSubmitting(true);

    const postData = {
      title: title,
      content: content,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}`, // Use the dynamic token
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        setTags("");
        // Optional: You might want to refresh the post list here
        window.location.reload(); // Simple way to see the new post
      } else {
        const errorData = await response.json();
        alert(`Error: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert("A network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow p-4">
      <div className="flex gap-4 items-start">
        {/* LEFT SIDE - Post As (This is still hardcoded, should be updated with real user data) */}
        <div className="w-1/3">
          <p className="text-sm font-medium mb-2">Post As</p>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/avatars/mahendra.jpg" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Mahendra Seervi</p>
              <p className="text-sm text-gray-500">kalux@gmail.com</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="flex-1 space-y-3">
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-sm font-small placeholder:text-gray-500 border-gray-200"
          />
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-sm bg-gray-50 h-24 resize-none font-small"
          />
          <Input
            type="text"
            placeholder="Tags (e.g., django, react, news)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="text-sm border-gray-200"
          />
          <div className="flex justify-between items-center">
            <Button variant="ghost" className="text-gray-500 hover:text-gray-700 flex gap-2">
              <Paperclip size={16} />
            </Button>
            <Button
              onClick={handlePostSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 disabled:bg-purple-300"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}