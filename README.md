# Candlestick Chart Proof of Concept

This project is a **proof of concept** for a candlestick chart visualization tool. It is designed to demonstrate the basic functionality of rendering financial data, such as price bars, support/resistance levels, and volume profile indicators, using the Chart.js library. 

> **Note:** This is not a production-ready application. It contains several limitations and areas for improvement.

## Features
- **Candlestick Chart**: Displays price bars with open, high, low, and close values.
- **Support and Resistance Levels**: Visualizes static support and resistance lines.
- **Volume Profile Indicators**:
  - Point of Control (POC)
  - Value Area High (VAH)
  - Value Area Low (VAL)
- **Interactive Tooltips**: Displays detailed information about each data point.
- **Zoom and Pan**: Allows panning on the X-axis (zooming is disabled for now).
- **Indicator Settings**: Opens a settings pane when clicking on an indicator.

## Project Structure
WebApplication1/ ├── Controllers/          # Backend controllers (if applicable) ├── Models/               # Data models ├── Views/                # Razor views (if using MVC) ├── wwwroot/              # Static files │   ├── js/               # JavaScript files (e.g., chart-init.js) │   ├── css/              # CSS files │   └── lib/              # Third-party libraries (e.g., Chart.js) ├── Program.cs            # Application entry point ├── Startup.cs            # Middleware and service configuration └── appsettings.json      # Application settings


## How to Run
1. Clone the repository.
2. Open the project in **Visual Studio**.
3. Build and run the project.
4. Navigate to the page where the chart is rendered.

## Known Limitations
- **No Real-Time Data**: The chart uses static data and does not support live updates.
- **Limited Zoom Functionality**: Zooming is disabled, and only panning is supported.
- **Basic Styling**: The UI and chart design are minimal and need further refinement.
- **No Error Handling**: The code lacks robust error handling for edge cases.
- **Hardcoded Values**: Support, resistance, and profile values are static and not dynamically calculated.

## Future Improvements
- Add real-time data updates.
- Implement dynamic calculation of support, resistance, and volume profile levels.
- Enhance zoom and pan functionality.
- Improve UI/UX design.
- Add unit tests for better reliability.
- Refactor code to improve maintainability and scalability.

## Disclaimer
This project is for demonstration purposes only and is not intended for production use. It is a work in progress and contains several incomplete features and potential issues.

## License
This project is not licensed and is intended for educational purposes only.
