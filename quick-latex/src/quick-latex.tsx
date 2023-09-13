import { Action, ActionPanel, List, popToRoot, showHUD } from "@raycast/api";
import fs from "fs";
import { useEffect, useState } from "react";

import { downloadLatex, getDisplayLatex } from "./api";
import { DEFAULT_ICON, DOWNLOAD_DIR, ExportType, toClipboard } from "./utils";

export default function CommandWithCustoEmptyView() {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!fs.existsSync(DOWNLOAD_DIR)) {
      fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
    }
  }, []);

  const icon = searchText == "" ? DEFAULT_ICON : getDisplayLatex(searchText);

  return (
    <List onSearchTextChange={setSearchText} searchText={searchText}>
      <List.EmptyView
        icon={icon}
        actions={
          <ActionPanel>
            {Object.values(ExportType).map((exportType) => (
              <Action
                key={exportType}
                title={"Copy as " + exportType.toUpperCase()}
                onAction={() => {
                  downloadLatex(exportType, searchText)
                    .then((path: string) => {
                      toClipboard(path);
                      popToRoot();
                      showHUD("Copied to clipboard.");
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
