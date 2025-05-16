"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import "./MaintenanceGlitch.css"

const MaintenanceGlitch = () => {
  const [glitchActive, setGlitchActive] = useState(false)
  // const [countdown, setCountdown] = useState({
  //   hours: 3,
  //   minutes: 0,
  //   seconds: 0,
  // })
  const [terminalText, setTerminalText] = useState("")
  const [terminalCursor, setTerminalCursor] = useState(true)

  const terminalLines = [
    "Initializing system recovery...",
    "Scanning for corrupted files...",
    "Rebuilding frontend components...",
    "Optimizing user interface...",
    "Applying security patches...",
    "Testing system integrity...",
    "Finalizing maintenance process...",
  ]

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      Math.random() * 5000 + 2000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer)
          return prev
        }

        let newHours = prev.hours
        let newMinutes = prev.minutes
        let newSeconds = prev.seconds - 1

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Terminal text animation
  useEffect(() => {
    let currentLineIndex = 0
    let currentCharIndex = 0
    let isDeleting = false

    const typeText = () => {
      const currentLine = terminalLines[currentLineIndex]

      if (!isDeleting) {
        // Typing
        if (currentCharIndex <= currentLine.length) {
          setTerminalText(currentLine.substring(0, currentCharIndex))
          currentCharIndex++
          setTimeout(typeText, 50 + Math.random() * 50)
        } else {
          // Pause at the end of line
          isDeleting = true
          setTimeout(typeText, 2000)
        }
      } else {
        // Deleting
        if (currentCharIndex > 0) {
          setTerminalText(currentLine.substring(0, currentCharIndex))
          currentCharIndex--
          setTimeout(typeText, 30)
        } else {
          // Move to next line
          isDeleting = false
          currentLineIndex = (currentLineIndex + 1) % terminalLines.length
          setTimeout(typeText, 500)
        }
      }
    }

    typeText()

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setTerminalCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={`glitch-maintenance-container ${glitchActive ? "glitch-active" : ""}`}>
      <div className="glitch-overlay"></div>

      <div className="glitch-content">
        {/* <motion.div
          className="glitch-logo-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <M_Logo />
          <div className={`glitch-effect ${glitchActive ? "active" : ""}`}></div>
        </motion.div> */}

        <motion.h1
          className="glitch-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          data-text="System Maintenance"
        >
          System Maintenance
        </motion.h1>

        <motion.div
          className="glitch-terminal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glitch-terminal-header">
            <div className="glitch-terminal-button"></div>
            <div className="glitch-terminal-button"></div>
            <div className="glitch-terminal-button"></div>
            <div className="glitch-terminal-title">maintenance.sh</div>
          </div>
          <div className="glitch-terminal-body">
            <span className="glitch-terminal-prompt">$ </span>
            <span className="glitch-terminal-text">{terminalText}</span>
            <span className={`glitch-terminal-cursor ${terminalCursor ? "active" : ""}`}>_</span>
          </div>
        </motion.div>

        {/* <motion.div
          className="glitch-countdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="glitch-countdown-title">Estimated Time Remaining</div>
          <div className="glitch-countdown-timer">
            <div className="glitch-countdown-segment">
              <div className="glitch-countdown-value">{countdown.hours.toString().padStart(2, "0")}</div>
              <div className="glitch-countdown-label">Hours</div>
            </div>
            <div className="glitch-countdown-separator">:</div>
            <div className="glitch-countdown-segment">
              <div className="glitch-countdown-value">{countdown.minutes.toString().padStart(2, "0")}</div>
              <div className="glitch-countdown-label">Minutes</div>
            </div>
            <div className="glitch-countdown-separator">:</div>
            <div className="glitch-countdown-segment">
              <div className="glitch-countdown-value">{countdown.seconds.toString().padStart(2, "0")}</div>
              <div className="glitch-countdown-label">Seconds</div>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          className="glitch-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p>We're currently performing maintenance to improve your experience.</p>
          <p>Everything will be back online as soon as possible.</p>
        </motion.div>

        {/* <motion.div
          className="glitch-contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.a href="mailto:support@faceattend.com" whileHover={{ scale: 1.05, x: 5 }} whileTap={{ scale: 0.95 }}>
            Contact Support
          </motion.a>
        </motion.div> */}
      </div>

      <div className={`glitch-scanline ${glitchActive ? "active" : ""}`}></div>
      <div className={`glitch-noise ${glitchActive ? "active" : ""}`}></div>


      {/* <style jsx>{``}</style> */}
    </div>
  )
}

export default MaintenanceGlitch
