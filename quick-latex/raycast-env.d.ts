/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `quick-latex` command */
  export type QuickLatex = ExtensionPreferences & {
  /** SVG Width - Width of the SVG image. */
  "svgWidth": string,
  /** SVG Height - Height of the SVG image. */
  "svgHeight": string,
  /** SVG Viewbox - Viewbox of the SVG image. */
  "svgViewbox": string
}
}

declare namespace Arguments {
  /** Arguments passed to the `quick-latex` command */
  export type QuickLatex = {
  /** LaTeX */
  "latex": string
}
}


declare module "swift:*" {
  function run<T = unknown, U = any>(command: string, input?: U): Promise<T>;
  export default run;
	export class SwiftError extends Error {
    stderr: string;
    stdout: string;
  }
}
