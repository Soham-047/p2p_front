import { useState, useEffect } from "react";
import ProjectsDialog from "./ProjectForm";
import { Button } from "@/components/ui/button";
import { PenLine, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";

export default function ProjectsSection({
  projects: initialProjects = [],
  profile,
  onProfileUpdate,
}) {
  const [projects, setProjects] = useState(initialProjects);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [showAll, setShowAll] = useState(false);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleSaved = (savedProject) => {
    if (!savedProject) return;

    setProjects((prevProjects) => {
      let updatedProjects;
      const existingIndex = prevProjects.findIndex(
        (p) => p.id === savedProject.id
      );

      if (existingIndex !== -1) {
        updatedProjects = prevProjects.map((p) =>
          p.id === savedProject.id ? savedProject : p
        );
      } else {
        updatedProjects = [...prevProjects, savedProject];
      }

      if (onProfileUpdate) {
        onProfileUpdate({ ...profile, projects: updatedProjects });
      }

      return updatedProjects;
    });

    setEditing(null);
    setOpen(false);
  };

  const handleAddProject = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleEditProject = (project) => {
    setEditing(project);
    setOpen(true);
  };

  const handleDeleted = async (id) => {
    try {
      await api.delete(`/api/users-app/profile/me/projects/${id}/`);
      const updatedProjects = projects.filter((p) => p.id !== id);
      setProjects(updatedProjects);

      if (onProfileUpdate) {
        onProfileUpdate({ ...profile, projects: updatedProjects });
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setEditing(null);
  };

  // Show only 2 projects unless "View More" clicked
  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button
          size="icon"
          variant="ghost"
          onClick={handleAddProject}
          className="rounded-full"
          title="Add Project"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {projects.length === 0 && (
        <p className="text-gray-500">No projects yet.</p>
      )}

      <ul className="space-y-4">
        {visibleProjects.map((project) => (
          <li
            key={project.id}
            className="w-full group flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-sm pb-2 pl-2 border-b border-gray-100"
          >
            <div className="w-full break-all">
              <div className="w-full flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm sm:text-base break-all">
                  {project.title}
                </h4>
                <div className="flex gap-2 mt-3 self-end">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleEditProject(project)}
                    className="rounded-full border-gray-300 hover:bg-blue-50 text-blue-600"
                    title="Edit"
                  >
                    <PenLine className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleted(project.id)}
                    className="rounded-full border-gray-300 hover:bg-red-50 text-red-600"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base break-all p-1">
                {expanded[project.id]
                  ? project.description
                  : project.description?.slice(0, 150)}

                {project.description?.length > 150 && (
                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="ml-1 text-blue-600 hover:underline text-sm"
                  >
                    {expanded[project.id] ? "View Less" : "View More"}
                  </button>
                )}
              </p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm sm:text-base break-all"
                >
                  View Project
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>

      {projects.length > 2 && (
        <div className="mt-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className=" text-blue-600 font-semibold w-full justify-center"
          >
            {showAll ? "Show Less" : "View More"}
          </button>
        </div>
      )}

      <ProjectsDialog
        open={open}
        setOpen={handleDialogClose}
        project={editing}
        onSaved={handleSaved}
      />
    </div>
  );
}













// import { useState, useEffect } from "react";
// import ProjectsDialog from "./ProjectForm";
// import { Button } from "@/components/ui/button";
// import { PenLine, Trash2, Plus } from "lucide-react";
// import { api } from "@/lib/api";

// export default function ProjectsSection({
//   projects: initialProjects = [],
//   profile,
//   onProfileUpdate,
// }) {
//   const [projects, setProjects] = useState(initialProjects);
//   const [open, setOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [expanded, setExpanded] = useState({});
//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };
  
//   useEffect(() => {
//     setProjects(initialProjects);
//   }, [initialProjects]);

//   const handleSaved = (savedProject) => {
//     console.log("Project saved:", savedProject); // Debug log
    
//     if (!savedProject) {
//       console.error("No saved project data received");
//       return;
//     }

//     setProjects((prevProjects) => {
//       let updatedProjects;
      
//       // Check if we're updating an existing project
//       const existingIndex = prevProjects.findIndex((p) => p.id === savedProject.id);
      
//       if (existingIndex !== -1) {
//         // Update existing project
//         updatedProjects = prevProjects.map((p) => 
//           p.id === savedProject.id ? savedProject : p
//         );
//         console.log("Updated existing project");
//       } else {
//         // Add new project
//         updatedProjects = [...prevProjects, savedProject];
//         console.log("Added new project");
//       }

//       // Update the profile with new projects list
//       if (onProfileUpdate) {
//         onProfileUpdate({ ...profile, projects: updatedProjects });
//       }

//       return updatedProjects;
//     });

//     // Reset editing state and close dialog
//     setEditing(null);
//     setOpen(false);
//   };

//   const handleAddProject = () => {
//     setEditing(null); // Make sure we're not in edit mode
//     setOpen(true);
//   };

//   const handleEditProject = (project) => {
//     setEditing(project);
//     setOpen(true);
//   };

//   const handleDeleted = async (id) => {
//     try {
//       await api.delete(`/api/users-app/profile/me/projects/${id}/`);
//       const updatedProjects = projects.filter((p) => p.id !== id);
//       setProjects(updatedProjects);
      
//       if (onProfileUpdate) {
//         onProfileUpdate({ ...profile, projects: updatedProjects });
//       }
      
//       console.log("Project deleted successfully");
//     } catch (err) {
//       console.error("Delete failed:", err);
//       // You might want to show an error message to the user
//     }
//   };

//   const handleDialogClose = () => {
//     setOpen(false);
//     setEditing(null);
//   };

//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-xl shadow w-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Projects</h3>
//         <Button
//           size="icon"
//           variant="ghost"
//           onClick={handleAddProject}
//           className="rounded-full"
//           title="Add Project"
//         >
//           <Plus className="h-4 w-4" />
//         </Button>
//       </div>

//       {projects.length === 0 && (
//         <p className="text-gray-500">No projects yet.</p>
//       )}

//       <ul className="space-y-4">
//         {projects.map((project) => (
          
//           <li
//             key={project.id}
//             className="w-full group flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-sm pb-2 pl-2 border-b border-gray-100"
//           >
//             <div className="w-full break-all">
//               <div className="w-full flex justify-between items-center mb-4">
//                 <h4 className="font-bold text-sm sm:text-base break-all">
//                   {project.title}
//                 </h4>
//                 <div className="flex gap-2 mt-3 self-end">
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleEditProject(project)}
//                     className="rounded-full border-gray-300 hover:bg-blue-50 text-blue-600"
//                     title="Edit"
//                   >
//                     <PenLine className="h-4 w-4" />
//                   </Button>

//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => handleDeleted(project.id)}
//                     className="rounded-full border-gray-300 hover:bg-red-50 text-red-600"
//                     title="Delete"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               </div>
//               <p className="text-gray-700 text-sm sm:text-base break-all p-1">
//               {expanded[project.id]
//     ? project.description
//     : project.description?.slice(0, 150)}

//   {project.description?.length > 150 && (
//     <button
//       onClick={() => toggleExpand(project.id)}
//       className="ml-1 text-blue-600 hover:underline text-sm"
//     >
//       {expanded[project.id] ? "View Less" : "View More"}
//     </button>
//   )}
//               </p>
//               {project.link && (
//                 <a
//                   href={project.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline text-sm sm:text-base break-all"
//                 >
//                   View Project
//                 </a>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>

//       <ProjectsDialog
//         open={open}
//         setOpen={handleDialogClose}
//         project={editing}
//         onSaved={handleSaved}
//       />
//     </div>
//   );
// }

