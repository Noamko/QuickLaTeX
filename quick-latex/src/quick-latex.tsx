import { Action, ActionPanel, environment, List, popToRoot, showHUD } from "@raycast/api";
import { useState, useEffect } from "react";
import { existsSync, mkdirSync } from "fs";
import { resolve } from "path";
import { runAppleScript } from "run-applescript";
import { DownloadResult, image } from "image-downloader";
import { BASE_URL, ExportType, DISPLAY_LATEX_URL } from "./utils";

const downloadDir = resolve(environment.supportPath, "download");

export default function CommandWithCustoEmptyView() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!existsSync(downloadDir)) {
      mkdirSync(downloadDir, { recursive: true });
    }
  }, []);

  function downloadlatex(exportType: ExportType) {
    const latex = searchText == "" ? "LaTeX" : searchText;
    const url = BASE_URL + exportType + ".image?" + encodeURIComponent("\\dpi{512}") + encodeURIComponent(latex);
    return image({ url: url, dest: downloadDir + "/img." + exportType });
  }

  const defaultIcon = {
    source: {
      light: DISPLAY_LATEX_URL + encodeURIComponent("LaTeX"),
      dark: DISPLAY_LATEX_URL + encodeURIComponent("{\\color{White} LaTeX}"),
    },
  };

  return (
    <List onSearchTextChange={setSearchText} searchText={searchText}>
      <List.EmptyView
        icon={
          searchText == ""
            ? defaultIcon
            : {
                source: {
                  light: DISPLAY_LATEX_URL + encodeURIComponent(searchText),
                  dark: DISPLAY_LATEX_URL + encodeURIComponent(`{\\color{White} ${searchText}}`),
                },
              }
        }
        actions={
          <ActionPanel>
            {Object.values(ExportType).map((exportType) => (
              <Action
                key={exportType}
                title={"Copy as " + exportType.toUpperCase()}
                onAction={() => {
                  downloadlatex(exportType)
                    .then((res: DownloadResult) => {
                      runAppleScript(`set the clipboard to POSIX file "${res.filename}"`);
                      popToRoot();
                      showHUD("Copied");
                    })
                    .catch(() => {
                      showHUD("No internet connection. Or something else.");
                    });
                }}
              />
            ))}
          </ActionPanel>
        }
      />
    </List>
  );
}
