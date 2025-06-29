export const login = async (email, password) => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { email } });
    }, 500);
  });
};

export const signup = async (email, password) => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, user: { email } });
    }, 500);
  });
};

export const logout = async () => {
  // In a real app, this would call your backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};