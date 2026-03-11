import { useEffect, useState } from 'react'

function PerformanceMetrics() {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0
  })

  useEffect(() => {
    // Collect Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint (FCP)
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: entry.startTime.toFixed(2) }))
            }
          })
        })
        fcpObserver.observe({ entryTypes: ['paint'] })
      } catch (e) {
        console.error('FCP observer error:', e)
      }

      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1]
            setMetrics(prev => ({ ...prev, lcp: lastEntry.renderTime.toFixed(2) }))
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      } catch (e) {
        console.error('LCP observer error:', e)
      }

      // Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry) => {
            setMetrics(prev => ({ ...prev, cls: (prev.cls + entry.value).toFixed(3) }))
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
      } catch (e) {
        console.error('CLS observer error:', e)
      }
    }

    // Get Navigation Timing data
    const navigationTiming = performance.getEntriesByType('navigation')[0]
    if (navigationTiming) {
      const ttfb = navigationTiming.responseStart - navigationTiming.fetchStart
      setMetrics(prev => ({ ...prev, ttfb: ttfb.toFixed(2) }))
    }
  }, [])

  return (
    <div className="performance-metrics">
      <h3>Core Web Vitals</h3>
      <div className="metrics-grid">
        <div className="metric-card">
          <span className="metric-label">FCP</span>
          <span className="metric-value">{metrics.fcp}ms</span>
          <span className="metric-desc">First Contentful Paint</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">LCP</span>
          <span className="metric-value">{metrics.lcp}ms</span>
          <span className="metric-desc">Largest Contentful Paint</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">TTFB</span>
          <span className="metric-value">{metrics.ttfb}ms</span>
          <span className="metric-desc">Time to First Byte</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">CLS</span>
          <span className="metric-value">{metrics.cls}</span>
          <span className="metric-desc">Cumulative Layout Shift</span>
        </div>
      </div>
    </div>
  )
}

export default PerformanceMetrics
