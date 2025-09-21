"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export function AdmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData(e.currentTarget)

      const response = await fetch("/api/admission", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your application. We'll review it and contact you soon.",
        })
        e.currentTarget.reset()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Admission Application Form</CardTitle>
        <p className="text-muted-foreground">Please fill out all required fields to complete your application</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-border pb-2">Student Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentFirstName">Student First Name *</Label>
                <Input id="studentFirstName" name="studentFirstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentLastName">Student Last Name *</Label>
                <Input id="studentLastName" name="studentLastName" required />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select name="gender" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Applying For *</Label>
                <Select name="grade" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nursery">Nursery</SelectItem>
                    <SelectItem value="lkg">LKG</SelectItem>
                    <SelectItem value="ukg">UKG</SelectItem>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Parent/Guardian Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-border pb-2">Parent/Guardian Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentFirstName">Parent/Guardian First Name *</Label>
                <Input id="parentFirstName" name="parentFirstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentLastName">Parent/Guardian Last Name *</Label>
                <Input id="parentLastName" name="parentLastName" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email Address *</Label>
                <Input id="parentEmail" name="parentEmail" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Phone Number *</Label>
                <Input id="parentPhone" name="parentPhone" type="tel" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" name="occupation" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" name="address" rows={3} required />
            </div>
          </div>

          {/* Previous School Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-border pb-2">
              Previous School Information (if applicable)
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School Name</Label>
                <Input id="previousSchool" name="previousSchool" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastGrade">Last Grade Completed</Label>
                <Input id="lastGrade" name="lastGrade" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonForTransfer">Reason for Transfer</Label>
              <Textarea id="reasonForTransfer" name="reasonForTransfer" rows={2} />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-border pb-2">Additional Information</h3>

            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions or Allergies</Label>
              <Textarea
                id="medicalConditions"
                name="medicalConditions"
                rows={2}
                placeholder="Please list any medical conditions, allergies, or special needs"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                name="additionalComments"
                rows={3}
                placeholder="Any additional information you'd like to share"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and confirm that all information provided is accurate *
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" />
              <Label htmlFor="newsletter" className="text-sm">
                I would like to receive updates and newsletters from Ghoslya Childrens Academy
              </Label>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
