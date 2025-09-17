import React, { useState } from "react";
import { MapPin, Calendar, ExternalLink, Briefcase, Award, GraduationCap } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Linkedin,
  Github,
  Instagram,
  Twitter,
  Globe,
  
} from "lucide-react";
// Platforms
const platforms = [
  { name: "github", label: "Github", icon: Github },
  { name: "linkedin", label: "LinkedIn", icon: Linkedin },
  { name: "leetcode", label: "LeetCode", icon: Globe },
  { name: "codeforces", label: "Codeforces", icon: Globe },
  { name: "portfolio", label: "Portfolio", icon: Globe },
  { name: "instagram", label: "Instagram", icon: Instagram },
  { name: "twitter", label: "Twitter", icon: Twitter },
];
// Format date
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

// Text with view more / less
const ExpandableText = ({ text, maxLength = 100, maxLines = 2 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;

  const isTruncated = text.length > maxLength;
  const displayedText = !expanded && isTruncated ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="text-gray-700 break-all">
      <p className={`break-all ${!expanded ? `line-clamp-${maxLines}` : ""}`}>
        {displayedText}
      </p>
      {isTruncated && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 mt-1 text-sm font-medium "
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
    </div>
  );
};

// Card list with view more / less if > maxVisible
const ExpandableCardList = ({ items, maxVisible = 2, children }) => {
  const [expanded, setExpanded] = useState(false);
  if (!items || items.length === 0) return null;

  const visibleItems = !expanded ? items.slice(0, maxVisible) : items;

  return (
    <div className="space-y-4">
      {visibleItems.map((item, i) => children(item, i))}
      {items.length > maxVisible && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 mt-2 text-sm font-medium w-full flex justify-center "
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

  const handleViewProfileClick = () => {
    onOpenChange(false);
    navigate(`/users/${profile.username}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-0 m-0 bg-white rounded-lg shadow-sm">
        {/* Header cover */}
        {profile.banner_img_url ? (
  <img
    src={profile.banner_img_url}
    alt="Banner"
    className="w-full h-32 md:h-40 object-fill  rounded-t-lg p-0 m-0"
  />
) : (
  <div className=" h-32 md:h-40 bg-gradient-to-r from-blue-500 to-purple-400 rounded-t-lg" />
)}


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

  {profile.headline && (
    <p className="text-blue-600 font-medium">{profile.headline}</p>
  )}
   {profile.secondary_email && (
    <p className="text-gray-600 flex items-center mt-1">
      
      <a
        href={`mailto:${profile.secondary_email}`}
        className="text-blue-600 "
      >
        {profile.secondary_email}
      </a>
    </p>
  )}

  {profile.location && (
    <p className="text-gray-600 flex items-center mt-1">
      <MapPin className="w-4 h-4 mr-1" />
      {profile.location}
    </p>
  )}

 
</div>

                <button onClick={handleMessageClick} variant="outline" className="px-1 hover:text-indigo-600 ">Message</button>
                <button onClick={handleViewProfileClick} variant="outline" className="px-1 hover:text-indigo-600 ">
                  View Post
                </button>
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
                  <h2 className="text-lg font-semibold flex items-center mb-4">Work Experience</h2>
                  <ExpandableCardList items={profile.experiences} maxVisible={2}>
                    {(exp, i) => (
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
                    )}
                  </ExpandableCardList>
                </div>
              )}

              {/* Education */}
              {profile.educations?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 mr-2" /> Education
                  </h2>
                  <ExpandableCardList items={profile.educations} maxVisible={2}>
                    {(edu, i) => (
                      <Card key={i} className="border-none">
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{edu.school}</h3>
                          <p className="text-blue-600 font-medium">
                            {edu.degree} {edu.field_of_study && `in ${edu.field_of_study}`}
                          </p>
                          <p className="text-gray-600 text-sm flex items-center mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {edu.start_year} – {edu.end_year}
                          </p>
                          {edu.description && (
                            <ExpandableText text={edu.description} maxLength={300} maxLines={2} />
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </ExpandableCardList>
                </div>
              )}

              {/* Projects */}
              {profile.projects?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold flex items-center mb-4">
                    <Briefcase className="w-5 h-5 mr-2" /> Projects
                  </h2>
                  <ExpandableCardList items={profile.projects} maxVisible={2}>
                    {(project, i) => (
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
                    )}
                  </ExpandableCardList>
                </div>
              )}

              {/* Achievements */}
              {profile.certificates?.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-lg font-semibold flex items-center mb-4">
                    <Award className="w-5 h-5 mr-2" /> Certificates
                  </h2>
                  <ExpandableCardList items={profile.certificates} maxVisible={2}>
                    {(cert, i) => (
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
                    )}
                  </ExpandableCardList>
                </div>
              )}
            {/* Skills Section */}
{profile.skills?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Skills
    </h2>
    <div className="flex flex-wrap gap-2">
      {profile.skills.map((skill, i) => (
        <Badge
          key={i}
          variant="secondary"
          className="px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-md rounded-full"
        >
          {skill.name || skill} <span className="text-sm text-gray-500">{skill.level && `(${skill.level})`}</span>
        </Badge>
      ))}
    </div>
  </div>
)}

              {/* Links */}
              {profile.social_links?.length > 0 && (
  <div className="mt-8">
    <h2 className="text-lg font-semibold mb-4"> Social Links</h2>
    <div className="space-y-2">
      {profile.social_links.map((link) => {
        const platform = platforms.find(
          (p) =>
            p.name.toLowerCase() === link.platform.toLowerCase() ||
            p.label.toLowerCase() === link.platform.toLowerCase()
        );

        const Icon = platform?.icon || ExternalLink; // fallback icon

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center  hover:bg-purple-100 text-blue-600 hover:text-blue-800 w-full px-2 py-2"
          >
            <Icon className="w-4 h-4 mr-2" />
            {platform?.label || link.platform}
          </a>
        );
      })}
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
