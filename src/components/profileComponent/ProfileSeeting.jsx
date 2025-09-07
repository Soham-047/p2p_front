// import React, { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"

// export default function ProfileSettings() {
//   const [form, setForm] = useState({
//     fullName: "Mahendra Saervi",
//     collegeEmail: "kaluxcod@gmail.com",
//     personalEmail: "",
//     bio: "",
//     institution: "Indian Institute of Information Technology",
//     degree: "Bachelor of Technology",
//     startYear: new Date("2022-11-01"),
//     endYear: new Date("2026-06-01"),
//     location: "",
//     experiences: "",
//     links: "",
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   // ✅ Custom styles
//   const inputClass =
//     " ring-0 focus-visible:ring-1 focus-visible:ring-purple-500 rounded-2xl bg-white border border-gray-200 overflow-hidden h-12 px-3"
//   const textareaClass =
//     " ring-0 focus-visible:ring-1 focus-visible:ring-purple-500 rounded-2xl bg-white border border-gray-200 min-h-[90px] p-3 resize-y md:max-w-5xl w-full"

//   return (
//     <Card className="p-6 shadow-lg border border-transparent">
//       <CardContent className="space-y-6">
//         <h1 className="text-3xl font-bold">Profile Setting</h1>

//         {/* Profile Photo */}
//         <div className="flex items-center gap-4">
//           <img
//             src="https://via.placeholder.com/80"
//             alt="profile"
//             className="h-20 w-20 rounded-full object-cover shadow-md"
//           />
//           <Button variant="outline" className="rounded-2xl">
//             Change Photo
//           </Button>
//         </div>

//         {/* Full Name + College Email */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-600">Full Name</label>
//             <Input
//               className={inputClass}
//               name="fullName"
//               value={form.fullName}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">College Email</label>
//             <Input
//               className={inputClass}
//               name="collegeEmail"
//               value={form.collegeEmail}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Personal Email + Location */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="text-sm text-gray-600">Personal Email</label>
//             <Input
//               className={inputClass}
//               name="personalEmail"
//               value={form.personalEmail}
//               onChange={handleChange}
//               placeholder="personal email"
//             />
//           </div>
//           <div>
//             <label className="text-sm text-gray-600">Location</label>
//             <Input
//               className={inputClass}
//               name="location"
//               value={form.location}
//               onChange={handleChange}
//               placeholder="City, Country"
//             />
//           </div>
//         </div>

//         {/* Bio */}
//         <div>
//           <label className="text-sm text-gray-600">Bio</label>
//           <Textarea
//             className={textareaClass}
//             name="bio"
//             value={form.bio}
//             onChange={handleChange}
//             placeholder="Tell us a bit about yourself"
//           />
//         </div>

//         {/* Experiences */}
//         <div>
//           <label className="text-sm text-gray-600">Experiences</label>
//           <Textarea
//             className={textareaClass}
//             name="experiences"
//             value={form.experiences}
//             onChange={handleChange}
//             placeholder="Add experiences (comma separated or JSON later)"
//           />
//         </div>

//         {/* Links */}
//         <div>
//           <label className="text-sm text-gray-600">Links</label>
//           <Textarea
//             className={textareaClass + " whitespace-pre-wrap"}
//             name="links"
//             value={form.links}
//             onChange={handleChange}
//             placeholder="Portfolio, LinkedIn, GitHub..."
//           />
//         </div>

//         {/* Education */}
//         <div className="border border-gray-200  p-4 rounded-lg">
//           <h3 className="text-lg font-semibold mb-2">Education</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Input
//               className={inputClass}
//               name="institution"
//               value={form.institution}
//               onChange={handleChange}
//               placeholder="Institution"
//             />
//             <Input
//               className={inputClass}
//               name="degree"
//               value={form.degree}
//               onChange={handleChange}
//               placeholder="Degree"
//             />

//             {/* Start Year Picker */}
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="justify-start text-left font-normal rounded-2xl h-12 bg-white border border-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {form.startYear ? format(form.startYear, "MMMM yyyy") : "Pick Start Month"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-white">
//                 <Calendar
//                   mode="single"
//                   selected={form.startYear}
//                   onSelect={(date) => date && setForm({ ...form, startYear: date })}
//                   month={form.startYear}
//                   onMonthChange={(date) => setForm({ ...form, startYear: date })}
//                 />
//               </PopoverContent>
//             </Popover>

//             {/* End Year Picker */}
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="justify-start text-left font-normal rounded-2xl h-12 bg-white border border-gray-200"
//                 >
//                   <CalendarIcon className="mr-2 h-4 w-4" />
//                   {form.endYear ? format(form.endYear, "MMMM yyyy") : "Pick End Month"}
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0 bg-white">
//                 <Calendar
//                   mode="single"
//                   selected={form.endYear}
//                   onSelect={(date) => date && setForm({ ...form, endYear: date })}
//                   month={form.endYear}
//                   onMonthChange={(date) => setForm({ ...form, endYear: date })}
//                 />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-center">
//           <Button className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl text-lg h-12">
//             Save Changes
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }




// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
// import { format, parseISO, isValid } from "date-fns";

// // --- API Client with Bearer Token Authentication ---
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// const apiClient = {
//     async request(method, url, data = null, isFormData = false) {
//         const headers = {};
//         const config = { 
//             method, 
//             headers,
//         };
        
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }

//         if (data) {
//             if (isFormData) {
//                 config.body = data;
//             } else {
//                 headers['Content-Type'] = 'application/json';
//                 config.body = JSON.stringify(data);
//             }
//         }
        
//         const fullUrl = `${API_BASE_URL}${url}`;

//         try {
//             const response = await fetch(fullUrl, config);
//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || `Request failed with status ${response.status}`);
//                 } catch (e) {
//                     throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
//                 }
//             }
//             if (response.status === 204) { // Handle "No Content" for DELETE requests
//                 return null;
//             }
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: function(url) { return this.request('GET', url); },
//     post: function(url, data, isFormData = false) { return this.request('POST', url, data, isFormData); },
//     put: function(url, data, isFormData = false) { return this.request('PUT', url, data, isFormData);},
//     patch: function(url, data, isFormData = false) { return this.request('PATCH', url, data, isFormData); },
//     delete: function(url) { return this.request('DELETE', url); },
// };
// // --- End API Client ---


// export default function ProfileSettings() {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);
    
//     const avatarFileRef = useRef(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [avatarFile, setAvatarFile] = useState(null);
    
//     // UI State for modals
//     const [editingIntro, setEditingIntro] = useState(false);
//     const [editingWork, setEditingWork] = useState(null);
//     const [addingWork, setAddingWork] = useState(false);
//     const [editingEducation, setEditingEducation] = useState(null);
//     const [addingEducation, setAddingEducation] = useState(false);
//     const [editingSkill, setEditingSkill] = useState(null);
//     const [addingSkill, setAddingSkill] = useState(false);

//     const fetchProfile = async () => {
//         try {
//             setLoading(true);
//             const [ profileData, experiences, educations, skills ] = await Promise.all([
//                 apiClient.get("/api/profile/me/"),
//                 apiClient.get("/api/profile/me/experiences/"),
//                 apiClient.get("/api/profile/me/education/"),
//                 apiClient.get("/api/profile/me/skills/"),
//             ]);
            
//             const fullProfile = {
//                 ...profileData,
//                 experiences: experiences.map(exp => ({ 
//                     ...exp, 
//                     start_date: exp.start_date && isValid(parseISO(exp.start_date)) ? parseISO(exp.start_date) : null, 
//                     end_date: exp.end_date && isValid(parseISO(exp.end_date)) ? parseISO(exp.end_date) : null 
//                 })),
//                 // ✅ FIX: Convert integer year from API into a Date object for the calendar picker
//                 educations: educations.map(edu => ({
//                     ...edu,
//                     start_year: edu.start_year ? new Date(edu.start_year, 0, 1) : null,
//                     end_year: edu.end_year ? new Date(edu.end_year, 0, 1) : null,
//                 })),
//                 skills: skills || [],
//             };
//             setProfile(fullProfile);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
//     const handleModalChange = (model, stateIndex, field, value) => {
//         const item = profile[model][stateIndex];
//         const updatedItem = {...item, [field]: value};
//         const newItems = [...profile[model]];
//         newItems[stateIndex] = updatedItem;
//         setProfile({...profile, [model]: newItems});
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setAvatarPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };
    
//     // ✅ FIX: This function now correctly sends JSON for text updates and FormData for file uploads.
//     const handleSaveIntro = async () => {
//         setSaving(true);
//         try {
//             if (avatarFile) {
//                 // If there's a file, use FormData
//                 const formData = new FormData();
//                 formData.append('full_name', profile.full_name || '');
//                 formData.append('headline', profile.headline || '');
//                 formData.append('about', profile.about || '');
//                 formData.append('avatar', avatarFile);
//                 await apiClient.patch("/api/profile/me/", formData, true);
//             } else {
//                 // If it's just text, use a plain JSON object
//                 const payload = {
//                     full_name: profile.full_name || '',
//                     headline: profile.headline || '',
//                     about: profile.about || '',
//                 };
//                 await apiClient.patch("/api/profile/me/", payload, false);
//             }
    
//             setEditingIntro(false);
//             setAvatarFile(null);
//             setAvatarPreview(null);
//             fetchProfile(); 
//         } catch(e) { 
//             console.error("Failed to save intro:", e);
//             setError(e.message || "Could not save profile intro.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
//         setSaving(true);
//         const item = profile[model][stateIndex];
//         const payload = { ...item };

//         // ✅ FIX: Handle education years and experience dates separately
//         if (apiPath === 'education') {
//             if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
//             if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
//         } else { // for experiences
//             if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
//             if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
//         }

