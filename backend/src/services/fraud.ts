export const detectSuspiciousActivity = (context: {
  action: string;
  payload: Record<string, unknown>;
}) => {
  if (context.action === "arena" && context.payload.repeatedAttacks) {
    return { suspicious: true, reason: "Repetição de ataques" };
  }
  return { suspicious: false };
};
