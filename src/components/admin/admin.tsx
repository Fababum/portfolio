// Admin Dashboard Component
import { useState, useEffect, useCallback } from "react";
import "./admin.css";

// Supabase response types (snake_case)
interface SupabaseUser {
  user_id: string;
  visit_count: number;
  first_visit: string;
  last_visit: string;
  status: "active" | "blacklisted" | "whitelisted";
}

interface SupabaseVisit {
  user_id: string;
  timestamp: string;
  is_returning: boolean;
  ip_address?: string;
}

// Frontend types (camelCase)
interface UserVisit {
  userId: string;
  timestamp: string;
  isReturning: boolean;
  ipAddress?: string;
}

interface UserStats {
  userId: string;
  visitCount: number;
  firstVisit: string;
  lastVisit: string;
  status: "active" | "blacklisted" | "whitelisted";
}

function Admin() {
  const [users, setUsers] = useState<UserStats[]>([]);
  const [visits, setVisits] = useState<UserVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [filter, setFilter] = useState<
    "all" | "active" | "blacklisted" | "whitelisted"
  >("all");

  // Check if user is already authenticated on mount
  useEffect(() => {
    const sessionToken = localStorage.getItem("adminSessionToken");
    if (sessionToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminSessionToken");
    localStorage.removeItem("adminUsername");
  }, []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const sessionToken = localStorage.getItem("adminSessionToken");

      if (!sessionToken) {
        handleLogout();
        return;
      }

      const response = await fetch(
        `/api/admin/users?sessionToken=${encodeURIComponent(sessionToken)}`
      );

      if (response.status === 401) {
        alert("Session expired. Please log in again.");
        handleLogout();
        return;
      }

      if (response.ok) {
        const data = await response.json();

        // Map snake_case from Supabase to camelCase for frontend
        const mappedUsers = (data.users || []).map((user: SupabaseUser) => ({
          userId: user.user_id,
          visitCount: user.visit_count,
          firstVisit: user.first_visit,
          lastVisit: user.last_visit,
          status: user.status,
        }));

        const mappedVisits = (data.visits || []).map(
          (visit: SupabaseVisit) => ({
            userId: visit.user_id,
            timestamp: visit.timestamp,
            isReturning: visit.is_returning,
            ipAddress: visit.ip_address,
          })
        );

        setUsers(mappedUsers);
        setVisits(mappedVisits);
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  }, [handleLogout]);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      // Refresh data every 30 seconds
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsAuthenticated(true);
        localStorage.setItem("adminSessionToken", data.sessionToken);
        localStorage.setItem("adminUsername", data.username);
        setUsername("");
        setPassword("");
      } else {
        const error = await response.json();
        setLoginError(error.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please try again.");
    }
  };

  const updateUserStatus = async (
    userId: string,
    status: "active" | "blacklisted" | "whitelisted"
  ) => {
    try {
      const sessionToken = localStorage.getItem("adminSessionToken");

      if (!sessionToken) {
        alert("Session expired. Please log in again.");
        handleLogout();
        return;
      }

      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status, sessionToken }),
      });

      if (response.ok) {
        loadData(); // Reload data after update
      } else if (response.status === 401) {
        alert("Authentication failed. Please log in again.");
        handleLogout();
      } else {
        const error = await response.json();
        alert(`Failed to update user: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      alert("Error updating user status. Please try again.");
    }
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "all") return true;
    return user.status === filter;
  });

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              autoFocus
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{users.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Visits</h3>
          <p className="stat-number">{visits.length}</p>
        </div>
        <div className="stat-card">
          <h3>Blacklisted</h3>
          <p className="stat-number">
            {users.filter((u) => u.status === "blacklisted").length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Whitelisted</h3>
          <p className="stat-number">
            {users.filter((u) => u.status === "whitelisted").length}
          </p>
        </div>
      </div>

      <div className="filter-tabs">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All ({users.length})
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active ({users.filter((u) => u.status === "active").length})
        </button>
        <button
          className={filter === "whitelisted" ? "active" : ""}
          onClick={() => setFilter("whitelisted")}
        >
          Whitelisted ({users.filter((u) => u.status === "whitelisted").length})
        </button>
        <button
          className={filter === "blacklisted" ? "active" : ""}
          onClick={() => setFilter("blacklisted")}
        >
          Blacklisted ({users.filter((u) => u.status === "blacklisted").length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Visit Count</th>
                <th>First Visit</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className={`status-${user.status}`}>
                  <td className="user-id">{user.userId}</td>
                  <td>{user.visitCount}</td>
                  <td>{new Date(user.firstVisit).toLocaleString()}</td>
                  <td>{new Date(user.lastVisit).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() =>
                        updateUserStatus(user.userId, "whitelisted")
                      }
                      className="btn-whitelist"
                      disabled={user.status === "whitelisted"}
                    >
                      Whitelist
                    </button>
                    <button
                      onClick={() =>
                        updateUserStatus(user.userId, "blacklisted")
                      }
                      className="btn-blacklist"
                      disabled={user.status === "blacklisted"}
                    >
                      Blacklist
                    </button>
                    <button
                      onClick={() => updateUserStatus(user.userId, "active")}
                      className="btn-reset"
                      disabled={user.status === "active"}
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="recent-visits">
        <h2>Recent Visits</h2>
        <div className="visits-list">
          {visits.slice(0, 20).map((visit, index) => (
            <div key={index} className="visit-item">
              <span className="visit-user">{visit.userId}</span>
              <span className="visit-type">
                {visit.isReturning ? "🔄 Returning" : "✨ New"}
              </span>
              <span className="visit-time">
                {new Date(visit.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
