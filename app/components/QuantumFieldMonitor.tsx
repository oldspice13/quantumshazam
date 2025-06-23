"use client"

import { useState, useEffect } from "react"

interface QuantumFieldMonitorProps {
  quantumField: {
    coherenceLevel: number
    manifestationWindow: boolean
    synchronicityAmplification: number
    realityMalleability: number
  }
  currentDay: number
  archetype: string
}

export function QuantumFieldMonitor({ quantumField, currentDay, archetype }: QuantumFieldMonitorProps) {
  const [fieldActivity, setFieldActivity] = useState(0)
  const [resonancePattern, setResonancePattern] = useState<number[]>([])

  useEffect(() => {
    // Simulate quantum field fluctuations
    const interval = setInterval(() => {
      setFieldActivity(Math.random() * 100)
      setResonancePattern((prev) => {
        const newPattern = [...prev, Math.random() * 100].slice(-20)
        return newPattern
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getFieldStatus = () => {
    if (quantumField.coherenceLevel > 90) return { status: "TRANSCENDENT", color: "#8b5cf6", icon: "🌟" }
    if (quantumField.coherenceLevel > 75) return { status: "MASTERY", color: "#ffaa00", icon: "👑" }
    if (quantumField.coherenceLevel > 60) return { status: "INTEGRATION", color: "#ff0080", icon: "🔥" }
    if (quantumField.coherenceLevel > 40) return { status: "ACTIVATION", color: "#00d4ff", icon: "⚡" }
    return { status: "FOUNDATION", color: "#00ff88", icon: "🌱" }
  }

  const fieldStatus = getFieldStatus()

  const getArchetypeResonance = () => {
    const resonances = {
      visionary: { frequency: "432.7 Hz", pattern: "Spiral", alignment: "Timeline Flux" },
      creator: { frequency: "528.3 Hz", pattern: "Mandala", alignment: "Creative Matrix" },
      warrior: { frequency: "741.2 Hz", pattern: "Lightning", alignment: "Power Grid" },
      mystic: { frequency: "963.9 Hz", pattern: "Lotus", alignment: "Divine Source" },
    }
    return resonances[archetype as keyof typeof resonances] || resonances.visionary
  }

  const archetypeResonance = getArchetypeResonance()

  return (
    <div className="quantum-field-monitor glass-card p-6 mb-8 border-2 border-[#8b5cf6]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center animate-pulse"
            style={{
              borderColor: fieldStatus.color,
              backgroundColor: `${fieldStatus.color}22`,
              boxShadow: `0 0 20px ${fieldStatus.color}`,
            }}
          >
            <span className="text-xl">{fieldStatus.icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#8b5cf6]">QUANTUM FIELD MONITOR</h3>
            <div className="text-sm" style={{ color: fieldStatus.color }}>
              Status: {fieldStatus.status}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold" style={{ color: fieldStatus.color }}>
            {Math.round(quantumField.coherenceLevel)}%
          </div>
          <div className="text-xs text-[#8888aa]">Field Coherence</div>
        </div>
      </div>

      {/* Real-time Field Visualization */}
      <div className="mb-6">
        <div className="relative w-full h-24 bg-[rgba(20,20,32,0.5)] rounded-xl overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 100">
            <defs>
              <linearGradient id="fieldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={fieldStatus.color} />
                <stop offset="50%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#ff0080" />
              </linearGradient>
            </defs>

            {/* Animated field waves */}
            <path
              d={`M 0,50 ${resonancePattern
                .map((point, index) => `L ${index * 20},${50 + (point - 50) * 0.3}`)
                .join(" ")}`}
              stroke="url(#fieldGradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>

          <div className="absolute top-2 left-2 text-xs text-[#8888aa]">
            Field Activity: {Math.round(fieldActivity)}%
          </div>
        </div>
      </div>

      {/* Field Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-[rgba(0,255,136,0.1)] border border-[#00ff88] rounded-xl">
          <div className="text-lg font-bold text-[#00ff88]">{Math.round(quantumField.coherenceLevel)}%</div>
          <div className="text-xs text-[#8888aa]">Coherence</div>
        </div>

        <div className="text-center p-3 bg-[rgba(0,212,255,0.1)] border border-[#00d4ff] rounded-xl">
          <div className="text-lg font-bold text-[#00d4ff]">{Math.round(quantumField.realityMalleability)}%</div>
          <div className="text-xs text-[#8888aa]">Malleability</div>
        </div>

        <div className="text-center p-3 bg-[rgba(255,0,128,0.1)] border border-[#ff0080] rounded-xl">
          <div className="text-lg font-bold text-[#ff0080]">{quantumField.synchronicityAmplification.toFixed(1)}x</div>
          <div className="text-xs text-[#8888aa]">Sync Amp</div>
        </div>

        <div className="text-center p-3 bg-[rgba(139,92,246,0.1)] border border-[#8b5cf6] rounded-xl">
          <div className="text-lg font-bold text-[#8b5cf6]">{quantumField.manifestationWindow ? "OPEN" : "CLOSED"}</div>
          <div className="text-xs text-[#8888aa]">Window</div>
        </div>
      </div>

      {/* Archetype Resonance */}
      <div
        className="border-2 rounded-xl p-4"
        style={{
          borderColor: fieldStatus.color,
          backgroundColor: `${fieldStatus.color}11`,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold" style={{ color: fieldStatus.color }}>
            {archetype.toUpperCase()} RESONANCE PATTERN
          </h4>
          <div className="text-sm text-[#8888aa]">Day {currentDay}</div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm text-[#8888aa]">Frequency</div>
            <div className="font-bold" style={{ color: fieldStatus.color }}>
              {archetypeResonance.frequency}
            </div>
          </div>
          <div>
            <div className="text-sm text-[#8888aa]">Pattern</div>
            <div className="font-bold" style={{ color: fieldStatus.color }}>
              {archetypeResonance.pattern}
            </div>
          </div>
          <div>
            <div className="text-sm text-[#8888aa]">Alignment</div>
            <div className="font-bold" style={{ color: fieldStatus.color }}>
              {archetypeResonance.alignment}
            </div>
          </div>
        </div>
      </div>

      {/* Manifestation Window Alert */}
      {quantumField.manifestationWindow && (
        <div className="mt-4 bg-[rgba(255,0,128,0.2)] border-2 border-[#ff0080] rounded-xl p-4 animate-pulse">
          <div className="text-center">
            <div className="text-xl font-bold text-[#ff0080] mb-2">⚡ MANIFESTATION WINDOW ACTIVE ⚡</div>
            <div className="text-sm text-[#e8e8ff]">
              Reality is highly malleable. Your intentions have maximum power right now.
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 