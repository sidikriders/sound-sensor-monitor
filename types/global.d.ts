
import { Alert, AlertReason, Sensor } from "@prisma/client";

declare interface AlertResponse extends Alert {
  reason?: AlertReason;
  sensor?: Sensor;
  severity?: "MILD" | "MODERATE" | "SEVERE";
}