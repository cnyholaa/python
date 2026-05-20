1. Project Overview
This project presents a modular real-time music visualisation framework developed using p5.js and p5.sound.
The system extends the original coursework template through the implementation of three audio-reactive modules:
  ・HeartGlow
  ・DrumBeat
  ・Webcam Video Terrain

The architecture follows a separation-of-concerns model, preserving the core rendering lifecycle while enabling plug-in style visual module integration.

The objective of the project is to demonstrate:
  ・Real-time audio analysis
  ・3D WEBGL rendering
  ・Modular object-oriented architecture
  ・Performance-aware interactive system design

2. System Architecture
The application follows a layered framework model:

Core Rendering Layer (p5.js)
        ↓
Audio Processing Layer (FFT / Waveform)
        ↓
Visualisation Container
        ↓
Active Module Runtime

Architectural Characteristics：
・Object-oriented visual modules
・Independent setup() and draw() lifecycle per module
・Modular registration via visualisations container
・No modification to the core template structure
・Defensive guards for asynchronous video initialisation
・Performance optimisation using off-screen buffers (createGraphics)
This design ensures scalability, maintainability, and runtime stability.

3. Visualisation Modules
3.1 HeartGlow
A parametric heart curve generated using mathematical modelling principles (referenced from Wolfram MathWorld).

Features:
・Iterative vertex computation
・Layered volumetric glow
・Custom beat detection system
・Event-driven Z-axis displacement
・Particle emission system
・Off-screen texture buffering for performance optimisation

Design principle: Event-driven perceptual coupling.

3.2 DrumBeat
A radial 3D cylinder array rendered in WEBGL.

Features:
・Non-linear amplitude mapping
・HSB colour space transitions
・Probabilistic star particle system
・Hybrid deterministic + stochastic visual behaviour
Design principle: Perceptual amplification of waveform intensity.

3.3 Webcam Video Terrain
Real-time webcam capture integrated with FFT analysis.

Features:
・Pixel brightness mapped to terrain height
・Audio energy mapped to Z-axis extrusion
・Asynchronous video initialisation guard
・Null frame protection
Design principle: Compound audiovisual coupling.

4. Technical Requirements
・Browser Requirements:
  Edge (recommended)
  Google Chrome / Firefox (desktop supported)
  Webcam permission required for Terrain mode
・Hardware Requirements
  GPU-enabled device recommended for stable WEBGL rendering
  Performance may vary on mobile devices

5. How to Run
①.Download the project folder
②.Open index.html
③.Ensure audio file is correctly loaded
④.Allow webcam access when prompted (for Webcam mode)
⑤.Use the menu interface to switch between visualisations
No additional installation required.

6. Project Plan Reflection Summary
Core functionality delivered within timeline
Webcam module required extended debugging due to asynchronous media handling
Beat detection required iterative threshold calibration
UI scaling issue identified due to browser zoom calibration (30% development zoom)
The project evolved from linear planning to iterative optimisation and adaptive system thinking.

7. Performance and Testing

Testing conducted:
・10–30 minute runtime stress sessions
・Cross-browser validation
・Multi-device usability evaluation (n=5)

Key findings:
・Stable rendering under controlled particle limits
・Minor mobile performance lag
・No desktop crashes
・Identified layout scaling issue (now refactored toward responsive units)

8. External Sources
Libraries Used:
・p5.js
・p5.sound
・p5.easyCam

Mathematical References:
・Wolfram MathWorld
・Wikipedia (circular parametric equations)

Official p5.js documentation for:
・WEBGL coordinate systems
・FFT analysis
・createGraphics buffering
・createCapture (video input)




