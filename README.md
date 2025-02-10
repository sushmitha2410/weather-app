Weather App  
A simple Next.js weather application that fetches real-time weather updates based on the user's location. Deployed on Vercel.  

 Live Demo  
[View the Live App Here](https://weatherapp-sepia-alpha.vercel.app/)  

Tech Stack  
Frontend: Next.js, React, TypeScript, Tailwind CSS  
API: OpenWeather API (for weather data)  
Deployment: Vercel  

Features  
Fetches real-time weather using the OpenWeather API  
Detects user location using the Geolocation API  
Allows manual city input for weather lookup  
Responsive UI built with Tailwind CSS  
Login system using localStorage  
Tooltips for better user experience  

 Installation & Setup  
1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```  
2. Install dependencies  
   ```bash
   npm install
   ```  
3. Set up environment variables  
   - Create a .env.local file in the root directory  
   - Add the following:  
     ```
     NEXT_PUBLIC_WEATHER_API_KEY=6f733f76b30528e58fb1125bbcf88abc
     ```  
4. Run the development server  
   ```bash
   npm run dev
   ```  
   The app will be live at http://localhost:3000  
