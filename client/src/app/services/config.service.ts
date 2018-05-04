import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private currentConfig: Config;

  constructor() {}

  public getConfig(): Config {
    return this.currentConfig;
  }

  public setConfig(config: Config) {
    this.currentConfig = config;
  }
}

export interface Config {
  clientId: string;
  metadataUrl: string;
  redirectUri: string;
  scope: string;
  resource: string;
}