//         try {
//             if (isAdding) {
//                 await apiClient.post(`/api/profile/me/${apiPath}/`, payload);
//             } else {
//                 await apiClient.patch(`/api/profile/me/${apiPath}/${item.id}/`, payload);
//             }
//             closeFn();
//             fetchProfile();
//         } catch(e) { 
//             console.error(e);
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleDeleteItem = async (apiPath, id, closeFn) => {
//         if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
//         try {
//             await apiClient.delete(`/api/profile/me/${apiPath}/${id}/`);
//             closeFn();
//             fetchProfile();
//         } catch(e) { console.error(e) }
//     };

//     if (loading) return <div className="text-center p-10">Loading profile...</div>;
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please ensure you are logged in.</div>;
//     if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
//     // --- Render logic (no changes needed below this line) ---
//     const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
//     const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
    
//     const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
//     const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
//     const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

//                 {/* --- Introduction Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-start">
//                         <div className="flex items-center gap-5">
//                             <img src={profile.avatar_url || "https://placehold.co/96x96/EFEFEF/7F7F7F?text=Avatar"} alt="profile" className="h-24 w-24 rounded-full object-cover" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
//                                 <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                     </div>
//                 </div>

//                 {/* --- About Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
//                        <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
//                 </div>

//                 {/* --- Experience Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, experiences: [...profile.experiences, {title: "", company: ""}]}); setAddingWork(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-4">
//                            {profile.experiences.map((exp, index) => (
//                                <div key={exp.id || `new-${index}`} className="flex gap-4 items-start">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{exp.title || "Job Title"}</h3>
//                                        <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
//                                        <p className="text-xs text-gray-500">{exp.start_date ? format(exp.start_date, 'MMM yyyy') : ''} - {exp.end_date ? format(exp.end_date, 'MMM yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingWork(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Education Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Education</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, educations: [...profile.educations, {school: "", degree: ""}]}); setAddingEducation(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-4">
//                            {profile.educations.map((edu, index) => (
//                                <div key={edu.id || `new-${index}`} className="flex gap-4 items-start">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{edu.school || "School / University"}</h3>
//                                        <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
//                                        <p className="text-xs text-gray-500">{edu.start_year ? format(edu.start_year, 'yyyy') : ''} - {edu.end_year ? format(edu.end_year, 'yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingEducation(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Skills Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]}); setAddingSkill(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="flex flex-wrap gap-2">
//                            {profile.skills.map((skill, index) => (
//                                <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
//                                    <span className="font-medium text-sm text-gray-800">{skill.name}</span>
//                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}><Edit className="h-4 w-4 text-gray-500 hover:text-gray-800"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>


//                 {/* MODALS */}
//                 {editingIntro && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Edit intro</h2><Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}><X/></Button></div>
//                             <div className="flex items-center gap-4"><img src={avatarPreview || profile.avatar_url || "https://placehold.co/80x80"} alt="profile" className="h-20 w-20 rounded-full object-cover" /><input type="file" ref={avatarFileRef} onChange={handleAvatarChange} accept="image/*" hidden /><Button variant="outline" onClick={() => avatarFileRef.current.click()}>Change Photo</Button></div>
//                             <div><label className="text-sm font-medium">Full Name</label><Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Headline</label><Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">About</label><Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} /></div>
//                             <div className="flex justify-end gap-3 pt-4"><Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentWorkData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2><Button variant="ghost" size="icon" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>Title</label><Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} /></div><div><label>Company</label><Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} /></div></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.start_date ? format(currentWorkData.start_date, "MMMM yyyy") : "Start Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentWorkData.start_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date)} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.end_date ? format(currentWorkData.end_date, "MMMM yyyy") : "End Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentWorkData.end_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date)} /></PopoverContent></Popover>
//                             </div>
//                             <div><label>Description</label><Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} /></div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('experiences', currentWorkData.id, () => {setEditingWork(null); setAddingWork(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, () => {setEditingWork(null); setAddingWork(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentEducationData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2><Button variant="ghost" size="icon" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>School</label><Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} /></div><div><label>Degree</label><Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} /></div></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.start_year ? format(currentEducationData.start_year, "yyyy") : "Start Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEducationData.start_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.end_year ? format(currentEducationData.end_year, "yyyy") : "End Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEducationData.end_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear() + 5} /></PopoverContent></Popover>
//                             </div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('education', currentEducationData.id, () => {setEditingEducation(null); setAddingEducation(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, () => {setEditingEducation(null); setAddingEducation(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}

//                 {currentSkillData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2><Button variant="ghost" size="icon" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}><X/></Button></div>
//                             <div><label>Skill Name</label><Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} /></div>
//                             <div><label>Proficiency Level</label>
//                                 <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
//                                     <option>Beginner</option>
//                                     <option>Intermediate</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('skills', currentSkillData.id, () => {setEditingSkill(null); setAddingSkill(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, () => {setEditingSkill(null); setAddingSkill(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
// import { format, parseISO, isValid } from "date-fns";

// // --- API Client and Helpers ---
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// // The apiClient is kept for handling save/delete actions efficiently
// const apiClient = {
//     async request(method, url, data = null, isFormData = false) {
//         const headers = {};
//         const config = { 
//             method, 
//             headers,
//         };
        
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }

//         if (data) {
//             if (isFormData) {
//                 config.body = data;
//             } else {
//                 headers['Content-Type'] = 'application/json';
//                 config.body = JSON.stringify(data);
//             }
//         }
        
//         const fullUrl = `${API_BASE_URL}${url}`;

//         try {
//             const response = await fetch(fullUrl, config);
            
//             if (response.status === 401) {
//                 // Optional: For better user experience, auto-logout on 401
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//                 window.location.href = '/login'; 
//                 throw new Error("Authentication failed.");
//             }

//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || `Request failed with status ${response.status}`);
//                 } catch (e) {
//                     throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
//                 }
//             }
//             if (response.status === 204) {
//                 return null;
//             }
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: function(url) { return this.request('GET', url); },
//     post: function(url, data, isFormData = false) { return this.request('POST', url, data, isFormData); },
//     put: function(url, data, isFormData = false) { return this.request('PUT', url, data, isFormData);},
//     patch: function(url, data, isFormData = false) { return this.request('PATCH', url, data, isFormData); },
//     delete: function(url) { return this.request('DELETE', url); },
// };
// // --- End API Client ---


// export default function ProfileSettings() {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);
    
//     const avatarFileRef = useRef(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [avatarFile, setAvatarFile] = useState(null);
    
//     // UI State for modals
//     const [editingIntro, setEditingIntro] = useState(false);
//     const [editingWork, setEditingWork] = useState(null);
//     const [addingWork, setAddingWork] = useState(false);
//     const [editingEducation, setEditingEducation] = useState(null);
//     const [addingEducation, setAddingEducation] = useState(false);
//     const [editingSkill, setEditingSkill] = useState(null);
//     const [addingSkill, setAddingSkill] = useState(false);

//     const fetchProfile = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const authToken = getCookie('token');
//             if (!authToken) {
//                 throw new Error("Authentication token not found. Please log in.");
//             }

//             const headers = { Authorization: `Bearer ${authToken}` };
            
//             const urls = [
//                 `${API_BASE_URL}/api/profile/me/`,
//                 `${API_BASE_URL}/api/profile/me/experiences/`,
//                 `${API_BASE_URL}/api/profile/me/education/`,
//                 `${API_BASE_URL}/api/profile/me/skills/`,
//             ];

//             const responses = await Promise.all(
//                 urls.map(url => fetch(url, { headers }))
//             );

//             for (const res of responses) {
//                 if (!res.ok) {
//                     throw new Error(`Failed to fetch data: Server responded with status ${res.status}`);
//                 }
//             }

//             const [profileData, experiences, educations, skills] = await Promise.all(
//                 responses.map(res => res.json())
//             );
            
//             const fullProfile = {
//                 ...profileData,
//                 experiences: experiences.map(exp => ({ 
//                     ...exp, 
//                     start_date: exp.start_date && isValid(parseISO(exp.start_date)) ? parseISO(exp.start_date) : null, 
//                     end_date: exp.end_date && isValid(parseISO(exp.end_date)) ? parseISO(exp.end_date) : null 
//                 })),
//                 educations: educations.map(edu => ({
//                     ...edu,
//                     start_year: edu.start_year ? new Date(edu.start_year, 0, 1) : null,
//                     end_year: edu.end_year ? new Date(edu.end_year, 0, 1) : null,
//                 })),
//                 skills: skills || [],
//             };
//             setProfile(fullProfile);

//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
//     const handleModalChange = (model, stateIndex, field, value) => {
//         const item = profile[model][stateIndex];
//         const updatedItem = {...item, [field]: value};
//         const newItems = [...profile[model]];
//         newItems[stateIndex] = updatedItem;
//         setProfile({...profile, [model]: newItems});
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setAvatarPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };
    
//     const handleSaveIntro = async () => {
//         setSaving(true);
//         try {
//             if (avatarFile) {
//                 const formData = new FormData();
//                 formData.append('full_name', profile.full_name || '');
//                 formData.append('headline', profile.headline || '');
//                 formData.append('about', profile.about || '');
//                 formData.append('avatar', avatarFile);
//                 formData.append('Location', profile.location || '');
//                 await apiClient.patch("/api/profile/me/", formData, true);
//             } else {
//                 const payload = {
//                     full_name: profile.full_name || '',
//                     headline: profile.headline || '',
//                     about: profile.about || '',
//                 };
//                 await apiClient.patch("/api/profile/me/", payload, false);
//             }
    
//             setEditingIntro(false);
//             setAvatarFile(null);
//             setAvatarPreview(null);
//             fetchProfile(); 
//         } catch(e) { 
//             console.error("Failed to save intro:", e);
//             setError(e.message || "Could not save profile intro.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
//         setSaving(true);
//         const item = profile[model][stateIndex];
//         const payload = { ...item };

//         if (apiPath === 'education') {
//             if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
//             if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
//         } else {
//             if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
//             if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
//         }

//         try {
//             if (isAdding) {
//                 await apiClient.post(`/api/profile/me/${apiPath}/`, payload);
//             } else {
//                 await apiClient.patch(`/api/profile/me/${apiPath}/${item.id}/`, payload);
//             }
//             closeFn();
//             fetchProfile();
//         } catch(e) { 
//             console.error(e);
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleDeleteItem = async (apiPath, id, closeFn) => {
//         if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
//         try {
//             await apiClient.delete(`/api/profile/me/${apiPath}/${id}/`);
//             closeFn();
//             fetchProfile();
//         } catch(e) { console.error(e) }
//     };

//     if (loading) return <div className="text-center p-10">Loading profile...</div>;
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please try logging out and back in.</div>;
//     if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
//     const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
//     const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
    
//     const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
//     const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
//     const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;

//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

//                 {/* --- Introduction Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-start">
//                         <div className="flex items-center gap-5">
//                             <img src={profile.avatar_url || "https://placehold.co/96x96/EFEFEF/7F7F7F?text=Avatar"} alt="profile" className="h-24 w-24 rounded-full object-cover" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
//                                 <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                     </div>
//                 </div>

//                 {/* --- About Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
//                        <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
//                 </div>

//                 {/* --- Experience Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, experiences: [...profile.experiences, {title: "", company: ""}]}); setAddingWork(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-4">
//                            {profile.experiences.map((exp, index) => (
//                                <div key={exp.id || `new-${index}`} className="flex gap-4 items-start">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{exp.title || "Job Title"}</h3>
//                                        <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
//                                        <p className="text-xs text-gray-500">{exp.start_date ? format(exp.start_date, 'MMM yyyy') : ''} - {exp.end_date ? format(exp.end_date, 'MMM yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingWork(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Education Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Education</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, educations: [...profile.educations, {school: "", degree: ""}]}); setAddingEducation(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-4">
//                            {profile.educations.map((edu, index) => (
//                                <div key={edu.id || `new-${index}`} className="flex gap-4 items-start">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0"></div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{edu.school || "School / University"}</h3>
//                                        <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
//                                        <p className="text-xs text-gray-500">{edu.start_year ? format(edu.start_year, 'yyyy') : ''} - {edu.end_year ? format(edu.end_year, 'yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingEducation(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Skills Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]}); setAddingSkill(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="flex flex-wrap gap-2">
//                            {profile.skills.map((skill, index) => (
//                                <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
//                                    <span className="font-medium text-sm text-gray-800">{skill.name}</span>
//                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}><Edit className="h-4 w-4 text-gray-500 hover:text-gray-800"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>


//                 {/* MODALS */}
//                 {editingIntro && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Edit intro</h2><Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}><X/></Button></div>
//                             <div className="flex items-center gap-4"><img src={avatarPreview || profile.avatar_url || "https://placehold.co/80x80"} alt="profile" className="h-20 w-20 rounded-full object-cover" /><input type="file" ref={avatarFileRef} onChange={handleAvatarChange} accept="image/*" hidden /><Button variant="outline" onClick={() => avatarFileRef.current.click()}>Change Photo</Button></div>
//                             <div><label className="text-sm font-medium">Full Name</label><Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Headline</label><Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">About</label><Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} /></div>
//                             <div className="flex justify-end gap-3 pt-4"><Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentWorkData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2><Button variant="ghost" size="icon" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>Title</label><Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} /></div><div><label>Company</label><Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} /></div></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.start_date ? format(currentWorkData.start_date, "MMMM yyyy") : "Start Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentWorkData.start_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date)} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.end_date ? format(currentWorkData.end_date, "MMMM yyyy") : "End Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentWorkData.end_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date)} /></PopoverContent></Popover>
//                             </div>
//                             <div><label>Description</label><Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} /></div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('experiences', currentWorkData.id, () => {setEditingWork(null); setAddingWork(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, () => {setEditingWork(null); setAddingWork(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentEducationData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2><Button variant="ghost" size="icon" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>School</label><Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} /></div><div><label>Degree</label><Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} /></div></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.start_year ? format(currentEducationData.start_year, "yyyy") : "Start Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEducationData.start_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.end_year ? format(currentEducationData.end_year, "yyyy") : "End Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={currentEducationData.end_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear() + 5} /></PopoverContent></Popover>
//                             </div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('education', currentEducationData.id, () => {setEditingEducation(null); setAddingEducation(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, () => {setEditingEducation(null); setAddingEducation(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}

//                 {currentSkillData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2><Button variant="ghost" size="icon" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}><X/></Button></div>
//                             <div><label>Skill Name</label><Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} /></div>
//                             <div><label>Proficiency Level</label>
//                                 <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
//                                     <option>Beginner</option>
//                                     <option>Intermediate</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-between items-center pt-4"><Button variant="destructive" onClick={() => handleDeleteItem('skills', currentSkillData.id, () => {setEditingSkill(null); setAddingSkill(false)})}>Delete</Button><div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, () => {setEditingSkill(null); setAddingSkill(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }












// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";

// import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
// import { format, parseISO, isValid } from "date-fns";

// // --- API Client and Helpers ---
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// const apiClient = {
//     async request(method, url, data = null, isFormData = false) {
//         const headers = {};
//         const config = { method, headers };
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }
//         if (data) {
//             if (isFormData) {
//                 config.body = data;
//             } else {
//                 headers['Content-Type'] = 'application/json';
//                 config.body = JSON.stringify(data);
//             }
//         }
//         const fullUrl = `${API_BASE_URL}${url}`;
//         try {
//             const response = await fetch(fullUrl, config);
//             if (response.status === 401) {
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//                 window.location.href = '/login'; 
//                 throw new Error("Authentication failed.");
//             }
//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || `Request failed with status ${response.status}`);
//                 } catch (e) {
//                     throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
//                 }
//             }
//             if (response.status === 204) {
//                 return null;
//             }
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: (url) => apiClient.request('GET', url),
//     post: (url, data, isFormData = false) => apiClient.request('POST', url, data, isFormData),
//     patch: (url, data, isFormData = false) => apiClient.request('PATCH', url, data, isFormData),
//     delete: (url) => apiClient.request('DELETE', url),
// };
// // --- End API Client ---


