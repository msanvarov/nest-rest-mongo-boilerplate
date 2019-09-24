import { ModuleMetadata } from "@nestjs/common/interfaces";
import { LoggerOptions } from "winston";

/**
 * Logger options
 */
export type WinstonModuleOptions = LoggerOptions;

/**
 * Asynchronous winston module options
 */
export interface WinstonModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  /**
   * Default factory method that returns winston module options
   */
  useFactory: (
    ...args: any[]
  ) => Promise<WinstonModuleOptions> | WinstonModuleOptions;

  /**
   * Providers to inject
   */
  inject?: any[];
}
