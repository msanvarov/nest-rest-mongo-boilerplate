import { RolesBuilder } from "nest-access-control";

export enum AppRoles {
  DEFAULT = "DEFAULT",
  ADMIN = "ADMIN",
}

/**
 * Roles Builder
 */
export const roles: RolesBuilder = new RolesBuilder();

// The default app role doesn't have readAny(profiles) because the profile returned provides a password.
// To mutate the return body of mongoose queries try editing the ProfileService
roles
  .grant(AppRoles.DEFAULT)
  .readOwn("profile")
  .updateOwn("profile")
  .deleteOwn("profile")
  .grant(AppRoles.ADMIN)
  .readAny("profiles")
  .updateAny("profiles")
  .deleteAny("profiles");
