// Utility functions for dynamic group formation based on user attributes

export function getGroupNameFromUser(user: any) {
  // Example: group by job, location, and hobby
  const parts = [];
  if (user.job) parts.push(user.job);
  if (user.location) parts.push(user.location);
  if (user.hobby) parts.push(user.hobby);
  return parts.length > 0 ? parts.join(" - ") : "General";
}

export function groupUsersByAttributes(users: any[]) {
  // Returns a map: groupName -> [users]
  const groups: Record<string, any[]> = {};
  users.forEach(user => {
    const groupName = getGroupNameFromUser(user);
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(user);
  });
  return groups;
}
