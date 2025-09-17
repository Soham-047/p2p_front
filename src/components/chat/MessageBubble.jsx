


import { useState } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
export default function MessageBubble({ text, sender, time, senderName ,avatar_url ,meurl}) {
  const [expanded, setExpanded] = useState(false);

  const CHAR_LIMIT = 150;

  // Enhanced regex to handle URLs separated by commas and newlines
  const urlRegex = /(https?:\/\/[^\s,\n]+)/g;
  const allUrls = text?.match(urlRegex) || [];

  // Remove URLs from text and clean up extra whitespace/commas
  const messageText = text
    ?.replace(urlRegex, "")
    ?.replace(/,\s*,/g, ",") // Remove double commas
    ?.replace(/,\s*$/g, "") // Remove trailing commas
    ?.replace(/^\s*,/g, "") // Remove leading commas
    ?.replace(/\s+/g, " ") // Replace multiple spaces with single space
    ?.trim();

  // Filter URLs by type
  const imageUrls = allUrls.filter(url => 
    url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i)
  );
  const videoUrls = allUrls.filter(url => 
    url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)
  );
  const otherUrls = allUrls.filter(url => 
    !url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|ogg|mov|avi|mkv)$/i)
  );

  const isLong = messageText?.length > CHAR_LIMIT;
  const displayText =
    expanded || !isLong
      ? messageText
      : messageText.slice(0, CHAR_LIMIT) + "…";

  // Component for single image message
  const ImageMessage = ({ url, index, isLast }) => (
    <div
      key={`img-${index}`}
      className={cn(
        "flex flex-col",
        sender === "me"
          ? "ml-auto items-end px-3 sm:px-5"
          : "mr-auto items-start px-3 sm:px-5",
        index === 0 ? "pt-2" : "pt-1" // Less spacing for subsequent images
      )}
    >
      <div
        className={cn(
          "p-2 rounded-2xl shadow-sm max-w-[85%] sm:max-w-md",
          sender === "me"
            ? "bg-indigo-100"
            : "bg-gray-100"
        )}
      >
        <img
          src={url}
          alt={`Image ${index + 1}`}
          className="rounded-lg max-h-60 w-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div style={{ display: 'none' }} className="text-sm text-gray-500 p-2">
          ⚠️ Failed to load image
        </div>
      </div>
      {/* Show time only on the last image */}
      {isLast && (
        <span className="text-[11px] text-gray-400 mt-1">{time}</span>
      )}
    </div>
  );

  // Component for single video message
  const VideoMessage = ({ url, index, isLast }) => (
    <div
      key={`vid-${index}`}
      className={cn(
        "flex flex-col",
        sender === "me"
          ? "ml-auto items-end px-3 sm:px-5"
          : "mr-auto items-start px-3 sm:px-5",
        index === 0 ? "pt-2" : "pt-1"
      )}
    >
      <div
        className={cn(
          "p-2 rounded-2xl shadow-sm max-w-[85%] sm:max-w-md",
          sender === "me"
            ? "bg-indigo-100"
            : "bg-gray-100"
        )}
      >
        <video
          src={url}
          controls
          className="rounded-lg max-h-60 w-full object-cover"
        />
      </div>
      {isLast && (
        <span className="text-[11px] text-gray-400 mt-1">{time}</span>
      )}
    </div>
  );

  // Main text message component
  const TextMessage = ({ showTime = true }) => (
    <div
      className={cn(
        "flex flex-col pt-4",
        sender === "me"
          ? "ml-auto items-end px-3 sm:px-5"
          : "mr-auto items-start px-3 sm:px-5"
      )}
    >
      {/* Sender label */}
      {sender === "other" && (
        <span className="text-sm text-gray-500 mb-1">{senderName}</span>
      )}
      {sender === "me" && (
        <span className="text-sm text-indigo-500 mb-1">Me</span>
      )}

      <div
        className={cn(
          "px-4 py-2 rounded-2xl text-lg shadow-sm whitespace-pre-wrap break-words",
          "max-w-[85%] sm:max-w-md",
          sender === "me"
            ? "bg-indigo-100 text-indigo-900"
            : "bg-gray-100 text-gray-900"
        )}
        style={{ wordBreak: "break-word" }}
      >
        {/* Other URLs (non-media) */}
        {otherUrls.length > 0 && (
          <div className="mb-2">
            {otherUrls.map((url, i) => (
              <div key={i} className="mb-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm break-all"
                >
                  {url}
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Text content */}
        {messageText && (
          <span>
            {displayText}
            {isLong && (
              <button
                onClick={() => setExpanded((prev) => !prev)}
                className="ml-1 text-xs text-indigo-600 hover:underline"
              >
                {expanded ? "View less" : "View more"}
              </button>
            )}
          </span>
        )}
      </div>

      {showTime && (
        <span className="text-[11px] text-gray-400 mt-1">{time}</span>
      )}
    </div>
  );

  // Determine if we should show time on text message
  const hasMedia = imageUrls.length > 0 || videoUrls.length > 0;
  const showTimeOnText = !hasMedia;

  return (
    <>
      {/* Text Message (if there's text content or other URLs) */}
      {(messageText || otherUrls.length > 0) && (
        <TextMessage showTime={showTimeOnText} />
      )}

      {/* Individual Image Messages */}
      {imageUrls.map((url, index) => (
        <ImageMessage 
          key={`img-${index}`}
          url={url} 
          index={index}
          isLast={index === imageUrls.length - 1 && videoUrls.length === 0}
        />
      ))}

      {/* Individual Video Messages */}
      {videoUrls.map((url, index) => (
        <VideoMessage 
          key={`vid-${index}`}
          url={url} 
          index={index}
          isLast={index === videoUrls.length - 1}
        />
      ))}
    </>
  );
}








// import { useState } from "react";
// import { cn } from "@/lib/utils";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// export default function MessageBubble({ text, sender, time, senderName ,avatar_url ,meurl}) {
//   const [expanded, setExpanded] = useState(false);

//   const CHAR_LIMIT = 150;

//   // Enhanced regex to handle URLs separated by commas and newlines
//   const urlRegex = /(https?:\/\/[^\s,\n]+)/g;
//   const allUrls = text?.match(urlRegex) || [];

//   // Remove URLs from text and clean up extra whitespace/commas
//   const messageText = text
//     ?.replace(urlRegex, "")
//     ?.replace(/,\s*,/g, ",") // Remove double commas
//     ?.replace(/,\s*$/g, "") // Remove trailing commas
//     ?.replace(/^\s*,/g, "") // Remove leading commas
//     ?.replace(/\s+/g, " ") // Replace multiple spaces with single space
//     ?.trim();

//   // Filter URLs by type
//   const imageUrls = allUrls.filter(url => 
//     url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i)
//   );
//   const videoUrls = allUrls.filter(url => 
//     url.match(/\.(mp4|webm|ogg|mov|avi|mkv)$/i)
//   );
//   const otherUrls = allUrls.filter(url => 
//     !url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|mp4|webm|ogg|mov|avi|mkv)$/i)
//   );

//   const isLong = messageText?.length > CHAR_LIMIT;
//   const displayText =
//     expanded || !isLong
//       ? messageText
//       : messageText.slice(0, CHAR_LIMIT) + "…";

//   // Component for single image message
//   const ImageMessage = ({ url, index, isLast }) => (
//     <div
//       key={`img-${index}`}
//       className={cn(
//         "flex flex-col",
//         sender === "me"
//           ? "ml-auto items-end px-3 sm:px-5"
//           : "mr-auto items-start px-3 sm:px-5",
//         index === 0 ? "pt-2" : "pt-1" // Less spacing for subsequent images
//       )}
//     >
//       <div
//         className={cn(
//           "p-2 rounded-2xl shadow-sm max-w-[85%] sm:max-w-md",
//           sender === "me"
//             ? "bg-indigo-100"
//             : "bg-gray-100"
//         )}
//       >
//         <img
//           src={url}
//           alt={`Image ${index + 1}`}
//           className="rounded-lg max-h-60 w-full object-cover"
//           onError={(e) => {
//             e.target.style.display = 'none';
//             e.target.nextSibling.style.display = 'block';
//           }}
//         />
//         <div style={{ display: 'none' }} className="text-sm text-gray-500 p-2">
//           ⚠️ Failed to load image
//         </div>
//       </div>
//       {/* Show time only on the last image */}
//       {isLast && (
//         <span className="text-[11px] text-gray-400 mt-1">{time}</span>
//       )}
//     </div>
//   );

//   // Component for single video message
//   const VideoMessage = ({ url, index, isLast }) => (
//     <div
//       key={`vid-${index}`}
//       className={cn(
//         "flex flex-col",
//         sender === "me"
//           ? "ml-auto items-end px-3 sm:px-5"
//           : "mr-auto items-start px-3 sm:px-5",
//         index === 0 ? "pt-2" : "pt-1"
//       )}
//     >
//       <div
//         className={cn(
//           "p-2 rounded-2xl shadow-sm max-w-[85%] sm:max-w-md",
//           sender === "me"
//             ? "bg-indigo-100"
//             : "bg-gray-100"
//         )}
//       >
//         <video
//           src={url}
//           controls
//           className="rounded-lg max-h-60 w-full object-cover"
//         />
//       </div>
//       {isLast && (
//         <span className="text-[11px] text-gray-400 mt-1">{time}</span>
//       )}
//     </div>
//   );

//   // Main text message component
//   const TextMessage = ({ showTime = true }) => (
   
// <div
//   className={cn(
//     "flex items-start gap-2 pt-4", // added flex row for avatar + content
//     sender === "me"
//       ? "ml-auto justify-end px-3 sm:px-5"
//       : "mr-auto justify-start px-3 sm:px-5"
//   )}
// >
//   {/* Avatar */}
  
//   <Avatar className="h-8 w-8">
//     <AvatarImage
//       src={
//         sender === "me"
//           ? meurl || `https://i.pravatar.cc/150?u=me`
//           : avatar_url || `https://i.pravatar.cc/150?u=${senderName}`
//       }
//       alt={sender === "me" ? "Me" : senderName}
//     />
//     <AvatarFallback>
//       {sender === "me" ? "M" : senderName?.[0]?.toUpperCase() || "U"}
//     </AvatarFallback>
//   </Avatar>

//   {/* Message content */}
//   <div className="flex flex-col">
//     {/* Sender label */}
//     {sender === "other" && (
//       <span className="text-sm text-gray-500 mb-1">{senderName}</span>
//     )}
//     {sender === "me" && (
//       <span className="text-sm text-indigo-500 mb-1">Me</span>
//     )}

//     <div
//       className={cn(
//         "px-4 py-2 rounded-2xl text-lg shadow-sm whitespace-pre-wrap break-words",
//         "max-w-[85%] sm:max-w-md",
//         sender === "me"
//           ? "bg-indigo-100 text-indigo-900"
//           : "bg-gray-100 text-gray-900"
//       )}
//       style={{ wordBreak: "break-word" }}
//     >
//       {/* Other URLs (non-media) */}
//       {otherUrls.length > 0 && (
//         <div className="mb-2">
//           {otherUrls.map((url, i) => (
//             <div key={i} className="mb-1">
//               <a
//                 href={url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline text-sm break-all"
//               >
//                 {url}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Text content */}
//       {messageText && (
//         <span>
//           {displayText}
//           {isLong && (
//             <button
//               onClick={() => setExpanded((prev) => !prev)}
//               className="ml-1 text-xs text-indigo-600 hover:underline"
//             >
//               {expanded ? "View less" : "View more"}
//             </button>
//           )}
//         </span>
//       )}
//     </div>

//     {showTime && (
//       <span className="text-[11px] text-gray-400 mt-1">{time}</span>
//     )}
//   </div>
// </div>
//   );

//   // Determine if we should show time on text message
//   const hasMedia = imageUrls.length > 0 || videoUrls.length > 0;
//   const showTimeOnText = !hasMedia;

//   return (
//     <>
    
//       {/* Text Message (if there's text content or other URLs) */}
//       {(messageText || otherUrls.length > 0) && (
//         <TextMessage showTime={showTimeOnText} />
//       )}

//       {/* Individual Image Messages */}
//       {imageUrls.map((url, index) => (
//         <ImageMessage 
//           key={`img-${index}`}
//           url={url} 
//           index={index}
//           isLast={index === imageUrls.length - 1 && videoUrls.length === 0}
//         />
//       ))}

//       {/* Individual Video Messages */}
//       {videoUrls.map((url, index) => (
//         <VideoMessage 
//           key={`vid-${index}`}
//           url={url} 
//           index={index}
//           isLast={index === videoUrls.length - 1}
//         />
//       ))}
//     </>
//   );
// }


