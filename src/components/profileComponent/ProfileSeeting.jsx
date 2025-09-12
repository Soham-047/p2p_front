



import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Import DatePicker and its CSS
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CalendarIcon, PlusCircle, X, Edit } from "lucide-react";
import { format, isDate, isValid } from "date-fns";

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
                } catch {
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