// export default function ProfileSettings() {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);
    
//     const avatarFileRef = useRef(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [avatarFile, setAvatarFile] = useState(null);
    
//     // UI State for modals
//     const [editingIntro, setEditingIntro] = useState(false);
//     const [editingWork, setEditingWork] = useState(null);
//     const [addingWork, setAddingWork] = useState(false);
//     const [editingEducation, setEditingEducation] = useState(null);
//     const [addingEducation, setAddingEducation] = useState(false);
//     const [editingSkill, setEditingSkill] = useState(null);
//     const [addingSkill, setAddingSkill] = useState(false);

//     const fetchProfile = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const authToken = getCookie('token');
//             if (!authToken) {
//                 throw new Error("Authentication token not found. Please log in.");
//             }
//             const headers = { Authorization: `Bearer ${authToken}` };
//             const urls = [
//                 `${API_BASE_URL}/api/profile/me/`,
//                 `${API_BASE_URL}/api/profile/me/experiences/`,
//                 `${API_BASE_URL}/api/profile/me/education/`,
//                 `${API_BASE_URL}/api/profile/me/skills/`,
//             ];
//             const responses = await Promise.all(urls.map(url => fetch(url, { headers })));
//             for (const res of responses) {
//                 if (!res.ok) {
//                     throw new Error(`Failed to fetch data: Server responded with status ${res.status}`);
//                 }
//             }
//             const [profileData, experiences, educations, skills] = await Promise.all(responses.map(res => res.json()));
//             const fullProfile = {
//                 ...profileData,
//                 experiences: experiences.map(exp => ({ 
//                     ...exp, 
//                     start_date: exp.start_date && isValid(parseISO(exp.start_date)) ? parseISO(exp.start_date) : null, 
//                     end_date: exp.end_date && isValid(parseISO(exp.end_date)) ? parseISO(exp.end_date) : null 
//                 })),
//                 educations: educations.map(edu => ({
//                     ...edu,
//                     start_year: edu.start_year ? new Date(edu.start_year, 0, 1) : null,
//                     end_year: edu.end_year ? new Date(edu.end_year, 0, 1) : null,
//                 })),
//                 skills: skills || [],
//             };
//             setProfile(fullProfile);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
//     const handleModalChange = (model, stateIndex, field, value) => {
//         const item = profile[model][stateIndex];
//         const updatedItem = {...item, [field]: value};
//         const newItems = [...profile[model]];
//         newItems[stateIndex] = updatedItem;
//         setProfile({...profile, [model]: newItems});
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setAvatarPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };
    
//     const handleSaveIntro = async () => {
//         setSaving(true);
//         try {
//             let updatedProfile;
//             const commonData = {
//                 full_name: profile.full_name || '',
//                 headline: profile.headline || '',
//                 about: profile.about || '',
//                 location: profile.location || '',
//             };

//             if (avatarFile) {
//                 const formData = new FormData();
//                 Object.entries(commonData).forEach(([key, value]) => formData.append(key, value));
//                 formData.append('avatar', avatarFile);
//                 updatedProfile = await apiClient.patch("/api/profile/me/", formData, true);
//             } else {
//                 updatedProfile = await apiClient.patch("/api/profile/me/", commonData, false);
//             }
    
//             setProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
//             setEditingIntro(false);
//             setAvatarFile(null);
//             setAvatarPreview(null);
//         } catch(e) { 
//             console.error("Failed to save intro:", e);
//             setError(e.message || "Could not save profile intro.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
//         setSaving(true);
//         const item = profile[model][stateIndex];
//         // If end_date is present but empty string, it means user unticked the box but didn't pick a date. Nullify it
//         if ('end_date' in item && item.end_date === '') item.end_date = null;
//         if ('end_year' in item && item.end_year === '') item.end_year = null;

//         const payload = { ...item };

//         if (apiPath === 'education') {
//             if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
//             if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
//         } else {
//             if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
//             if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
//         }

