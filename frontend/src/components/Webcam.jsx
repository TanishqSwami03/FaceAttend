"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import Button from "./Button"

const Webcam = ({ onCapture, onClose }) => {
  const videoRef = useRef(null)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setStream(stream)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing webcam:", err)
      }
    }

    startWebcam()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const handleCapture = () => {
    // Simulate face recognition
    const isRecognized = Math.random() > 0.3 // 70% chance of success
    onCapture(isRecognized)

    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
    }
    onClose()
  }

  return (
    <motion.div
      className="webcam-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div className="webcam-overlay"></div>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          left: "0",
          right: "0",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Button onClick={handleCapture}>Capture</Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </motion.div>
  )
}

export default Webcam
