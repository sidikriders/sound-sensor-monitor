import { Alert, AlertReason, Machine, Sensor } from "@prisma/client";

declare interface AlertResponse extends Alert {
  reason?: AlertReason;
  sensor?: Sensor & { machine: Machine };
  severity?: "MILD" | "MODERATE" | "SEVERE";
}
