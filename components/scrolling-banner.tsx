"use client"

export function ScrollingBanner() {
  const announcements = [
    "🎓 Admissions Open for Academic Year 2024-25",
    "🏆 Our students won the Inter-School Science Competition",
    "📚 New Library with 10,000+ books now open",
    "🎨 Art & Craft Exhibition on December 15th",
    "⭐ Rated as Top School in Bharni District",
  ]

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
      <div className="flex animate-scroll">
        {[...announcements, ...announcements].map((announcement, index) => (
          <div key={index} className="flex-shrink-0 px-8 text-sm font-medium whitespace-nowrap">
            {announcement}
          </div>
        ))}
      </div>
    </div>
  )
}
