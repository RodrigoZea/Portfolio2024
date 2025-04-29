import { useEffect, useState } from 'react'

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    let idCounter = 0
    // spawn a new bubble every 400ms
    const spawn = setInterval(() => {
      setBubbles(bs => [
        ...bs,
        {
          id: idCounter++,
          x: Math.random() * 100,               // start percent from left
          size: 20 + Math.random() * 40,        // px diameter
          duration: 4000 + Math.random() * 3000,// ms to float
          wiggleAmp: 10 + Math.random() * 10,   // % horizontal wiggle
          wiggleFreq: 1 + Math.random() * 2,    // wiggles per float
          start: Date.now()
        }
      ])
    }, 400)

    const tick = () => {
      const now = Date.now()
      setBubbles(bs =>
        bs
          .map(b => {
            const t = (now - b.start) / b.duration
            return { ...b, t }
          })
          .filter(b => b.t < 1)
      )
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return () => clearInterval(spawn)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}
    >
      {bubbles.map(b => {
        // vertical position: 0→100%
        const bottom = `${b.t * 100}%`
        // horizontal wiggle around b.x
        const wiggle = Math.sin(b.t * Math.PI * 2 * b.wiggleFreq) * b.wiggleAmp
        const left = `${b.x + wiggle}%`
        return (
          <div
            key={b.id}
            style={{
                position: 'absolute',
                left,
                bottom,
                width: `${b.size}px`,
                height: `${b.size}px`,
                borderRadius: '50%',
                transform: 'translateX(-50%)',
                background: 'radial-gradient(circle, transparent 30%, #5622e2 100%)'
            }}
            />
        )
      })}
    </div>
  )
}
