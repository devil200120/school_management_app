import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * @typedef {'student' | 'admin' | 'teacher' | 'accountant' | 'parent' | 'staff'} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {string} [profilePicture]
 */

/**
 * @typedef {Object} AuthContextType
 * @property {User|null} user
 * @property {(email, password, role: UserRole) => Promise<void>} login
 * @property {() => void} logout
 * @property {boolean} isAuthenticated
 */

const AuthContext = createContext(undefined);

/**
 * AuthProvider component
 * @param {{ children: React.ReactNode }} props
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("eduos-user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id && parsedUser.role) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("eduos-user");
        }
      }
    } catch (error) {
      console.error("Failed to parse stored user data", error);
      localStorage.removeItem("eduos-user");
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const login = async (email, password, role) => {
    if (
      ![
        "student",
        "admin",
        "teacher",
        "accountant",
        "parent",
        "staff",
      ].includes(role)
    ) {
      throw new Error(
        "Invalid role. Only student, admin, teacher, accountant, parent, and staff roles are supported."
      );
    }

    const validCredentials = {
      student: [
        { email: "anas123@gmail.com", password: "123456" },
        { email: "nikmishra193@gmail.com", password: "654321" },
      ],
      admin: [{ email: "stgcommunitydt@gmail.com", password: "9876543" }],
      accountant: [{ email: "amanbhai234@gmail.com", password: "0987654" }],
      teacher: [{ email: "teacher@example.com", password: "password" }],
      parent: [{ email: "parent@example.com", password: "parent123" }],
      staff: [{ email: "staff@example.com", password: "staff123" }],
    };

    const isValidCredential = validCredentials[role].some(
      (cred) => cred.email === email && cred.password === password
    );

    if (!isValidCredential) {
      throw new Error("Invalid credentials for the selected role.");
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const userData = {
      id: "1",
      name:
        role === "student"
          ? email === "anas123@gmail.com"
            ? "Anas Khan"
            : "Nikhil Mishra"
          : role === "teacher"
          ? "Sarah Johnson"
          : role === "accountant"
          ? "Robert Miller"
          : role === "parent"
          ? "John Parent"
          : role === "staff"
          ? "John Doe"
          : "Admin User",
      email,
      role,
      profilePicture:
        role === "student"
          ? "/placeholder.svg"
          : role === "teacher"
          ? "/teacher-avatar.svg"
          : role === "accountant"
          ? "/accountant-avatar.svg"
          : role === "parent"
          ? "/parent-avatar.svg"
          : role === "staff"
          ? "/staff-avatar.svg"
          : undefined,
    };

    setUser(userData);
    localStorage.setItem("eduos-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduos-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
