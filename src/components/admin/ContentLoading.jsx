import React from 'react'

const ContentLoading = () => {
  return (
     <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-(--border)" />
          <div
            className="
              absolute
              inset-0
              rounded-full
              border-2
              border-transparent
              border-t-(--primary)
              animate-spin
            "
          />

          {/* Logo */}
          <img
            src="/images/olivetNOSA_logo.png"
            alt="Olivet NOSA"
            className="w-9 h-9 object-contain"
          />
        </div>

        <p className="text-sm font-medium text-(--primary) mt-4">
          Loading dashboard
        </p>

        <p className="text-xs text-(--text-muted) mt-1">
          Please wait...
        </p>
      </div>
    </div>
  )
}

export default ContentLoading