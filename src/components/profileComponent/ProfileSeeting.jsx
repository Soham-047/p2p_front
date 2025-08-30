import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

export default function ProfileSettings() {
  const [form, setForm] = useState({
    fullName: "Mahendra Saervi",
    collegeEmail: "kaluxcod@gmail.com",
    personalEmail: "",
    bio: "",
    institution: "Indian Institute of Information Technology",
    degree: "Bachelor of Technology",
    startYear: new Date("2022-11-01"),
    endYear: new Date("2026-06-01"),
    location: "",
    experiences: "",
    links: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ✅ Custom styles
  const inputClass =
    " ring-0 focus-visible:ring-1 focus-visible:ring-purple-500 rounded-2xl bg-white border border-gray-200 overflow-hidden h-12 px-3"
  const textareaClass =
    " ring-0 focus-visible:ring-1 focus-visible:ring-purple-500 rounded-2xl bg-white border border-gray-200 min-h-[90px] p-3 resize-y md:max-w-5xl w-full"

  return (
    <Card className="p-6 shadow-lg border border-transparent">
      <CardContent className="space-y-6">
        <h1 className="text-3xl font-bold">Profile Setting</h1>

        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/80"
            alt="profile"
            className="h-20 w-20 rounded-full object-cover shadow-md"
          />
          <Button variant="outline" className="rounded-2xl">
            Change Photo
          </Button>
        </div>

        {/* Full Name + College Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <Input
              className={inputClass}
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">College Email</label>
            <Input
              className={inputClass}
              name="collegeEmail"
              value={form.collegeEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Personal Email + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Personal Email</label>
            <Input
              className={inputClass}
              name="personalEmail"
              value={form.personalEmail}
              onChange={handleChange}
              placeholder="personal email"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <Input
              className={inputClass}
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="text-sm text-gray-600">Bio</label>
          <Textarea
            className={textareaClass}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Tell us a bit about yourself"
          />
        </div>

        {/* Experiences */}
        <div>
          <label className="text-sm text-gray-600">Experiences</label>
          <Textarea
            className={textareaClass}
            name="experiences"
            value={form.experiences}
            onChange={handleChange}
            placeholder="Add experiences (comma separated or JSON later)"
          />
        </div>

        {/* Links */}
        <div>
          <label className="text-sm text-gray-600">Links</label>
          <Textarea
            className={textareaClass + " whitespace-pre-wrap"}
            name="links"
            value={form.links}
            onChange={handleChange}
            placeholder="Portfolio, LinkedIn, GitHub..."
          />
        </div>

        {/* Education */}
        <div className="border border-gray-200  p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              className={inputClass}
              name="institution"
              value={form.institution}
              onChange={handleChange}
              placeholder="Institution"
            />
            <Input
              className={inputClass}
              name="degree"
              value={form.degree}
              onChange={handleChange}
              placeholder="Degree"
            />

            {/* Start Year Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal rounded-2xl h-12 bg-white border border-gray-200"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.startYear ? format(form.startYear, "MMMM yyyy") : "Pick Start Month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={form.startYear}
                  onSelect={(date) => date && setForm({ ...form, startYear: date })}
                  month={form.startYear}
                  onMonthChange={(date) => setForm({ ...form, startYear: date })}
                />
              </PopoverContent>
            </Popover>

            {/* End Year Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal rounded-2xl h-12 bg-white border border-gray-200"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.endYear ? format(form.endYear, "MMMM yyyy") : "Pick End Month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white">
                <Calendar
                  mode="single"
                  selected={form.endYear}
                  onSelect={(date) => date && setForm({ ...form, endYear: date })}
                  month={form.endYear}
                  onMonthChange={(date) => setForm({ ...form, endYear: date })}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button className="w-full md:w-1/3 bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-2xl text-lg h-12">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
