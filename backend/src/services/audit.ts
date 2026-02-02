import { AuditAction } from "@prisma/client";
import { prisma } from "../lib/prisma.js";

export const logAudit = async ({
  userId,
  action,
  context,
  metadata
}: {
  userId: string;
  action: AuditAction;
  context: string;
  metadata: Record<string, unknown>;
}) => {
  await prisma.auditLog.create({
    data: {
      userId,
      action,
      context,
      metadata
    }
  });
};
