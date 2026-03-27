import { useState, useEffect } from 'react'

const STORAGE_KEY = 'elnova_whatsapp_analytics'

export const useAnalytics = () => {
  const [analytics, setAnalytics] = useState(() => {
    // Load analytics from localStorage on initial render
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  })

  // Save analytics to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analytics))
  }, [analytics])

  const trackWhatsAppClick = (productId) => {
    setAnalytics(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }))
  }

  const getBestSellingProducts = (products, limit = 6) => {
    if (!products.length) return []
    
    // Sort products by WhatsApp click count (descending)
    const sorted = [...products].sort((a, b) => {
      const clicksA = analytics[a.id] || 0
      const clicksB = analytics[b.id] || 0
      return clicksB - clicksA
    })

    // If no analytics data yet, return first products as fallback
    const hasAnalytics = Object.keys(analytics).length > 0
    if (!hasAnalytics) {
      return products.slice(0, limit)
    }

    return sorted.slice(0, limit)
  }

  const getProductClicks = (productId) => {
    return analytics[productId] || 0
  }

  return {
    analytics,
    trackWhatsAppClick,
    getBestSellingProducts,
    getProductClicks
  }
}
