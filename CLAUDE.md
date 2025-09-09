# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Korean lunch menu roulette web application built as a single HTML file with embedded CSS and JavaScript. The application allows users to:

- Add and remove menu items dynamically
- Spin a visual roulette wheel to select a random menu
- Display results with animated fireworks
- Click on wheel segments to remove menu items

## Architecture

**Single File Structure**: The entire application is contained in `index.html` with:
- Embedded CSS styling (lines 9-40)
- HTML structure for UI components (lines 42-59)  
- JavaScript functionality (lines 60-150)

**Key Dependencies**:
- GSAP 3.12.2 (loaded from CDN) for animations and wheel rotation
- Canvas 2D API for wheel rendering
- No build system or package management required

**Core Components**:

1. **Wheel Rendering System** (`drawWheel()` function):
   - Uses HTML5 Canvas to draw colored segments
   - Handles rotation transformations and text positioning
   - Korean font stack for proper hangul rendering

2. **Animation System**:
   - GSAP handles smooth wheel spinning with easing
   - Multi-layered firework effects (ripples, burst lines, confetti, sparkles)
   - Pointer bounce animation on selection

3. **Selection Logic**:
   - Pointer positioned at 12 o'clock (270 degrees in canvas coordinates)
   - Result calculation: `const pointerAngle=(270-currentRot+360)%360`
   - Index mapping: `Math.floor(pointerAngle/segAngle)%segCount`

4. **User Interactions**:
   - Text input and button for adding menus
   - Click segments to remove items  
   - Spin button triggers animation sequence
   - Modal popup displays results

## Important Technical Details

**Coordinate System**: Canvas uses standard coordinate system where 0° is 3 o'clock, but the pointer is positioned at 12 o'clock (270°), requiring angle conversion in the selection logic.

**Animation Timing**: Current spin duration is 6 seconds with 8-12 random rotations for smooth deceleration.

**Memory Management**: All animated elements (fireworks, confetti) are automatically removed from DOM after animation completion to prevent memory leaks.

## Development Notes

This is a client-side only application - simply open `index.html` in a web browser to run. No server, build process, or dependencies installation required.

The application includes defensive measures like duplicate menu detection and spinning state management to prevent user errors.