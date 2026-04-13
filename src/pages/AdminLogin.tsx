import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminLogin = () => {
  const { user, isAdmin, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl font-bold text-secondary mb-2">Admin Login</h1>
          <p className="font-body text-muted-foreground text-sm">M M Attarwala Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-border space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 font-body">
              {error}
            </div>
          )}
          {user && !isAdmin && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg p-3 font-body">
              You don't have admin access.
            </div>
          )}

          <div>
            <label className="font-body text-sm text-secondary font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="font-body text-sm text-secondary font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-gold text-primary-foreground font-body font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
