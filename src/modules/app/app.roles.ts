import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  DEFAULT_READ = "DEFAULT_READ",
  ADMIN_DELETE_PROFILES = "ADMIN_DELETE_PROFILES",
}

/**
 * Roles Builder
 */
export const roles: RolesBuilder = new RolesBuilder();

roles
  .grant(AppRoles.DEFAULT_READ)
  .grant(AppRoles.ADMIN_DELETE_PROFILES)
  .deleteAny("profiles");
