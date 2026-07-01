import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ComparisonProvider } from "./contexts";
import { Sidebar } from "./components";
import { HomePage, ComparatorPage, SettingsPage } from "./pages";

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <Router>
      <ComparisonProvider>
        <Routes>
          {/* Home page - sans sidebar */}
          <Route path="/" element={<HomePage />} />

          {/* Comparator layout avec sidebar */}
          <Route
            path="/comparator"
            element={
              <div className="flex h-screen bg-background text-foreground">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <div className="max-w-7xl mx-auto p-4 md:p-8">
                    <div className="space-y-2 mb-8">
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Compare Items
                      </h1>
                      <p className="text-muted-foreground">
                        Analyze and compare items side by side
                      </p>
                    </div>
                    <ComparatorPage />
                  </div>
                </main>
              </div>
            }
          />

          {/* Settings page */}
          <Route
            path="/settings"
            element={
              <div className="flex h-screen bg-background text-foreground">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <div className="max-w-7xl mx-auto p-4 md:p-8">
                    <div className="space-y-2 mb-8">
                      <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Settings
                      </h1>
                      <p className="text-muted-foreground">
                        Configure your preferences
                      </p>
                    </div>
                    <SettingsPage />
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </ComparisonProvider>
    </Router>
  );
}

export default App;
