# Focusly- AI-Powered Productivity Suite

## Table of Contents
- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)


## Introduction

Flocus is an AI-enhanced Pomodoro timer application designed specifically for students to improve focus, productivity, and overall wellness. The app combines time management techniques with AI-powered assistance to create an optimal study environment.

**Core Purpose:**
Key Purposes:
- Help students maintain focus using the Pomodoro technique
- Provide AI-powered study assistance and mental health support
- Recommend personalized music playlists for different study modes
- Offer AI-generated diet recommendations for students
- Track tasks and study sessions

## Key Features

### 1. Smart Pomodoro Timer System
- **Three Work Modes**:
  - Focus Session (default 25 minutes)
  - Short Break (default 5 minutes)
  - Long Break (default 15 minutes)
- Visual countdown timer with progress indicators
- One-click session control (Start/Pause/Reset)

### 2. Spotify AI Music Generation
- Auto-generated playlists for:
  - Focus sessions (concentration-enhancing)
  - Short breaks (energizing)
  - Long breaks (relaxing)
- Audio preview functionality


### 3. Dual-Mode AI Assistant ChatBot (Powered by Gemini AI)
- Study Mode: Get help with concepts, study techniques, and productivity tips
- Wellness Mode: Mental health support and stress management advice
- Collapsible interface to minimize distraction

### 4. AI-Powered Diet Recommender
- **Context-Aware Suggestions**:
  - Study time selection (Morning/Afternoon/Night)
  - Current mental state (Sleepy/Stressed/Focused/Tired/Energetic)
  - Dietary preferences (Veg/Non-Veg/Vegan/Keto/Gluten-Free)
- Personalized meal plans with nutritional information
- Preparation time estimates for student-friendly recipes

### 5. Comprehensive Task Management (To-Do List)
- Add, edit, and complete tasks
- Priority tagging system
- Progress tracking
- Persistent task storage



## Technology Stack

### Core Framework
- **React.js** (v18+) - Frontend library
- **Frontend**- CSS Modules

### AI Services
- **Gemini AI API** - For all intelligent recommendations

### Music Integration
- **Spotify API** 
- **Gemini AI API** 

### Additional Libraries
- **Axios** - HTTP client
- **React Icons** - Icon set
- **date-fns** - Date/time manipulation
- **react-hook-form** - Form management

## Installation Guide

### Prerequisites
- npm (v9 or higher) or yarn (v1.22+)
- Google Cloud account (for Gemini AI)
- Spotify Developer account

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/kapish19/Focusly.git
   cd Focusly
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see [Configuration](#configuration) section)

4. Start the development server:
   ```bash
   npm start
   ```

## Configuration

### Gemini AI Setup
1. Navigate to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project and generate an API key
3. Add it to your `.env` file:

### Optional Spotify Integration
1. Register at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Create a new application and note your credentials
3. Add to `.env`:
   

## Environment Variables
```env
   REACT_APP_GEMINI_API_KEY=your_ai_api_key
   REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
   REACT_APP_SPOTIFY_CLIENT_SECRET=yor_spotify_client_secret
   ```
