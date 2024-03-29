import { User } from "../contexts/AuthContext";

interface ValidateProps {
  user: Partial<User>;
  permissions?: string[];
  roles?: string[];
}

export function validate({ user, permissions, roles }: ValidateProps) {
  if (permissions?.length > 0) {
    const hasAllPermissions = permissions.every(permission => {
      return user.permissions.includes(permission);
    })

    if (!hasAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles.some(role => {
      return user.roles.includes(role);
    })

    if (!hasAllRoles) {
      return false;
    }
  }

  return true;
}