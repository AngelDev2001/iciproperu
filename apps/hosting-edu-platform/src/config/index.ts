import {includes} from "lodash"
import config from "./configs.json";

const hostName = window.location.hostname;

const hostsProduction = ["platform-edu.iciproperu.com"];

export const currentEnvironment = includes(hostsProduction, hostName)
    ? "production"
    : "development";

export const currentConfig = config[currentEnvironment];