//         try {
//             if (isAdding) {
//                 await apiClient.post(`/api/profile/me/${apiPath}/`, payload);
//             } else {
//                 await apiClient.patch(`/api/profile/me/${apiPath}/${item.id}/`, payload);
//             }
//             closeFn();
//             fetchProfile();
//         } catch(e) { 
//             console.error(e);
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleDeleteItem = async (apiPath, id, closeFn) => {
//         // ✅ Alert message is already here
//         if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
//         try {
//             await apiClient.delete(`/api/profile/me/${apiPath}/${id}/`);
//             closeFn();
//             fetchProfile();
//         } catch(e) { console.error(e) }
//     };

//     if (loading) return <div className="text-center p-10">Loading profile...</div>;
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please try logging out and back in.</div>;
//     if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
//     // --- Render logic ---
//     const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
//     const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
//     const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
//     const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
//     const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;
    
//     // ✅ Better avatar placeholder
//     const avatarPlaceholder = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name || 'User'}&backgroundColor=00897b,d81b60,8e24aa,3949ab&fontSize=36`;
    
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

//                 {/* --- Introduction Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-start">
//                         <div className="flex items-center gap-5">
//                             <img src={profile.avatar_url || avatarPlaceholder} alt="profile" className="h-24 w-24 rounded-full object-cover bg-gray-100" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
//                                 <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                     </div>
//                 </div>

//                 {/* --- About Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
//                        <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
//                 </div>

//                 {/* --- Experience Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Experience</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, experiences: [...profile.experiences, {title: "", company: "", end_date: null}]}); setAddingWork(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-6">
//                            {profile.experiences.map((exp, index) => (
//                                <div key={exp.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">Exp</div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{exp.title || "Job Title"}</h3>
//                                        <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
//                                        <p className="text-xs text-gray-500 mt-1">{exp.start_date ? format(exp.start_date, 'MMM yyyy') : 'Start Date'} - {exp.end_date ? format(exp.end_date, 'MMM yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingWork(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Education Section --- */}
//                  <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Education</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, educations: [...profile.educations, {school: "", degree: "", end_year: null}]}); setAddingEducation(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="space-y-6">
//                            {profile.educations.map((edu, index) => (
//                                <div key={edu.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
//                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">Edu</div>
//                                    <div className="flex-grow">
//                                        <h3 className="font-semibold">{edu.school || "School / University"}</h3>
//                                        <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
//                                        <p className="text-xs text-gray-500 mt-1">{edu.start_year ? format(edu.start_year, 'yyyy') : 'Start Year'} - {edu.end_year ? format(edu.end_year, 'yyyy') : 'Present'}</p>
//                                    </div>
//                                    <Button variant="ghost" size="icon" onClick={() => setEditingEducation(index)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* --- Skills Section --- */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]}); setAddingSkill(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="flex flex-wrap gap-2">
//                            {profile.skills.map((skill, index) => (
//                                <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1.5">
//                                    <span className="font-semibold text-sm">{skill.name}</span>
//                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}><Edit className="h-4 w-4 text-blue-600 hover:text-blue-900"/></Button>
//                                </div>
//                            ))}
//                        </div>
//                 </div>

//                 {/* MODALS */}
//                 {editingIntro && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Edit intro</h2><Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}><X/></Button></div>
//                             <div className="flex items-center gap-4"><img src={avatarPreview || profile.avatar_url || avatarPlaceholder} alt="profile" className="h-20 w-20 rounded-full object-cover bg-gray-100" /><input type="file" ref={avatarFileRef} onChange={handleAvatarChange} accept="image/*" hidden /><Button variant="outline" onClick={() => avatarFileRef.current.click()}>Change Photo</Button></div>
//                             <div><label className="text-sm font-medium">Full Name</label><Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Headline</label><Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Location</label><Input className={inputClass} name="location" value={profile.location || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">About</label><Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} /></div>
//                             <div className="flex justify-end gap-3 pt-4"><Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentWorkData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2><Button variant="ghost" size="icon" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>Title</label><Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} /></div><div><label>Company</label><Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} /></div></div>
//                             {/* ✅ Checkbox for "currently working" */}
//                             <div className="flex items-center space-x-2"><Checkbox id="is_current_work" checked={!currentWorkData.end_date} onCheckedChange={(checked) => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', checked ? null : new Date())} /><label htmlFor="is_current_work" className="text-sm font-medium">I am currently working in this role</label></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.start_date ? format(currentWorkData.start_date, "MMMM yyyy") : "Start Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 z-50"><Calendar mode="single" selected={currentWorkData.start_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date)} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentWorkData.end_date}><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.end_date ? format(currentWorkData.end_date, "MMMM yyyy") : "End Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 z-50"><Calendar mode="single" selected={currentWorkData.end_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date)} /></PopoverContent></Popover>
//                             </div>
//                             <div><label>Description</label><Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} /></div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingWork && <Button variant="destructive" onClick={() => handleDeleteItem('experiences', currentWorkData.id, () => {setEditingWork(null); setAddingWork(false)})}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingWork(null); setAddingWork(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, () => {setEditingWork(null); setAddingWork(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentEducationData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2><Button variant="ghost" size="icon" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>School</label><Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} /></div><div><label>Degree</label><Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} /></div></div>
//                             {/* ✅ Checkbox for "currently studying" */}
//                             {/* ✅ FIX: Using a standard HTML checkbox */}
//                             {/* ✅ FIX: Using a standard HTML checkbox */}
// <div className="flex items-center space-x-2">
//     <input
//         type="checkbox"
//         id="is_current_edu"
//         className="h-4 w-4 accent-blue-600"
//         checked={!currentEducationData.end_year}
//         onChange={(e) => {
//             const isChecked = e.target.checked;
//             handleModalChange('educations', addingEducation ? profile.educations.length - 1 : editingEducation, 'end_year', isChecked ? null : new Date());
//         }}
//     />
//     <label htmlFor="is_current_edu" className="text-sm font-medium">
//         I am currently studying here
//     </label>
// </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.start_year ? format(currentEducationData.start_year, "yyyy") : "Start Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 z-50"><Calendar mode="single" selected={currentEducationData.start_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                 <Popover><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentEducationData.end_year}><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.end_year ? format(currentEducationData.end_year, "yyyy") : "End Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 z-50"><Calendar mode="single" selected={currentEducationData.end_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear() + 5} /></PopoverContent></Popover>
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingEducation && <Button variant="destructive" onClick={() => handleDeleteItem('education', currentEducationData.id, () => {setEditingEducation(null); setAddingEducation(false)})}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingEducation(null); setAddingEducation(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, () => {setEditingEducation(null); setAddingEducation(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {currentSkillData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2><Button variant="ghost" size="icon" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}><X/></Button></div>
//                             <div><label>Skill Name</label><Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} /></div>
//                             <div><label>Proficiency Level</label>
//                                 <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
//                                     <option>Beginner</option>
//                                     <option>Intermediate</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingSkill && <Button variant="destructive" onClick={() => handleDeleteItem('skills', currentSkillData.id, () => {setEditingSkill(null); setAddingSkill(false)})}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingSkill(null); setAddingSkill(false); fetchProfile()}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, () => {setEditingSkill(null); setAddingSkill(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";

// import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
// import { format, parseISO, isValid } from "date-fns";

// // --- API Client and Helpers ---
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// const apiClient = {
//     async request(method, url, data = null, isFormData = false) {
//         const headers = {};
//         const config = { method, headers };
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }
//         if (data) {
//             if (isFormData) {
//                 config.body = data;
//             } else {
//                 headers['Content-Type'] = 'application/json';
//                 config.body = JSON.stringify(data);
//             }
//         }
//         const fullUrl = `${API_BASE_URL}${url}`;
//         try {
//             const response = await fetch(fullUrl, config);
//             if (response.status === 401) {
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//                 window.location.href = '/login'; 
//                 throw new Error("Authentication failed.");
//             }
//             if (!response.ok) {
//                 try {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || `Request failed with status ${response.status}`);
//                 } catch (e) {
//                     throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
//                 }
//             }
//             if (response.status === 204) {
//                 return null;
//             }
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: (url) => apiClient.request('GET', url),
//     post: (url, data, isFormData = false) => apiClient.request('POST', url, data, isFormData),
//     patch: (url, data, isFormData = false) => apiClient.request('PATCH', url, data, isFormData),
//     delete: (url) => apiClient.request('DELETE', url),
// };

// export default function ProfileSettings() {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);
    
//     const avatarFileRef = useRef(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [avatarFile, setAvatarFile] = useState(null);
    
//     // UI State for modals
//     const [editingIntro, setEditingIntro] = useState(false);
//     const [editingWork, setEditingWork] = useState(null);
//     const [addingWork, setAddingWork] = useState(false);
//     const [editingEducation, setEditingEducation] = useState(null);
//     const [addingEducation, setAddingEducation] = useState(false);
//     const [editingSkill, setEditingSkill] = useState(null);
//     const [addingSkill, setAddingSkill] = useState(false);

//     // Calendar states
//     const [workStartOpen, setWorkStartOpen] = useState(false);
//     const [workEndOpen, setWorkEndOpen] = useState(false);
//     const [eduStartOpen, setEduStartOpen] = useState(false);
//     const [eduEndOpen, setEduEndOpen] = useState(false);

//     const fetchProfile = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const authToken = getCookie('token');
//             if (!authToken) {
//                 throw new Error("Authentication token not found. Please log in.");
//             }
//             const headers = { Authorization: `Bearer ${authToken}` };
//             const urls = [
//                 `${API_BASE_URL}/api/profile/me/`,
//                 `${API_BASE_URL}/api/profile/me/experiences/`,
//                 `${API_BASE_URL}/api/profile/me/education/`,
//                 `${API_BASE_URL}/api/profile/me/skills/`,
//             ];
//             const responses = await Promise.all(urls.map(url => fetch(url, { headers })));
//             for (const res of responses) {
//                 if (!res.ok) {
//                     throw new Error(`Failed to fetch data: Server responded with status ${res.status}`);
//                 }
//             }
//             const [profileData, experiences, educations, skills] = await Promise.all(responses.map(res => res.json()));
//             const fullProfile = {
//                 ...profileData,
//                 experiences: experiences.map(exp => ({ 
//                     ...exp, 
//                     start_date: exp.start_date && isValid(parseISO(exp.start_date)) ? parseISO(exp.start_date) : null, 
//                     end_date: exp.end_date && isValid(parseISO(exp.end_date)) ? parseISO(exp.end_date) : null 
//                 })),
//                 educations: educations.map(edu => ({
//                     ...edu,
//                     start_year: edu.start_year ? new Date(edu.start_year, 0, 1) : null,
//                     end_year: edu.end_year ? new Date(edu.end_year, 0, 1) : null,
//                 })),
//                 skills: skills || [],
//             };
//             setProfile(fullProfile);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
//     const handleModalChange = (model, stateIndex, field, value) => {
//         const item = profile[model][stateIndex];
//         const updatedItem = {...item, [field]: value};
//         const newItems = [...profile[model]];
//         newItems[stateIndex] = updatedItem;
//         setProfile({...profile, [model]: newItems});
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setAvatarPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };
    
//     const handleSaveIntro = async () => {
//         setSaving(true);
//         try {
//             let updatedProfile;
//             const commonData = {
//                 full_name: profile.full_name || '',
//                 headline: profile.headline || '',
//                 about: profile.about || '',
//                 location: profile.location || '',
//             };

//             if (avatarFile) {
//                 const formData = new FormData();
//                 Object.entries(commonData).forEach(([key, value]) => formData.append(key, value));
//                 formData.append('avatar', avatarFile);
//                 updatedProfile = await apiClient.patch("/api/profile/me/", formData, true);
//             } else {
//                 updatedProfile = await apiClient.patch("/api/profile/me/", commonData, false);
//             }
    
//             setProfile(prevProfile => ({ ...prevProfile, ...updatedProfile }));
//             setEditingIntro(false);
//             setAvatarFile(null);
//             setAvatarPreview(null);
//         } catch(e) { 
//             console.error("Failed to save intro:", e);
//             setError(e.message || "Could not save profile intro.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
//         setSaving(true);
//         try {
//             const item = profile[model][stateIndex];
//             if ('end_date' in item && item.end_date === '') item.end_date = null;
//             if ('end_year' in item && item.end_year === '') item.end_year = null;

//             const payload = { ...item };

//             if (apiPath === 'education') {
//                 if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
//                 if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
//             } else {
//                 if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
//                 if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
//             }

//             let result;
//             if (isAdding) {
//                 result = await apiClient.post(`/api/profile/me/${apiPath}/`, payload);
//             } else {
//                 result = await apiClient.patch(`/api/profile/me/${apiPath}/${item.id}/`, payload);
//             }
            
//             const updatedItems = [...profile[model]];
//             if (isAdding) {
//                 updatedItems[stateIndex] = { ...item, ...result };
//             } else {
//                 updatedItems[stateIndex] = { ...item, ...result };
//             }
//             setProfile(prevProfile => ({ ...prevProfile, [model]: updatedItems }));
            
//             closeFn();
//         } catch(e) { 
//             console.error("Failed to save item:", e);
//             setError(e.message || "Could not save item.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleDeleteItem = async (model, apiPath, id, closeFn) => {
//         if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
        
//         setSaving(true);
//         try {
//             await apiClient.delete(`/api/profile/me/${apiPath}/${id}/`);
            
//             const updatedItems = profile[model].filter(item => item.id !== id);
//             setProfile(prevProfile => ({ ...prevProfile, [model]: updatedItems }));
            
//             closeFn();
//         } catch(e) { 
//             console.error("Failed to delete item:", e);
//             setError(e.message || "Could not delete item.");
//         } finally {
//             setSaving(false);
//         }
//     };

//     // Add item functions
//     const addWorkExperience = () => {
//         setProfile({...profile, experiences: [...profile.experiences, {title: "", company: "", description: "", start_date: null, end_date: null}]});
//         setAddingWork(true);
//     };

//     const addEducation = () => {
//         setProfile({...profile, educations: [...profile.educations, {school: "", degree: "", start_year: null, end_year: null}]});
//         setAddingEducation(true);
//     };

//     const addSkill = () => {
//         setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]});
//         setAddingSkill(true);
//     };

//     // Cancel functions
//     const cancelWorkModal = () => {
//         if (addingWork) {
//             const updatedExperiences = [...profile.experiences];
//             updatedExperiences.pop();
//             setProfile({...profile, experiences: updatedExperiences});
//         }
//         setEditingWork(null);
//         setAddingWork(false);
//         setWorkStartOpen(false);
//         setWorkEndOpen(false);
//     };

//     const cancelEducationModal = () => {
//         if (addingEducation) {
//             const updatedEducations = [...profile.educations];
//             updatedEducations.pop();
//             setProfile({...profile, educations: updatedEducations});
//         }
//         setEditingEducation(null);
//         setAddingEducation(false);
//         setEduStartOpen(false);
//         setEduEndOpen(false);
//     };

//     const cancelSkillModal = () => {
//         if (addingSkill) {
//             const updatedSkills = [...profile.skills];
//             updatedSkills.pop();
//             setProfile({...profile, skills: updatedSkills});
//         }
//         setEditingSkill(null);
//         setAddingSkill(false);
//     };

//     if (loading) return <div className="text-center p-10">Loading profile...</div>;
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please try logging out and back in.</div>;
//     if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
//     // Render logic
//     const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
//     const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
//     const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
//     const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
//     const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;
    
//     const getAvatarPlaceholder = (name) => {
//         const initials = name ? name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase() : 'U';
//         return `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=00897b,d81b60,8e24aa,3949ab&fontSize=36`;
//     };
    
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

//                 {/* Introduction Section */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-start">
//                         <div className="flex items-center gap-5">
//                             <img 
//                                 src={profile.avatar_url || getAvatarPlaceholder(profile.full_name)} 
//                                 alt="profile" 
//                                 className="h-24 w-24 rounded-full object-cover bg-gray-100" 
//                             />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
//                                 <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}>
//                             <Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/>
//                         </Button>
//                     </div>
//                 </div>

//                 {/* About Section */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
//                     <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
//                 </div>

//                 {/* Experience Section */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">Experience</h2>
//                         <Button variant="ghost" size="icon" onClick={addWorkExperience}>
//                             <PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/>
//                         </Button>
//                     </div>
//                     <div className="space-y-6">
//                         {profile.experiences.map((exp, index) => (
//                             <div key={exp.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
//                                 <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">Exp</div>
//                                 <div className="flex-grow">
//                                     <h3 className="font-semibold">{exp.title || "Job Title"}</h3>
//                                     <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         {exp.start_date ? format(exp.start_date, 'MMM yyyy') : 'Start Date'} - {exp.end_date ? format(exp.end_date, 'MMM yyyy') : 'Present'}
//                                     </p>
//                                     {exp.description && <p className="text-sm text-gray-700 mt-2">{exp.description}</p>}
//                                 </div>
//                                 <Button variant="ghost" size="icon" onClick={() => setEditingWork(index)}>
//                                     <Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/>
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Education Section */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">Education</h2>
//                         <Button variant="ghost" size="icon" onClick={addEducation}>
//                             <PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/>
//                         </Button>
//                     </div>
//                     <div className="space-y-6">
//                         {profile.educations.map((edu, index) => (
//                             <div key={edu.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
//                                 <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">Edu</div>
//                                 <div className="flex-grow">
//                                     <h3 className="font-semibold">{edu.school || "School / University"}</h3>
//                                     <p className="text-sm text-gray-600">{edu.degree || "Degree"}</p>
//                                     <p className="text-xs text-gray-500 mt-1">
//                                         {edu.start_year ? format(edu.start_year, 'yyyy') : 'Start Year'} - {edu.end_year ? format(edu.end_year, 'yyyy') : 'Present'}
//                                     </p>
//                                 </div>
//                                 <Button variant="ghost" size="icon" onClick={() => setEditingEducation(index)}>
//                                     <Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/>
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Skills Section */}
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-xl font-bold text-gray-800">Skills</h2>
//                         <Button variant="ghost" size="icon" onClick={addSkill}>
//                             <PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/>
//                         </Button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                         {profile.skills.map((skill, index) => (
//                             <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1.5">
//                                 <span className="font-semibold text-sm">{skill.name}</span>
//                                 <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}>
//                                     <Edit className="h-4 w-4 text-blue-600 hover:text-blue-900"/>
//                                 </Button>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* MODALS */}
                
//                 {/* Edit Intro Modal */}
//                 {editingIntro && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-xl font-bold">Edit intro</h2>
//                                 <Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}>
//                                     <X/>
//                                 </Button>
//                             </div>
//                             <div className="flex items-center gap-4">
//                                 <img 
//                                     src={avatarPreview || profile.avatar_url || getAvatarPlaceholder(profile.full_name)} 
//                                     alt="profile" 
//                                     className="h-20 w-20 rounded-full object-cover bg-gray-100" 
//                                 />
//                                 <input 
//                                     type="file" 
//                                     ref={avatarFileRef} 
//                                     onChange={handleAvatarChange} 
//                                     accept="image/*" 
//                                     hidden 
//                                 />
//                                 <Button variant="outline" onClick={() => avatarFileRef.current.click()}>
//                                     Change Photo
//                                 </Button>
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">Full Name</label>
//                                 <Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">Headline</label>
//                                 <Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">Location</label>
//                                 <Input className={inputClass} name="location" value={profile.location || ''} onChange={handleChange} />
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">About</label>
//                                 <Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} />
//                             </div>
//                             <div className="flex justify-end gap-3 pt-4">
//                                 <Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button>
//                                 <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>
//                                     {saving ? "Saving..." : "Save"}
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
                
//                 {/* Work Experience Modal */}
//                 {currentWorkData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2>
//                                 <Button variant="ghost" size="icon" onClick={cancelWorkModal}>
//                                     <X/>
//                                 </Button>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">Title</label>
//                                     <Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Company</label>
//                                     <Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} />
//                                 </div>
//                             </div>
                            
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     id="is_current_work"
//                                     className="h-4 w-4 accent-blue-600"
//                                     checked={!currentWorkData.end_date}
//                                     onChange={(e) => {
//                                         const isChecked = e.target.checked;
//                                         handleModalChange('experiences', addingWork ? profile.experiences.length - 1 : editingWork, 'end_date', isChecked ? null : new Date());
//                                     }}
//                                 />
//                                 <label htmlFor="is_current_work" className="text-sm font-medium">
//                                     I am currently working in this role
//                                 </label>
//                             </div>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="relative">
//                                     <label className="text-sm font-medium">Start Date</label>
//                                     <Popover open={workStartOpen} onOpenChange={setWorkStartOpen}>
//                                         <PopoverTrigger asChild>
//                                             <Button variant="outline" className="w-full justify-start text-left font-normal">
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {currentWorkData.start_date ? format(currentWorkData.start_date, "MMMM yyyy") : "Start Date"}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
//                                             <Calendar mode="single" selected={currentWorkData.start_date} onSelect={date => {
//                                                 handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date);
//                                                 setWorkStartOpen(false);
//                                             }} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
                                
//                                 <div className="relative">
//                                     <label className="text-sm font-medium">End Date</label>
//                                     <Popover open={workEndOpen} onOpenChange={setWorkEndOpen}>
//                                         <PopoverTrigger asChild>
//                                             <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentWorkData.end_date}>
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {currentWorkData.end_date ? format(currentWorkData.end_date, "MMMM yyyy") : "End Date"}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
//                                             <Calendar mode="single" selected={currentWorkData.end_date} onSelect={date => {
//                                                 handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date);
//                                                 setWorkEndOpen(false);
//                                             }} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
                            
//                             <div>
//                                 <label className="text-sm font-medium">Description</label>
//                                 <Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} />
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>
//                                     {!addingWork && (
//                                         <Button variant="destructive" onClick={() => handleDeleteItem('experiences', 'experiences', currentWorkData.id, cancelWorkModal)} disabled={saving}>
//                                             {saving ? "Deleting..." : "Delete"}
//                                         </Button>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-3">
//                                     <Button variant="outline" onClick={cancelWorkModal}>Cancel</Button>
//                                     <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, cancelWorkModal)} disabled={saving}>
//                                         {saving ? "Saving..." : "Save"}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
                
//                 {/* Education Modal */}
//                 {currentEducationData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2>
//                                 <Button variant="ghost" size="icon" onClick={cancelEducationModal}>
//                                     <X/>
//                                 </Button>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="text-sm font-medium">School</label>
//                                     <Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} />
//                                 </div>
//                                 <div>
//                                     <label className="text-sm font-medium">Degree</label>
//                                     <Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} />
//                                 </div>
//                             </div>
                            
//                             <div className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     id="is_current_edu"
//                                     className="h-4 w-4 accent-blue-600"
//                                     checked={!currentEducationData.end_year}
//                                     onChange={(e) => {
//                                         const isChecked = e.target.checked;
//                                         handleModalChange('educations', addingEducation ? profile.educations.length - 1 : editingEducation, 'end_year', isChecked ? null : new Date());
//                                     }}
//                                 />
//                                 <label htmlFor="is_current_edu" className="text-sm font-medium">
//                                     I am currently studying here
//                                 </label>
//                             </div>
                            
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div className="relative">
//                                     <label className="text-sm font-medium">Start Year</label>
//                                     <Popover open={eduStartOpen} onOpenChange={setEduStartOpen}>
//                                         <PopoverTrigger asChild>
//                                             <Button variant="outline" className="w-full justify-start text-left font-normal">
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {currentEducationData.start_year ? format(currentEducationData.start_year, "yyyy") : "Start Year"}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
//                                             <Calendar mode="single" selected={currentEducationData.start_year} onSelect={date => {
//                                                 handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date);
//                                                 setEduStartOpen(false);
//                                             }} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
                                
//                                 <div className="relative">
//                                     <label className="text-sm font-medium">End Year</label>
//                                     <Popover open={eduEndOpen} onOpenChange={setEduEndOpen}>
//                                         <PopoverTrigger asChild>
//                                             <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentEducationData.end_year}>
//                                                 <CalendarIcon className="mr-2 h-4 w-4" />
//                                                 {currentEducationData.end_year ? format(currentEducationData.end_year, "yyyy") : "End Year"}
//                                             </Button>
//                                         </PopoverTrigger>
//                                         <PopoverContent className="w-auto p-0" style={{ zIndex: 9999 }}>
//                                             <Calendar mode="single" selected={currentEducationData.end_year} onSelect={date => {
//                                                 handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date);
//                                                 setEduEndOpen(false);
//                                             }} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear() + 5} />
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
                            
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>
//                                     {!addingEducation && (
//                                         <Button variant="destructive" onClick={() => handleDeleteItem('educations', 'education', currentEducationData.id, cancelEducationModal)} disabled={saving}>
//                                             {saving ? "Deleting..." : "Delete"}
//                                         </Button>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-3">
//                                     <Button variant="outline" onClick={cancelEducationModal}>Cancel</Button>
//                                     <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, cancelEducationModal)} disabled={saving}>
//                                         {saving ? "Saving..." : "Save"}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Skills Modal */}
//                 {currentSkillData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center">
//                                 <h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2>
//                                 <Button variant="ghost" size="icon" onClick={cancelSkillModal}>
//                                     <X/>
//                                 </Button>
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">Skill Name</label>
//                                 <Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} />
//                             </div>
//                             <div>
//                                 <label className="text-sm font-medium">Proficiency Level</label>
//                                 <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
//                                     <option>Beginner</option>
//                                     <option>Intermediate</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>
//                                     {!addingSkill && (
//                                         <Button variant="destructive" onClick={() => handleDeleteItem('skills', 'skills', currentSkillData.id, cancelSkillModal)} disabled={saving}>
//                                             {saving ? "Deleting..." : "Delete"}
//                                         </Button>
//                                     )}
//                                 </div>
//                                 <div className="flex gap-3">
//                                     <Button variant="outline" onClick={cancelSkillModal}>Cancel</Button>
//                                     <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, cancelSkillModal)} disabled={saving}>
//                                         {saving ? "Saving..." : "Save"}
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



// upar cluide 



// import React, { useState, useEffect, useRef } from "react";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
// import { format, parseISO, isValid } from "date-fns";

// // --- API Client and Helpers ---
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
//   return null;
// }

// // ✅ApiClient is now upgraded to handle different response types (json, blob)
// const apiClient = {
//     async request(method, url, data = null, isFormData = false, responseType = 'json') {
//         const headers = {};
//         const config = { method, headers };
//         const authToken = getCookie('token');
//         if (authToken) {
//             headers['Authorization'] = `Bearer ${authToken}`;
//         }
//         if (data) {
//             if (isFormData) {
//                 config.body = data;
//             } else {
//                 headers['Content-Type'] = 'application/json';
//                 config.body = JSON.stringify(data);
//             }
//         }
//         const fullUrl = `${API_BASE_URL}${url}`;
//         try {
//             const response = await fetch(fullUrl, config);
//             if (response.status === 401) {
//                 document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//                 window.location.href = '/login'; 
//                 throw new Error("Authentication failed.");
//             }
//             if (!response.ok) {
//                 if (response.status === 404) return null; // Gracefully handle 404s (e.g., no avatar)
//                 try {
//                     const errorData = await response.json();
//                     throw new Error(errorData.detail || `Request failed with status ${response.status}`);
//                 } catch (e) {
//                     throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
//                 }
//             }
//             if (response.status === 204) return null;
            
//             if (responseType === 'blob') return response.blob();
            
//             return response.json();
//         } catch (error) {
//             console.error(`${method} request to ${fullUrl} failed:`, error);
//             throw error;
//         }
//     },
//     get: (url) => apiClient.request('GET', url, null, false, 'json'),
//     getBlob: (url) => apiClient.request('GET', url, null, false, 'blob'),
//     post: (url, data, isFormData = false) => apiClient.request('POST', url, data, isFormData),
//     patch: (url, data, isFormData = false) => apiClient.request('PATCH', url, data, isFormData),
//     delete: (url) => apiClient.request('DELETE', url),
// };
// // --- End API Client ---


// export default function ProfileSettings() {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [saving, setSaving] = useState(false);
    
//     const [avatarSrc, setAvatarSrc] = useState(null);
//     const avatarFileRef = useRef(null);
//     const [avatarPreview, setAvatarPreview] = useState(null);
//     const [avatarFile, setAvatarFile] = useState(null);
    
//     // UI State for modals
//     const [editingIntro, setEditingIntro] = useState(false);
//     const [editingWork, setEditingWork] = useState(null);
//     const [addingWork, setAddingWork] = useState(false);
//     const [editingEducation, setEditingEducation] = useState(null);
//     const [addingEducation, setAddingEducation] = useState(false);
//     const [editingSkill, setEditingSkill] = useState(null);
//     const [addingSkill, setAddingSkill] = useState(false);

//     const fetchProfile = async (isSilent = false) => {
//         if (!isSilent) setLoading(true);
//         setError(null);
//         try {
//             const authToken = getCookie('token');
//             if (!authToken) throw new Error("Authentication token not found.");
            
//             const headers = { Authorization: `Bearer ${authToken}` };
//             const urls = [
//                 `${API_BASE_URL}/api/users-app/profile/me/`,
//                 `${API_BASE_URL}/api/users-app/profile/me/experiences/`,
//                 `${API_BASE_URL}/api/users-app/profile/me/education/`,
//                 `${API_BASE_URL}/api/users-app/profile/me/skills/`,
//             ];
//             const responses = await Promise.all(urls.map(url => fetch(url, { headers })));
//             for (const res of responses) {
//                 if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
//             }
//             const [profileData, experiences, educations, skills] = await Promise.all(responses.map(res => res.json()));
            
//             const fullProfile = {
//                 ...profileData,
//                 experiences: experiences.map(exp => ({ ...exp, start_date: exp.start_date ? parseISO(exp.start_date) : null, end_date: exp.end_date ? parseISO(exp.end_date) : null })),
//                 educations: educations.map(edu => ({ ...edu, start_year: edu.start_year ? new Date(edu.start_year, 0, 1) : null, end_year: edu.end_year ? new Date(edu.end_year, 0, 1) : null })),
//                 skills: skills || [],
//             };
//             setProfile(fullProfile);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             if (!isSilent) setLoading(false);
//         }
//     };

//     // ✅ Effect to fetch the avatar image using the dedicated endpoint
//     useEffect(() => {
//         const fetchAvatar = async () => {
//             try {
//                 const blob = await apiClient.getBlob("/api/users-app/profile/me/avatar/");
//                 if (blob && blob.size > 0) {
//                     const objectUrl = URL.createObjectURL(blob);
//                     setAvatarSrc(objectUrl);
//                     return () => URL.revokeObjectURL(objectUrl); // Cleanup function
//                 } else {
//                     setAvatarSrc(null);
//                 }
//             } catch (e) {
//                 console.error("Could not fetch avatar:", e);
//                 setAvatarSrc(null);
//             }
//         };

//         if (!loading && profile) {
//             fetchAvatar();
//         }
//     }, [loading, profile]); // Refetch avatar when profile data changes

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
//     const handleModalChange = (model, stateIndex, field, value) => {
//         setProfile(prev => {
//             const newItems = [...prev[model]];
//             newItems[stateIndex] = { ...newItems[stateIndex], [field]: value };
//             return { ...prev, [model]: newItems };
//         });
//     }

//     const handleAvatarChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setAvatarFile(file);
//             const reader = new FileReader();
//             reader.onloadend = () => setAvatarPreview(reader.result);
//             reader.readAsDataURL(file);
//         }
//     };
    
//     // ✅ FIX: Save logic is now split into two steps for text and avatar
//     const handleSaveIntro = async () => {
//         setSaving(true);
//         try {
//             // Step 1: Save all text data first
//             const commonData = { full_name: profile.full_name || '', headline: profile.headline || '', about: profile.about || '', location: profile.location || '' };
//             await apiClient.patch("/api/users-app/profile/me/", commonData, false);

//             // Step 2: If there's a new avatar, upload it to the dedicated endpoint
//             if (avatarFile) {
//                 const formData = new FormData();
//                 formData.append('avatar_blob', avatarFile);
//                 await apiClient.post("/api/users-app/profile/me/avatar/", formData, true);
//             }
    
//             setEditingIntro(false);
//             setAvatarFile(null);
//             setAvatarPreview(null);
//             await fetchProfile(true); // Silently refetch all data for consistency
//         } catch(e) { 
//             console.error("Failed to save intro:", e);
//             setError(e.message || "Could not save profile intro.");
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
//         setSaving(true);
//         const itemToSave = profile[model][stateIndex];
//         const payload = { ...itemToSave };

//         if (apiPath === 'education') {
//             if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
//             if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
//         } else {
//             if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
//             if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
//         }

//         try {
//             if (isAdding) {
//                 await apiClient.post(`/api/users-app/profile/me/${apiPath}/`, payload);
//             } else {
//                 await apiClient.patch(`/api/users-app/profile/me/${apiPath}/${itemToSave.id}/`, payload);
//             }
//             closeFn();
//             await fetchProfile(true); 
//         } catch(e) { 
//             console.error(e);
//             setError(`Failed to save ${model}.`);
//         } finally { 
//             setSaving(false);
//         }
//     };
    
//     const handleDeleteItem = async (apiPath, id, closeFn) => {
//         if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
//         try {
//             await apiClient.delete(`/api/users-app/profile/me/${apiPath}/${id}/`);
//             closeFn();
//             await fetchProfile(true);
//         } catch(e) { 
//             console.error(e);
//             setError(`Failed to delete item.`);
//         }
//     };

//     const handleCancelAdd = (model, closeStateFn) => {
//         closeStateFn();
//         setProfile(prev => ({...prev, [model]: prev[model].slice(0, -1)}));
//     }

//     if (loading) return <div className="text-center p-10">Loading profile...</div>;
//     if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please try logging out and back in.</div>;
//     if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
//     const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
//     const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
//     const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
//     const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
//     const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;
//     const avatarPlaceholder = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name || 'User'}&backgroundColor=00897b,d81b60,8e24aa,3949ab&fontSize=36`;
    
//     return (
//         <div className="bg-gray-50 min-h-screen">
//             <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                
//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                     <div className="flex justify-between items-start">
//                         <div className="flex items-center gap-5">
//                             <img src={avatarSrc || avatarPlaceholder} alt="profile" className="h-24 w-24 rounded-full object-cover bg-gray-100" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
//                                 <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
//                                 <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
//                             </div>
//                         </div>
//                         <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
//                        <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
//                 </div>

//                 {['experiences', 'educations'].map(section => (
//                     <div key={section} className="bg-white rounded-lg shadow-sm p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-xl font-bold text-gray-800 capitalize">{section}</h2>
//                             <Button variant="ghost" size="icon" onClick={() => {
//                                 const placeholder = section === 'experiences' ? {title: "", company: "", end_date: null} : {school: "", degree: "", end_year: null};
//                                 setProfile(prev => ({...prev, [section]: [...prev[section], placeholder]}));
//                                 if (section === 'experiences') setAddingWork(true); else setAddingEducation(true);
//                             }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                         </div>
//                         <div className="space-y-6">
//                             {profile[section].length > 0 ? profile[section].map((item, index) => (
//                                 <div key={item.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
//                                     <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
//                                         {section === 'experiences' ? 'Exp' : 'Edu'}
//                                     </div>
//                                     <div className="flex-grow">
//                                         <h3 className="font-semibold">{item.title || item.school || "New Entry"}</h3>
//                                         <p className="text-sm text-gray-600">{item.company || item.degree || "Details"}</p>
//                                         <p className="text-xs text-gray-500 mt-1">
//                                             {section === 'experiences' ? 
//                                                 `${item.start_date ? format(item.start_date, 'MMM yyyy') : '...'} - ${item.end_date ? format(item.end_date, 'MMM yyyy') : 'Present'}` :
//                                                 `${item.start_year ? format(item.start_year, 'yyyy') : '...'} - ${item.end_year ? format(item.end_year, 'yyyy') : 'Present'}`
//                                             }
//                                         </p>
//                                     </div>
//                                     <Button variant="ghost" size="icon" onClick={() => {
//                                         if (section === 'experiences') setEditingWork(index); else setEditingEducation(index);
//                                     }}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
//                                 </div>
//                             )) : <p className="text-sm text-gray-500 text-center">No {section} added yet.</p>}
//                         </div>
//                     </div>
//                 ))}

//                 <div className="bg-white rounded-lg shadow-sm p-6">
//                        <div className="flex justify-between items-center mb-4">
//                            <h2 className="text-xl font-bold text-gray-800">Skills</h2>
//                            <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]}); setAddingSkill(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
//                        </div>
//                        <div className="flex flex-wrap gap-2">
//                            {profile.skills.length > 0 ? profile.skills.map((skill, index) => (
//                                <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1.5">
//                                    <span className="font-semibold text-sm">{skill.name}</span>
//                                    <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}><Edit className="h-4 w-4 text-blue-600 hover:text-blue-900"/></Button>
//                                </div>
//                            )) : <p className="text-sm text-gray-500 text-center">No skills added yet.</p>}
//                        </div>
//                 </div>

//                 {/* MODALS */}
//                 {editingIntro && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Edit intro</h2><Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}><X/></Button></div>
//                             <div className="flex items-center gap-4"><img src={avatarPreview || avatarSrc || avatarPlaceholder} alt="profile" className="h-20 w-20 rounded-full object-cover bg-gray-100" /><input type="file" ref={avatarFileRef} onChange={handleAvatarChange} accept="image/*" hidden /><Button variant="outline" onClick={() => avatarFileRef.current.click()}>Change Photo</Button></div>
//                             <div><label className="text-sm font-medium">Full Name</label><Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Headline</label><Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">Location</label><Input className={inputClass} name="location" value={profile.location || ''} onChange={handleChange} /></div>
//                             <div><label className="text-sm font-medium">About</label><Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} /></div>
//                             <div className="flex justify-end gap-3 pt-4"><Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentWorkData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2><Button variant="ghost" size="icon" onClick={() => {setEditingWork(null); addingWork ? handleCancelAdd('experiences', () => setAddingWork(false)) : setAddingWork(false);}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>Title</label><Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} /></div><div><label>Company</label><Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} /></div></div>
//                             <div className="flex items-center space-x-2">
//                                 <input type="checkbox" id="is_current_work" className="h-4 w-4 accent-blue-600" checked={!currentWorkData.end_date} onChange={(e) => { const isChecked = e.target.checked; handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', isChecked ? null : new Date()); }} />
//                                 <label htmlFor="is_current_work" className="text-sm font-medium">I am currently working in this role</label>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover modal={true}><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.start_date ? format(currentWorkData.start_date, "MMMM yyyy") : "Start Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 bg-background border"><Calendar mode="single" selected={currentWorkData.start_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date)} /></PopoverContent></Popover>
//                                 <Popover modal={true}><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentWorkData.end_date}><CalendarIcon className="mr-2 h-4 w-4" />{currentWorkData.end_date ? format(currentWorkData.end_date, "MMMM yyyy") : "End Date"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 bg-background border"><Calendar mode="single" selected={currentWorkData.end_date} onSelect={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date)} /></PopoverContent></Popover>
//                             </div>
//                             <div><label>Description</label><Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} /></div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingWork && <Button variant="destructive"  onClick={() => handleDeleteItem('experiences', currentWorkData.id, () => setEditingWork(null))} style={{ 
//         backgroundColor: '#ef4444', // A standard red color
//         color: 'white' 
//     }}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingWork(null); addingWork ? handleCancelAdd('experiences', () => setAddingWork(false)) : setAddingWork(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, () => {setEditingWork(null); setAddingWork(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
                
//                 {currentEducationData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2><Button variant="ghost" size="icon" onClick={() => {setEditingEducation(null); addingEducation ? handleCancelAdd('educations', () => setAddingEducation(false)) : setAddingEducation(false);}}><X/></Button></div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>School</label><Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} /></div><div><label>Degree</label><Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} /></div></div>
//                             <div className="flex items-center space-x-2">
//                                 <input type="checkbox" id="is_current_edu" className="h-4 w-4 accent-blue-600" checked={!currentEducationData.end_year} onChange={(e) => { const isChecked = e.target.checked; handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', isChecked ? null : new Date()); }} />
//                                 <label htmlFor="is_current_edu" className="text-sm font-medium">I am currently studying here</label>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <Popover modal={true}><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal"><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.start_year ? format(currentEducationData.start_year, "yyyy") : "Start Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 bg-background border"><Calendar mode="single" selected={currentEducationData.start_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear()} /></PopoverContent></Popover>
//                                 <Popover modal={true}><PopoverTrigger asChild><Button variant="outline" className="w-full justify-start text-left font-normal" disabled={!currentEducationData.end_year}><CalendarIcon className="mr-2 h-4 w-4" />{currentEducationData.end_year ? format(currentEducationData.end_year, "yyyy") : "End Year"}</Button></PopoverTrigger><PopoverContent className="w-auto p-0 bg-background border"><Calendar mode="single" selected={currentEducationData.end_year} onSelect={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date)} captionLayout="dropdown-buttons" fromYear={1980} toYear={new Date().getFullYear() + 5} /></PopoverContent></Popover>
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingEducation && <Button variant="destructive" onClick={() => handleDeleteItem('education', currentEducationData.id, () => setEditingEducation(null))} style={{ 
//         backgroundColor: '#ef4444', // A standard red color
//         color: 'white' 
//     }}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingEducation(null); addingEducation ? handleCancelAdd('educations', () => setAddingEducation(false)) : setAddingEducation(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, () => {setEditingEducation(null); setAddingEducation(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {currentSkillData && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//                         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4 max-h-[90vh] overflow-y-auto">
//                             <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2><Button variant="ghost" size="icon" onClick={() => {setEditingSkill(null); addingSkill ? handleCancelAdd('skills', () => setAddingSkill(false)) : setAddingSkill(false);}}><X/></Button></div>
//                             <div><label>Skill Name</label><Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} /></div>
//                             <div><label>Proficiency Level</label>
//                                 <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
//                                     <option>Beginner</option>
//                                     <option>Intermediate</option>
//                                     <option>Expert</option>
//                                 </select>
//                             </div>
//                             <div className="flex justify-between items-center pt-4">
//                                 <div>{!addingSkill && <Button variant="destructive" onClick={() => handleDeleteItem('skills', currentSkillData.id, () => setEditingSkill(null))}  style={{ 
//         backgroundColor: '#ef4444', // A standard red color
//         color: 'white' 
//     }}>Delete</Button>}</div>
//                                 <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingSkill(null); addingSkill ? handleCancelAdd('skills', () => setAddingSkill(false)) : setAddingSkill(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, () => {setEditingSkill(null); setAddingSkill(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }



import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Import DatePicker and its CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
import { format, parseISO, isDate, isValid } from "date-fns";

// --- API Client and Helper Functions ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const apiClient = {
    async request(method, url, data = null, isFormData = false, responseType = 'json') {
        const headers = {};
        const config = { method, headers };
        const authToken = getCookie('token');
        if (authToken) {
            headers['Authorization'] = `Bearer ${authToken}`;
        }
        if (data) {
            if (isFormData) {
                config.body = data;
            } else {
                headers['Content-Type'] = 'application/json';
                config.body = JSON.stringify(data);
            }
        }
        const fullUrl = `${API_BASE_URL}${url}`;
        try {
            const response = await fetch(fullUrl, config);
            if (response.status === 401) {
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = '/login'; 
                throw new Error("Authentication failed.");
            }
            if (!response.ok) {
                if (response.status === 404) return null;
                try {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
                } catch (e) {
                    throw new Error(`Request failed with status ${response.status}. The server response was not valid JSON.`);
                }
            }
            if (response.status === 204) return null;
            
            if (responseType === 'blob') return response.blob();
            
            return response.json();
        } catch (error) {
            console.error(`${method} request to ${fullUrl} failed:`, error);
            throw error;
        }
    },
    get: (url) => apiClient.request('GET', url, null, false, 'json'),
    getBlob: (url) => apiClient.request('GET', url, null, false, 'blob'),
    post: (url, data, isFormData = false) => apiClient.request('POST', url, data, isFormData),
    patch: (url, data, isFormData = false) => apiClient.request('PATCH', url, data, isFormData),
    delete: (url) => apiClient.request('DELETE', url),
};
// --- End API Client ---


export default function ProfileSettings() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    
    const [avatarSrc, setAvatarSrc] = useState(null);
    const avatarFileRef = useRef(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    
    // UI State for modals
    const [editingIntro, setEditingIntro] = useState(false);
    const [editingWork, setEditingWork] = useState(null);
    const [addingWork, setAddingWork] = useState(false);
    const [editingEducation, setEditingEducation] = useState(null);
    const [addingEducation, setAddingEducation] = useState(false);
    const [editingSkill, setEditingSkill] = useState(null);
    const [addingSkill, setAddingSkill] = useState(false);

    const parseDateSafely = (dateValue) => {
        if (!dateValue) return null;
        if (isDate(dateValue) && isValid(dateValue)) {
            return dateValue;
        }
        if (typeof dateValue === 'string' || typeof dateValue === 'number') {
            const parsedDate = new Date(dateValue);
            if (isValid(parsedDate)) {
                return parsedDate;
            }
        }
        return null;
    };

    const fetchProfile = async (isSilent = false) => {
        if (!isSilent) setLoading(true);
        setError(null);
        try {
            const authToken = getCookie('token');
            if (!authToken) throw new Error("Authentication token not found.");
            
            const headers = { Authorization: `Bearer ${authToken}` };
            const urls = [
                `${API_BASE_URL}/api/users-app/profile/me/`,
                `${API_BASE_URL}/api/users-app/profile/me/experiences/`,
                `${API_BASE_URL}/api/users-app/profile/me/education/`,
                `${API_BASE_URL}/api/users-app/profile/me/skills/`,
            ];
            const responses = await Promise.all(urls.map(url => fetch(url, { headers })));
            for (const res of responses) {
                if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
            }
            const [profileData, experiences, educations, skills] = await Promise.all(responses.map(res => res.json()));
            
            const fullProfile = {
                ...profileData,
                experiences: experiences.map(exp => ({
                    ...exp,
                    start_date: parseDateSafely(exp.start_date),
                    end_date: parseDateSafely(exp.end_date)
                })),
                educations: educations.map(edu => ({
                    ...edu,
                    start_year: parseDateSafely(edu.start_year),
                    end_year: parseDateSafely(edu.end_year)
                })),
                skills: skills || [],
            };
            setProfile(fullProfile);
        } catch (err) {
            setError(err.message);
        } finally {
            if (!isSilent) setLoading(false);
        }
    };

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const blob = await apiClient.getBlob("/api/users-app/profile/me/avatar/");
                if (blob && blob.size > 0) {
                    const objectUrl = URL.createObjectURL(blob);
                    setAvatarSrc(objectUrl);
                    return () => URL.revokeObjectURL(objectUrl);
                } else {
                    setAvatarSrc(null);
                }
            } catch (e) {
                console.error("Could not fetch avatar:", e);
                setAvatarSrc(null);
            }
        };

        if (!loading && profile) {
            fetchAvatar();
        }
    }, [loading, profile]);

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
    
    const handleModalChange = (model, stateIndex, field, value) => {
        setProfile(prev => {
            const newItems = [...prev[model]];
            newItems[stateIndex] = { ...newItems[stateIndex], [field]: value };
            return { ...prev, [model]: newItems };
        });
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveIntro = async () => {
        setSaving(true);
        try {
            const commonData = { full_name: profile.full_name || '', headline: profile.headline || '', about: profile.about || '', location: profile.location || '' };
            await apiClient.patch("/api/users-app/profile/me/", commonData, false);

            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar_blob', avatarFile);
                await apiClient.post("/api/users-app/profile/me/avatar/", formData, true);
            }
    
            setEditingIntro(false);
            setAvatarFile(null);
            setAvatarPreview(null);
            await fetchProfile(true); 
        } catch(e) { 
            console.error("Failed to save intro:", e);
            setError(e.message || "Could not save profile intro.");
        } finally { 
            setSaving(false);
        }
    };
    
    const handleSaveItem = async (model, apiPath, stateIndex, isAdding, closeFn) => {
        setSaving(true);
        const itemToSave = profile[model][stateIndex];
        const payload = { ...itemToSave };

        if (apiPath === 'education') {
            if (payload.start_year) payload.start_year = payload.start_year.getFullYear();
            if (payload.end_year) payload.end_year = payload.end_year.getFullYear();
        } else {
            if (payload.start_date) payload.start_date = format(payload.start_date, 'yyyy-MM-dd');
            if (payload.end_date) payload.end_date = format(payload.end_date, 'yyyy-MM-dd');
        }

        try {
            if (isAdding) {
                await apiClient.post(`/api/users-app/profile/me/${apiPath}/`, payload);
            } else {
                await apiClient.patch(`/api/users-app/profile/me/${apiPath}/${itemToSave.id}/`, payload);
            }
            closeFn();
            await fetchProfile(true); 
        } catch(e) { 
            console.error(e);
            setError(`Failed to save ${model}.`);
        } finally { 
            setSaving(false);
        }
    };
    
    const handleDeleteItem = async (apiPath, id, closeFn) => {
        if (!id || !window.confirm("Are you sure you want to delete this item?")) return;
        try {
            await apiClient.delete(`/api/users-app/profile/me/${apiPath}/${id}/`);
            closeFn();
            await fetchProfile(true);
        } catch(e) { 
            console.error(e);
            setError(`Failed to delete item.`);
        }
    };

    const handleCancelAdd = (model, closeStateFn) => {
        closeStateFn();
        setProfile(prev => ({...prev, [model]: prev[model].slice(0, -1)}));
    }


    if (loading) return <div className="text-center p-10">Loading profile...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Error: {error}.<br />Please try logging out and back in.</div>;
    if (!profile) return <div className="text-center p-10">Could not load profile data.</div>;
    
    const inputClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 h-10 px-3";
    const textareaClass = "ring-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-md bg-white border border-gray-300 min-h-[90px] p-3 resize-y w-full";
    const currentWorkData = (editingWork !== null || addingWork) ? profile.experiences[addingWork ? profile.experiences.length - 1 : editingWork] : null;
    const currentEducationData = (editingEducation !== null || addingEducation) ? profile.educations[addingEducation ? profile.educations.length - 1 : editingEducation] : null;
    const currentSkillData = (editingSkill !== null || addingSkill) ? profile.skills[addingSkill ? profile.skills.length - 1 : editingSkill] : null;
    const avatarPlaceholder = `https://api.dicebear.com/7.x/initials/svg?seed=${profile.full_name || 'User'}&backgroundColor=00897b,d81b60,8e24aa,3949ab&fontSize=36`;

    const CustomDateInput = forwardRef(({ value, onClick, disabled, placeholder }, ref) => (
        <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal"
            onClick={onClick}
            ref={ref}
            disabled={disabled}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value || placeholder}
        </Button>
    ));

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-5">
                            <img src={avatarSrc || avatarPlaceholder} alt="profile" className="h-24 w-24 rounded-full object-cover bg-gray-100" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{profile.full_name || "Your Name"}</h1>
                                <p className="text-gray-600">{profile.headline || "Your professional headline"}</p>
                                <p className="text-sm text-gray-500 mt-1">{profile.location || "Your Location"}</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setEditingIntro(true)}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-3">About</h2>
                        <p className="text-gray-700 whitespace-pre-wrap">{profile.about || "Add a summary about yourself."}</p>
                </div>

                {['experiences', 'educations'].map(section => (
                    <div key={section} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800 capitalize">{section}</h2>
                            <Button variant="ghost" size="icon" onClick={() => {
                                const placeholder = section === 'experiences' ? {title: "", company: "", end_date: null} : {school: "", degree: "", end_year: null};
                                setProfile(prev => ({...prev, [section]: [...prev[section], placeholder]}));
                                if (section === 'experiences') setAddingWork(true); else setAddingEducation(true);
                            }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
                        </div>
                        <div className="space-y-6">
                            {profile[section].length > 0 ? profile[section].map((item, index) => (
                                <div key={item.id || `new-${index}`} className="flex gap-4 items-start relative border-b pb-6 last:border-b-0 last:pb-0">
                                    <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center font-bold text-gray-500">
                                        {section === 'experiences' ? 'Exp' : 'Edu'}
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.title || item.school || "New Entry"}</h3>
                                        <p className="text-sm text-gray-600">{item.company || item.degree || "Details"}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {section === 'experiences' ? 
                                                `${item.start_date ? format(item.start_date, 'MMM yyyy') : '...'} - ${item.end_date ? format(item.end_date, 'MMM yyyy') : 'Present'}` :
                                                // ✅ Reverted to display only the year for education
                                                `${item.start_year ? format(item.start_year, 'yyyy') : '...'} - ${item.end_year ? format(item.end_year, 'yyyy') : 'Present'}`
                                            }
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        if (section === 'experiences') setEditingWork(index); else setEditingEducation(index);
                                    }}><Edit className="h-5 w-5 text-gray-600 hover:text-gray-900"/></Button>
                                </div>
                            )) : <p className="text-sm text-gray-500 text-center">No {section} added yet.</p>}
                        </div>
                    </div>
                ))}

                <div className="bg-white rounded-lg shadow-sm p-6">
                       <div className="flex justify-between items-center mb-4">
                           <h2 className="text-xl font-bold text-gray-800">Skills</h2>
                           <Button variant="ghost" size="icon" onClick={() => { setProfile({...profile, skills: [...profile.skills, {name: "", level: "Intermediate"}]}); setAddingSkill(true); }}><PlusCircle className="h-6 w-6 text-gray-600 hover:text-gray-900"/></Button>
                       </div>
                       <div className="flex flex-wrap gap-2">
                           {profile.skills.length > 0 ? profile.skills.map((skill, index) => (
                               <div key={skill.id || `new-${index}`} className="flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-3 py-1.5">
                                   <span className="font-semibold text-sm">{skill.name}</span>
                                   <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => setEditingSkill(index)}><Edit className="h-4 w-4 text-blue-600 hover:text-blue-900"/></Button>
                               </div>
                           )) : <p className="text-sm text-gray-500 text-center">No skills added yet.</p>}
                       </div>
                </div>

                {/* MODALS */}
                {editingIntro && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                       <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
                           <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Edit intro</h2><Button variant="ghost" size="icon" onClick={() => setEditingIntro(false)}><X/></Button></div>
                           <div className="flex items-center gap-4"><img src={avatarPreview || avatarSrc || avatarPlaceholder} alt="profile" className="h-20 w-20 rounded-full object-cover bg-gray-100" /><input type="file" ref={avatarFileRef} onChange={handleAvatarChange} accept="image/*" hidden /><Button variant="outline" onClick={() => avatarFileRef.current.click()}>Change Photo</Button></div>
                           <div><label className="text-sm font-medium">Full Name</label><Input className={inputClass} name="full_name" value={profile.full_name || ''} onChange={handleChange} /></div>
                           <div><label className="text-sm font-medium">Headline</label><Input className={inputClass} name="headline" value={profile.headline || ''} onChange={handleChange} /></div>
                           <div><label className="text-sm font-medium">Location</label><Input className={inputClass} name="location" value={profile.location || ''} onChange={handleChange} /></div>
                           <div><label className="text-sm font-medium">About</label><Textarea className={textareaClass} name="about" value={profile.about || ''} onChange={handleChange} /></div>
                           <div className="flex justify-end gap-3 pt-4"><Button variant="outline" onClick={() => setEditingIntro(false)}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={handleSaveIntro} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
                       </div>
                   </div>
                )}
                
                {currentWorkData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingWork ? "Add" : "Edit"} Experience</h2><Button variant="ghost" size="icon" onClick={() => {setEditingWork(null); addingWork ? handleCancelAdd('experiences', () => setAddingWork(false)) : setAddingWork(false);}}><X/></Button></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>Title</label><Input className={inputClass} value={currentWorkData.title || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'title', e.target.value)} /></div><div><label>Company</label><Input className={inputClass} value={currentWorkData.company || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'company', e.target.value)} /></div></div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="is_current_work" className="h-4 w-4 accent-blue-600" checked={!currentWorkData.end_date} onChange={(e) => { const isChecked = e.target.checked; handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', isChecked ? null : new Date()); }} />
                                <label htmlFor="is_current_work" className="text-sm font-medium">I am currently working in this role</label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <DatePicker
                                    selected={currentWorkData.start_date}
                                    onChange={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'start_date', date)}
                                    dateFormat="MMMM yyyy"
                                    showMonthYearPicker
                                    customInput={<CustomDateInput placeholder="Start Date" />}
                                />
                                <DatePicker
                                    selected={currentWorkData.end_date}
                                    onChange={date => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'end_date', date)}
                                    dateFormat="MMMM yyyy"
                                    showMonthYearPicker
                                    disabled={!currentWorkData.end_date}
                                    customInput={<CustomDateInput placeholder="End Date" disabled={!currentWorkData.end_date} />}
                                />
                            </div>
                            <div><label>Description</label><Textarea className={textareaClass} value={currentWorkData.description || ''} onChange={e => handleModalChange('experiences', addingWork ? profile.experiences.length-1 : editingWork, 'description', e.target.value)} /></div>
                            <div className="flex justify-between items-center pt-4">
                                <div>{!addingWork && <Button variant="destructive"  onClick={() => handleDeleteItem('experiences', currentWorkData.id, () => setEditingWork(null))} style={{ backgroundColor: '#ef4444', color: 'white' }}>Delete</Button>}</div>
                                <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingWork(null); addingWork ? handleCancelAdd('experiences', () => setAddingWork(false)) : setAddingWork(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('experiences', 'experiences', addingWork ? profile.experiences.length-1 : editingWork, addingWork, () => {setEditingWork(null); setAddingWork(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
                            </div>
                        </div>
                    </div>
                )}
                
                {currentEducationData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative space-y-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingEducation ? "Add" : "Edit"} Education</h2><Button variant="ghost" size="icon" onClick={() => {setEditingEducation(null); addingEducation ? handleCancelAdd('educations', () => setAddingEducation(false)) : setAddingEducation(false);}}><X/></Button></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label>School</label><Input className={inputClass} value={currentEducationData.school || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'school', e.target.value)} /></div><div><label>Degree</label><Input className={inputClass} value={currentEducationData.degree || ''} onChange={e => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'degree', e.target.value)} /></div></div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="is_current_edu" className="h-4 w-4 accent-blue-600" checked={!currentEducationData.end_year} onChange={(e) => { const isChecked = e.target.checked; handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', isChecked ? null : new Date()); }} />
                                <label htmlFor="is_current_edu" className="text-sm font-medium">I am currently studying here</label>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* ✅ Reverted to Year Picker */}
                                <DatePicker
                                    selected={currentEducationData.start_year}
                                    onChange={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'start_year', date)}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    customInput={<CustomDateInput placeholder="Start Year" />}
                                />
                                {/* ✅ Reverted to Year Picker */}
                                <DatePicker
                                    selected={currentEducationData.end_year}
                                    onChange={date => handleModalChange('educations', addingEducation ? profile.educations.length-1 : editingEducation, 'end_year', date)}
                                    dateFormat="yyyy"
                                    showYearPicker
                                    disabled={!currentEducationData.end_year}
                                    customInput={<CustomDateInput placeholder="End Year" disabled={!currentEducationData.end_year} />}
                                />
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <div>{!addingEducation && <Button variant="destructive" onClick={() => handleDeleteItem('education', currentEducationData.id, () => setEditingEducation(null))} style={{ backgroundColor: '#ef4444', color: 'white' }}>Delete</Button>}</div>
                                <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingEducation(null); addingEducation ? handleCancelAdd('educations', () => setAddingEducation(false)) : setAddingEducation(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('educations', 'education', addingEducation ? profile.educations.length-1 : editingEducation, addingEducation, () => {setEditingEducation(null); setAddingEducation(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
                            </div>
                        </div>
                    </div>
                )}
                
                {currentSkillData && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative space-y-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center"><h2 className="text-xl font-bold">{addingSkill ? "Add" : "Edit"} Skill</h2><Button variant="ghost" size="icon" onClick={() => {setEditingSkill(null); addingSkill ? handleCancelAdd('skills', () => setAddingSkill(false)) : setAddingSkill(false);}}><X/></Button></div>
                            <div><label>Skill Name</label><Input className={inputClass} value={currentSkillData.name || ''} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'name', e.target.value)} /></div>
                            <div><label>Proficiency Level</label>
                                <select className={inputClass + " w-full"} value={currentSkillData.level || 'Intermediate'} onChange={e => handleModalChange('skills', addingSkill ? profile.skills.length-1 : editingSkill, 'level', e.target.value)}>
                                    <option>Beginner</option>
                                    <option>Intermediate</option>
                                    <option>Expert</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <div>{!addingSkill && <Button variant="destructive" onClick={() => handleDeleteItem('skills', currentSkillData.id, () => setEditingSkill(null))}  style={{ backgroundColor: '#ef4444', color: 'white' }}>Delete</Button>}</div>
                                <div className="flex gap-3"><Button variant="outline" onClick={() => {setEditingSkill(null); addingSkill ? handleCancelAdd('skills', () => setAddingSkill(false)) : setAddingSkill(false);}}>Cancel</Button><Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => handleSaveItem('skills', 'skills', addingSkill ? profile.skills.length-1 : editingSkill, addingSkill, () => {setEditingSkill(null); setAddingSkill(false)})} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}