export const learnPages = {
  "design-studio": {
    id: "design-studio",
    title: "Design Studio",
    subtitle: "Interactive 3D Design & Visualization",
    description: "Visualize CAD, BIM, and photogrammetry models directly in the browser. Create and edit 2D and 3D projects, upload your visual data to be processed into digital twins, open complex 3D files instantly in the browser.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "3D Model Visualization",
        description: "Drag-and-drop 3D model uploads with instant rendering",
        icon: "Box"
      },
      {
        title: "Real-time Collaboration",
        description: "Work together on 3D projects with live updates",
        icon: "Users"
      },
      {
        title: "AI-Powered Optimization",
        description: "Automatic model optimization and processing",
        icon: "Zap"
      },
      {
        title: "Multi-Format Export",
        description: "Export to multiple formats for any workflow",
        icon: "Download"
      }
    ],
    tiersHighlight: ["Creator", "Modeling", "God Mode", "Enterprise"],
    pricing: {
      starter: { price: 79, features: ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder", "Basic support"] },
      pro: { price: 199, features: ["All Creator features", "Geospatial & Robotics", "Analytics & Reports", "Priority support"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  },
  "project-hub": {
    id: "project-hub",
    title: "Project Hub",
    subtitle: "Centralized Project Management",
    description: "Your single source of truth. Manage your building projects, documents, schedules, photos, tasks, and field reports in one clean workspace everyone on your team can actually use.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "Unified Dashboard",
        description: "All project data in one centralized location",
        icon: "Layout"
      },
      {
        title: "Real-time Sync",
        description: "Live updates across all team members",
        icon: "RefreshCw"
      },
      {
        title: "Document Management",
        description: "Organize and share project documents easily",
        icon: "FileText"
      },
      {
        title: "Task Tracking",
        description: "Monitor progress and deadlines effectively",
        icon: "CheckSquare"
      }
    ],
    tiersHighlight: ["Creator", "Modeling", "God Mode", "Enterprise"],
    pricing: {
      starter: { price: 79, features: ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder", "Basic support"] },
      pro: { price: 199, features: ["All Creator features", "Geospatial & Robotics", "Analytics & Reports", "Priority support"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  },
  "content-studio": {
    id: "content-studio",
    title: "Content Studio",
    subtitle: "Professional Media Creation",
    description: "Turn your standard and 360 video footage, site walkthroughs, and photos into polished videos and reels — fast, beautiful, no extra software.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "Video Editing",
        description: "Professional video editing tools in your browser",
        icon: "Video"
      },
      {
        title: "360° Processing",
        description: "Specialized tools for 360-degree content",
        icon: "RotateCcw"
      },
      {
        title: "AI Enhancement",
        description: "Automatic video enhancement and optimization",
        icon: "Sparkles"
      },
      {
        title: "Quick Export",
        description: "Export in multiple formats and resolutions",
        icon: "Upload"
      }
    ],
    tiersHighlight: ["Creator", "Modeling", "God Mode", "Enterprise"],
    pricing: {
      starter: { price: 79, features: ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder", "Basic support"] },
      pro: { price: 199, features: ["All Creator features", "Geospatial & Robotics", "Analytics & Reports", "Priority support"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  },
  "tour-builder": {
    id: "tour-builder",
    title: "360° Tour Builder",
    subtitle: "Immersive Virtual Tours",
    description: "Drag-and-drop immersive tours with hotspots, floorplans, and progress comparisons. Share with anyone, anywhere, on any device.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "Drag & Drop Interface",
        description: "Intuitive tour creation with simple drag-and-drop",
        icon: "MousePointer"
      },
      {
        title: "Interactive Hotspots",
        description: "Add clickable points of interest and information",
        icon: "MapPin"
      },
      {
        title: "Floor Plans",
        description: "Integrated floor plans for navigation",
        icon: "Map"
      },
      {
        title: "Progress Tracking",
        description: "Monitor construction progress over time",
        icon: "TrendingUp"
      }
    ],
    tiersHighlight: ["Creator", "Modeling", "God Mode", "Enterprise"],
    pricing: {
      starter: { price: 79, features: ["Project Hub", "Design Studio", "Content Studio", "360 Tour Builder", "Basic support"] },
      pro: { price: 199, features: ["All Creator features", "Geospatial & Robotics", "Analytics & Reports", "Priority support"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  },
  "geospatial-robotics": {
    id: "geospatial-robotics",
    title: "Geospatial & Robotics",
    subtitle: "Advanced Mapping & Automation",
    description: "Plan drone missions, monitor robots, overlay drawings on maps, measure volumes — everything in one intelligent map interface.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "Drone Mission Planning",
        description: "Plan and execute automated drone flights",
        icon: "Plane"
      },
      {
        title: "Robot Monitoring",
        description: "Real-time tracking and control of robotic systems",
        icon: "Bot"
      },
      {
        title: "Map Overlays",
        description: "Overlay drawings, measurements, and data on maps",
        icon: "Layers"
      },
      {
        title: "Volume Calculations",
        description: "Accurate volume and area measurements",
        icon: "Calculator"
      }
    ],
    tiersHighlight: ["Modeling", "God Mode", "Enterprise"],
    pricing: {
      pro: { price: 199, features: ["Geospatial & Robotics access", "Drone integration", "Map overlays", "Volume measurement"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  },
  "virtual-studio": {
    id: "virtual-studio",
    title: "Virtual Studio",
    subtitle: "Immersive Virtual Reality",
    description: "Transform designs into cinematic walkthroughs. Adjust lighting, materials, and camera paths, then export stunning videos for presentations.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "VR Walkthroughs",
        description: "Immersive virtual reality experiences",
        icon: "Eye"
      },
      {
        title: "Cinematic Camera",
        description: "Professional camera controls and paths",
        icon: "Camera"
      },
      {
        title: "Lighting Design",
        description: "Adjust lighting and materials in real-time",
        icon: "Lightbulb"
      },
      {
        title: "Video Export",
        description: "Export high-quality videos for presentations",
        icon: "Film"
      }
    ],
    tiersHighlight: ["God Mode", "Enterprise"],
    pricing: {
      enterprise: { price: 499, features: ["Virtual Studio access", "All other features", "White-label", "Dedicated support"] }
    }
  },
  "analytics-reports": {
    id: "analytics-reports",
    title: "Analytics & Reports",
    subtitle: "Data-Driven Insights",
    description: "See real progress, not guesses. Automated dashboards, trend forecasting, and custom reports built from all your project data.",
    heroImage: "/api/placeholder/800/400",
    features: [
      {
        title: "Automated Dashboards",
        description: "Real-time project dashboards and KPIs",
        icon: "BarChart3"
      },
      {
        title: "Trend Forecasting",
        description: "Predictive analytics and trend analysis",
        icon: "TrendingUp"
      },
      {
        title: "Custom Reports",
        description: "Generate custom reports from project data",
        icon: "FileBarChart"
      },
      {
        title: "Data Integration",
        description: "Connect all project data sources",
        icon: "Database"
      }
    ],
    tiersHighlight: ["Modeling", "God Mode", "Enterprise"],
    pricing: {
      pro: { price: 199, features: ["Analytics & Reports access", "Geospatial & Robotics", "Priority support"] },
      enterprise: { price: 499, features: ["All features", "Virtual Studio", "Athlete360", "White-label", "Dedicated support"] }
    }
  }
};