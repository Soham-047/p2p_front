import React, { useState } from "react";
import { MapPin, Calendar, ExternalLink, Briefcase, Award, GraduationCap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

// const ExpandableText = ({ text, maxLength = 100, maxLines = 2 }) => {
//   const [expanded, setExpanded] = useState(false);

//   if (!text) return null;

//   const truncatedByLength = text.length > maxLength;
//   const displayedText = !expanded && truncatedByLength ? text.slice(0, maxLength) + "..." : text;

//   return (
//     <div className="text-gray-700 break-words">
//   <p className={`line-clamp-${!expanded ? maxLines : "none"} break-words`}>
//     {displayedText}
//   </p>
//   {truncatedByLength && (
//     <button
//       onClick={() => setExpanded(!expanded)}
//       className="text-blue-600 hover:text-blue-800 mt-1 text-sm font-medium"
//     >
//       {expanded ? "View less" : "View more"}
//     </button>
//   )}
// </div>

//   );
// };// Expandable text component

const ExpandableText = ({ text, maxLength = 100, maxLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const truncatedByLength = text.length > maxLength;
  const displayedText = !expanded && truncatedByLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="text-gray-700 break-all">
      <p className={`line-clamp-${!expanded ? maxLines : "none"} break-all`}>
        {displayedText}
      </p>
      {truncatedByLength && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 mt-1 text-sm font-medium"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
};

const ProfileDialog = ({ open, onOpenChange, profile, onMessageClick }) => {
  const navigate = useNavigate();
  if (!profile) return null;

  const handleMessageClick = () => {
    onOpenChange(false);
    navigate('/message');
    setTimeout(() => {
      if (onMessageClick) {
        onMessageClick({
          username: profile.username,
          fullName: profile.full_name || profile.username,
        });
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-0 bg-white rounded-lg shadow-lg">
        {/* Header cover */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-400" />

        {/* Profile Info */}
        <div className="px-6 pb-10">
          <div className="gap-1 -mt-16">
            <Avatar className="w-28 h-28 border-4 border-white shadow-md">
              <AvatarImage src={profile.avatar_url || "/placeholder-avatar.jpg"} />
              <AvatarFallback className="text-2xl">
                {profile.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
                  {profile.headline && <p className="text-blue-600 font-medium">{profile.headline}</p>}
                  {profile.location && (
                    <p className="text-gray-600 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </p>
                  )}
                </div>
                <Button onClick={handleMessageClick} className="rounded-full">
                  Message
                </Button>
              </div>

              {/* Summary */}
              {profile.about && (
                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Summary</h2>
                  <ExpandableText text={profile.about} maxLength={100} maxLines={2} />
                </div>
              )}

              {/* Work Experience */}
              {profile.experiences?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold flex items-center mb-4">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {profile.experiences.map((exp, i) => (
                      <Card key={i} className="border-none">
                        <CardContent className="p-4">
                          <span className="flex items-center text-lg mb-1">
                            <Briefcase className="w-5 h-5 mr-2" /> 
                            <h3 className="font-semibold">{exp.title}</h3> 
                          </span>
                          <p className="text-blue-600 font-medium">{exp.company}</p>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(exp.start_date)} – {exp.end_date ? formatDate(exp.end_date) : "Present"}
                            {exp.location && ` • ${exp.location}`}
                          </p>
                          {exp.description && (
                            <ExpandableText text={exp.description} maxLength={300} maxLines={2} />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {profile.education?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 mr-2" /> Education
                  </h2>
                  <div className="space-y-4">
                    {profile.education.map((edu, i) => (
                      <Card key={i} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{edu.institution}</h3>
                          <p className="text-blue-600 font-medium">{edu.degree}</p>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(edu.start_date)} – {formatDate(edu.end_date)}
                          </p>
                          {edu.description && (
                            <ExpandableText text={edu.description} maxLength={300} maxLines={2} />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
                 {/* Projects */}
                 {profile.projects?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold flex items-center mb-4">
      <Briefcase className="w-5 h-5 mr-2" /> Projects
    </h2>
    <div className="space-y-4">
      {profile.projects.map((project, i) => (
        <Card key={i} className="border-none w-full">
        <CardContent className="p-4 w-full">
  <span className="flex items-center text-lg mb-1">
    <Briefcase className="w-5 h-5 mr-2" />
    <h3 className="font-semibold break-words">{project.title}</h3>
  </span>
  {project.description && (
    <ExpandableText text={project.description} maxLength={100} maxLines={2} />
  )}
  {project.link && (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-blue-600 hover:text-blue-800 mt-2 break-words"
    >
      <ExternalLink className="w-4 h-4 mr-2" /> View Project
    </a>
  )}
</CardContent>

        </Card>
      ))}
    </div>
  </div>
)}


              {/* Achievements */}
              {profile.certificates?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold flex items-center mb-4">
      <Award className="w-5 h-5 mr-2" /> Certificates
    </h2>
    <div className="space-y-4">
      {profile.certificates.map((cert, i) => (
        <Card key={i} className="border-none">
          <CardContent className="p-4">
            <h3 className="font-semibold">{cert.name}</h3>
            {cert.issuer && <p className="text-blue-600 font-medium">{cert.issuer}</p>}
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              {cert.issue_date ? formatDate(cert.issue_date) : "N/A"}
              {cert.credential_id && ` • ID: ${cert.credential_id}`}
            </p>
            {cert.credential_url && (
              <a
                href={cert.credential_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 mt-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" /> View Certificate
              </a>
            )}
            {cert.description && (
              <ExpandableText text={cert.description} maxLength={300} maxLines={2} />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
)}

              {/* Skills */}
              {profile.skills?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1">
                        {skill.name || skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {profile.links?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Links</h2>
                  <div className="space-y-2">
                    {profile.links.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
