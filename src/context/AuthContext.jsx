import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_RITESH = {
  userId: 'ritesh',
  email: 'ritesh@fitflow.ai',
  name: 'Ritesh',
  age: 23,
  weight: '75 kg',
  height: '175 cm',
  targetWeight: '72 kg',
  goal: 'Weight Loss & Lean Muscle',
  role: 'PRO Athlete & Member',
  department: 'Technology & Engineering',
  company: 'FitFlow Pro',
  joinedDate: 'January 2024',
  points: 1540,
  rank: 3,
  streakDays: 15,
  avatar: null,
  password: 'password123',
};

export const AuthProvider = ({ children }) => {
  // Load registered users from localStorage, defaulting with Ritesh pre-registered
  const [users, setUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('fitflow_registered_users');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse registered users:', e);
    }
    return [DEFAULT_RITESH];
  });

  // Load current logged-in user from localStorage, defaulting to null if not logged in
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fitflow_current_user');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse current user:', e);
    }
    return null;
  });

  // Sync users to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('fitflow_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to store users:', e);
    }
  }, [users]);

  // Sync current user to localStorage whenever updated
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('fitflow_current_user', JSON.stringify(currentUser));
        // Also keep fitflow_user_avatar aligned if present
        if (currentUser.avatar) {
          localStorage.setItem('fitflow_user_avatar', currentUser.avatar);
        }
      } else {
        localStorage.removeItem('fitflow_current_user');
      }
    } catch (e) {
      console.error('Failed to store current user:', e);
    }
  }, [currentUser]);

  // Login handler
  const login = (idOrEmail, password) => {
    const trimmedId = idOrEmail.trim().toLowerCase();
    const user = users.find(
      (u) =>
        u.userId.toLowerCase() === trimmedId ||
        (u.email && u.email.toLowerCase() === trimmedId)
    );

    if (!user) {
      return { success: false, error: 'User ID or email not found. Please register first.' };
    }

    if (user.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(user);
    window.dispatchEvent(new Event('fitflow-avatar-updated'));
    return { success: true, user };
  };

  // Register new user profile
  const register = ({
    name,
    userId,
    email,
    password,
    age,
    weight,
    height,
    targetWeight,
    goal,
  }) => {
    const cleanId = userId.trim().toLowerCase();
    const cleanEmail = (email || `${cleanId}@fitflow.ai`).trim().toLowerCase();

    // Check if ID or email already exists
    const exists = users.some(
      (u) =>
        u.userId.toLowerCase() === cleanId ||
        (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (exists) {
      return { success: false, error: 'This User ID or Email is already registered. Try logging in.' };
    }

    const newUser = {
      userId: cleanId,
      email: cleanEmail,
      name: name.trim() || cleanId,
      password,
      age: Number(age) || 24,
      weight: weight ? (weight.toString().includes('kg') ? weight : `${weight} kg`) : '70 kg',
      height: height ? (height.toString().includes('cm') ? height : `${height} cm`) : '175 cm',
      targetWeight: targetWeight ? (targetWeight.toString().includes('kg') ? targetWeight : `${targetWeight} kg`) : '68 kg',
      goal: goal || 'Weight Loss & Fitness',
      role: 'FitFlow Member',
      department: 'Member',
      company: 'FitFlow AI',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      points: 250, // Welcome points
      rank: users.length + 1,
      streakDays: 1,
      avatar: null,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    window.dispatchEvent(new Event('fitflow-avatar-updated'));
    return { success: true, user: newUser };
  };

  // Logout handler
  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('fitflow_current_user');
      localStorage.removeItem('fitflow_user_avatar');
    } catch (e) {
      console.error('Failed to clear current user from storage:', e);
    }
    window.dispatchEvent(new Event('fitflow-avatar-updated'));
  };

  // Update profile vitals and preferences
  const updateProfile = (updatedFields) => {
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);

    setUsers((prev) =>
      prev.map((u) => (u.userId === currentUser.userId ? updatedUser : u))
    );

    if (updatedFields.avatar !== undefined) {
      if (updatedFields.avatar) {
        localStorage.setItem('fitflow_user_avatar', updatedFields.avatar);
      } else {
        localStorage.removeItem('fitflow_user_avatar');
      }
      window.dispatchEvent(new Event('fitflow-avatar-updated'));
    }
  };

  // Quick switch back to Ritesh
  const switchBackToRitesh = () => {
    const ritesh = users.find((u) => u.userId === 'ritesh') || DEFAULT_RITESH;
    setCurrentUser(ritesh);
    window.dispatchEvent(new Event('fitflow-avatar-updated'));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        users,
        login,
        register,
        logout,
        updateProfile,
        switchBackToRitesh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;