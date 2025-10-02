// Admin Dashboard Component
import { useState, useEffect } from "react";
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
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState<
    "all" | "active" | "blacklisted" | "whitelisted"
  >("all");

  const ADMIN_PASSWORD = "admin1234";

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      // Refresh data every 30 seconds
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        
        console.log("Raw data from API:", data);
        console.log("First user:", data.users?.[0]);
        console.log("First visit:", data.visits?.[0]);

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
        
        console.log("Mapped users:", mappedUsers);
        console.log("Mapped visits:", mappedVisits);

        setUsers(mappedUsers);
        setVisits(mappedVisits);
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword("");
    } else {
      alert("Incorrect password!");
    }
  };

  const updateUserStatus = async (
    userId: string,
    status: "active" | "blacklisted" | "whitelisted"
  ) => {
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, status }),
      });

      if (response.ok) {
        loadData(); // Reload data after update
      }
    } catch (error) {
      console.error("Error updating user status:", error);
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
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              autoFocus
            />
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
        <button
          onClick={() => setIsAuthenticated(false)}
          className="logout-btn"
        >
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
